import json
from pathlib import Path

import joblib
import numpy as np
import pandas as pd
import shap


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
ARTIFACT_DIR = BASE_DIR / "artifacts"


MODEL_PATH = ARTIFACT_DIR / "curamind_v1_model.joblib"
PREPROCESSOR_PATH = ARTIFACT_DIR / "curamind_v1_preprocessor.joblib"
CONFIG_PATH = ARTIFACT_DIR / "curamind_v1_config.json"


# ============================================================
# MODEL FEATURE ORDER
# ============================================================

MODEL_FEATURE_ORDER = [
    "_AGE80",
    "SEXVAR",
    "_BMI5",
    "_SMOKER3",
    "DRNKANY6",
    "_TOTINDA",
    "MENTHLTH",
    "DIABETE4",
    "_MICHD",
    "CHCCOPD3",
    "LCSCTSC1",
    "GENHLTH",
    "PHYSHLTH",
    "_HLTHPL2",
    "MEDCOST1",
    "CHECKUP1",
]


# ============================================================
# SHAP LABELS
# ============================================================

SHAP_FEATURE_LABELS = {
    "_AGE80": "Age",
    "SEXVAR": "Sex",
    "_BMI5": "BMI",
    "_SMOKER3": "Smoking status",
    "DRNKANY6": "Alcohol use",
    "_TOTINDA": "Physical activity",
    "MENTHLTH": "Mental health",
    "DIABETE4": "Diabetes status",
    "_MICHD": "Heart disease / heart attack history",
    "CHCCOPD3": "COPD history",
    "LCSCTSC1": "Low-dose CT screening history",
    "GENHLTH": "General health",
    "PHYSHLTH": "Physical health",
    "_HLTHPL2": "Health-care coverage",
    "MEDCOST1": "Medical cost barrier",
    "CHECKUP1": "Routine checkup history",
}


# ============================================================
# LOAD MODEL ARTIFACTS
# ============================================================

preprocessor = joblib.load(PREPROCESSOR_PATH)
gb_model = joblib.load(MODEL_PATH)


# ============================================================
# DECISION THRESHOLD
# ============================================================

V1_DECISION_THRESHOLD = 0.20


# ============================================================
# FRONTEND → 16 MODEL FEATURES
# ============================================================

def transform_curamind_patient(patient):
    """
    Convert CuraMind frontend input into the 16 raw features
    expected by the CuraMind V1 preprocessing pipeline.
    """

    personal = patient.get("personal_information", {})
    lifestyle = patient.get("lifestyle", {})
    smoking = lifestyle.get("smoking", {})
    alcohol = lifestyle.get("alcohol", {})
    medical = patient.get("medical_history", {})
    additional = patient.get("additional_information", {})

    # ---------------------------------------------------------
    # 1. AGE
    # ---------------------------------------------------------

    age = personal.get("age")

    if age is not None:
        age = float(age)
        age80 = min(age, 80)
    else:
        age80 = None

    # ---------------------------------------------------------
    # 2. SEX
    # ---------------------------------------------------------

    sex_mapping = {
        "male": 1,
        "female": 2,
        "prefer-not": None,
    }

    gender = personal.get("gender")
    sexvar = sex_mapping.get(gender)

    # ---------------------------------------------------------
    # 3. BMI
    # ---------------------------------------------------------

    height_cm = personal.get("height_cm")
    weight_kg = personal.get("weight_kg")

    bmi5 = None

    if height_cm is not None and weight_kg is not None:

        height_m = float(height_cm) / 100
        weight = float(weight_kg)

        if height_m > 0 and weight > 0:

            bmi = weight / (height_m ** 2)

            if 12 <= bmi < 100:
                bmi5 = round(bmi * 100, 0)

    # ---------------------------------------------------------
    # 4. SMOKING
    # ---------------------------------------------------------

    smoking_mapping = {
        "regular": 1,
        "occasional": 2,
        "former": 3,
        "never": 4,
    }

    smoker3 = smoking_mapping.get(
        smoking.get("status")
    )

    # ---------------------------------------------------------
    # 5. ALCOHOL
    # ---------------------------------------------------------

    alcohol_mapping = {
        "never": 2,
        "none": 2,
        "occasional": 1,
        "regular": 1,
        "moderate": 1,
        "heavy": 1,
    }

    drnkany6 = alcohol_mapping.get(
        alcohol.get("status")
    )

    # ---------------------------------------------------------
    # 6. PHYSICAL ACTIVITY
    # ---------------------------------------------------------

    activity_mapping = {
        "yes": 1,
        "no": 2,
        "sedentary": 2,
        "light": 1,
        "regular": 1,
        "active": 1,
    }

    totinda = activity_mapping.get(
        lifestyle.get("physical_activity")
    )

    # ---------------------------------------------------------
    # 7. MENTAL HEALTH DAYS
    # ---------------------------------------------------------

    menthlth = lifestyle.get("mental_health_days")

    if menthlth is not None:

        menthlth = int(menthlth)

        if not 0 <= menthlth <= 30:
            raise ValueError(
                "mental_health_days must be between 0 and 30."
            )

    # ---------------------------------------------------------
    # 8. DIABETES
    # ---------------------------------------------------------

    diabetes_mapping = {
        "yes": 1,
        "no": 3,
        "prediabetes": 4,
        "borderline": 4,
    }

    diabetes4 = diabetes_mapping.get(
        medical.get("diabetes_status")
    )

    # Also support the current frontend boolean format
    if diabetes4 is None:

        diabetes = medical.get("diabetes")

        if diabetes is True:
            diabetes4 = 1
        elif diabetes is False:
            diabetes4 = 3

    # ---------------------------------------------------------
    # 9. HEART DISEASE
    # ---------------------------------------------------------

    heart_mapping = {
        True: 1,
        False: 2,
        "yes": 1,
        "no": 2,
    }

    michd = heart_mapping.get(
        medical.get("heart_disease")
    )

    # ---------------------------------------------------------
    # 10. COPD
    # ---------------------------------------------------------

    copd_mapping = {
        True: 1,
        False: 2,
        "yes": 1,
        "no": 2,
    }

    chccopd3 = copd_mapping.get(
        medical.get("copd")
    )

    # ---------------------------------------------------------
    # 11. LOW-DOSE CT SCREENING
    # ---------------------------------------------------------

    ct_mapping = {
        True: 1,
        False: 2,
        "yes": 1,
        "no": 2,
    }

    lcsctsc1 = ct_mapping.get(
        additional.get("low_dose_ct_screening")
    )

    # ---------------------------------------------------------
    # 12. GENERAL HEALTH
    # ---------------------------------------------------------

    genhlth = lifestyle.get("general_health")

    if isinstance(genhlth, str):

        general_health_mapping = {
            "excellent": 1,
            "very good": 2,
            "good": 3,
            "fair": 4,
            "poor": 5,
        }

        genhlth = general_health_mapping.get(
            genhlth.lower()
        )

    if genhlth is not None:

        genhlth = int(genhlth)

        if not 1 <= genhlth <= 5:
            raise ValueError(
                "general_health must be between 1 and 5."
            )

    # ---------------------------------------------------------
    # 13. PHYSICAL HEALTH DAYS
    # ---------------------------------------------------------

    physhlth = lifestyle.get("physical_health_days")

    if physhlth is not None:

        physhlth = int(physhlth)

        if not 0 <= physhlth <= 30:
            raise ValueError(
                "physical_health_days must be between 0 and 30."
            )

    # ---------------------------------------------------------
    # 14. HEALTHCARE COVERAGE
    # ---------------------------------------------------------

    healthcare_coverage = lifestyle.get(
        "healthcare_coverage"
    )

    if healthcare_coverage is None:
        healthcare_coverage = medical.get(
            "healthcare_coverage"
        )

    if isinstance(healthcare_coverage, str):
        healthcare_coverage = healthcare_coverage.lower()

    if healthcare_coverage is True or healthcare_coverage == "yes":
        hlthpl2 = 1

    elif healthcare_coverage is False or healthcare_coverage == "no":
        hlthpl2 = 2

    else:
        hlthpl2 = None

    # ---------------------------------------------------------
    # 15. MEDICAL COST BARRIER
    # ---------------------------------------------------------

    could_not_afford_doctor = lifestyle.get(
        "could_not_afford_doctor"
    )

    if could_not_afford_doctor is None:
        could_not_afford_doctor = medical.get(
            "could_not_afford_doctor"
        )

    if isinstance(could_not_afford_doctor, str):
        could_not_afford_doctor = (
            could_not_afford_doctor.lower()
        )

    if (
        could_not_afford_doctor is True
        or could_not_afford_doctor == "yes"
    ):
        medcost1 = 1

    elif (
        could_not_afford_doctor is False
        or could_not_afford_doctor == "no"
    ):
        medcost1 = 2

    else:
        medcost1 = None

    # ---------------------------------------------------------
    # 16. ROUTINE CHECKUP
    # ---------------------------------------------------------

    checkup1 = lifestyle.get(
        "last_routine_checkup"
    )

    if checkup1 is None:
        checkup1 = medical.get(
            "last_routine_checkup"
        )

    if isinstance(checkup1, str):

        checkup_mapping = {
            "within the past year": 1,
            "within past year": 1,
            "1-2 years ago": 2,
            "2-5 years ago": 3,
            "5 or more years ago": 4,
            "never": 8,
        }

        checkup1 = checkup_mapping.get(
            checkup1.lower()
        )

    if checkup1 is not None:

        checkup1 = int(checkup1)

        valid_checkup_values = {1, 2, 3, 4, 8}

        if checkup1 not in valid_checkup_values:
            raise ValueError(
                "last_routine_checkup must be "
                "one of 1, 2, 3, 4, or 8."
            )

    # ---------------------------------------------------------
    # FINAL 16 FEATURES
    # ---------------------------------------------------------

    transformed = {

        "_AGE80": age80,
        "SEXVAR": sexvar,
        "_BMI5": bmi5,
        "_SMOKER3": smoker3,
        "DRNKANY6": drnkany6,
        "_TOTINDA": totinda,
        "MENTHLTH": menthlth,
        "DIABETE4": diabetes4,
        "_MICHD": michd,
        "CHCCOPD3": chccopd3,
        "LCSCTSC1": lcsctsc1,
        "GENHLTH": genhlth,
        "PHYSHLTH": physhlth,
        "_HLTHPL2": hlthpl2,
        "MEDCOST1": medcost1,
        "CHECKUP1": checkup1,
    }

    return pd.DataFrame(
        [transformed],
        columns=MODEL_FEATURE_ORDER
    )


# ============================================================
# MODEL OUTPUT
# ============================================================

def create_curamind_v1_output(probability):

    probability = float(probability)

    if not 0 <= probability <= 1:
        raise ValueError(
            "Model probability must be between 0 and 1."
        )

    risk_category = (
        "elevated"
        if probability >= V1_DECISION_THRESHOLD
        else "lower"
    )

    return {
        "probability": probability,
        "probability_percent": round(
            probability * 100,
            2
        ),
        "risk_category": risk_category,
        "decision_threshold": V1_DECISION_THRESHOLD,
        "model_name": "CuraMind_V1_GradientBoosting",
        "target_definition": (
            "BRFSS cancer-history proxy derived from "
            "CHCOCNC1; not future cancer prediction."
        ),
    }


# ============================================================
# SHAP EXPLANATION
# ============================================================

def create_shap_explanation(
    shap_row,
    transformed_row,
    original_input,
    top_n=10,
):

    shap_row = np.asarray(
        shap_row
    ).reshape(-1)

    transformed_row = np.asarray(
        transformed_row
    ).reshape(-1)

    transformed_feature_names = (
        preprocessor.get_feature_names_out()
    )

    explanations = []

    for feature in MODEL_FEATURE_ORDER:

        matching_indices = [
            i
            for i, name in enumerate(
                transformed_feature_names
            )
            if name.split(
                "__",
                1
            )[-1].startswith(feature)
        ]

        feature_shap = float(
            shap_row[
                matching_indices
            ].sum()
        )

        input_value = (
            original_input[
                feature
            ].iloc[0]
        )

        if pd.isna(input_value):
            input_value = None

        elif isinstance(
            input_value,
            np.integer
        ):
            input_value = int(
                input_value
            )

        elif isinstance(
            input_value,
            np.floating
        ):
            input_value = float(
                input_value
            )

        direction = (
            "positive"
            if feature_shap > 0
            else "negative"
            if feature_shap < 0
            else "neutral"
        )

        explanations.append({

            "feature": str(feature),

            "label": str(
                SHAP_FEATURE_LABELS[
                    feature
                ]
            ),

            "input_value": input_value,

            "shap_value": float(
                feature_shap
            ),

            "direction": str(
                direction
            ),

            "absolute_shap": float(
                abs(feature_shap)
            ),
        })

    explanations.sort(
        key=lambda x: x["absolute_shap"],
        reverse=True
    )

    return explanations[:top_n]


# ============================================================
# COMPLETE ML INFERENCE
# ============================================================

def predict_curamind(patient):

    # 1. Frontend JSON → 16 raw features
    raw_model_input = (
        transform_curamind_patient(
            patient
        )
    )

    # 2. 16 → 38 processed features
    processed_model_input = (
        preprocessor.transform(
            raw_model_input
        )
    )

    # 3. Model prediction
    probability = float(
        gb_model.predict_proba(
            processed_model_input
        )[0, 1]
    )

    # 4. Standardized prediction output
    prediction = (
        create_curamind_v1_output(
            probability
        )
    )

    # 5. SHAP
    shap_explainer = shap.TreeExplainer(
        gb_model
    )

    shap_values = (
        shap_explainer.shap_values(
            processed_model_input
        )
    )

    # 6. Human-readable explanations
    explanations = (
        create_shap_explanation(
            shap_row=shap_values[0],
            transformed_row=processed_model_input[0],
            original_input=raw_model_input,
            top_n=10,
        )
    )

    # 7. Final JSON-safe response
    response = {
        "prediction": prediction,
        "explanations": explanations,
    }

    # 8. Confirm JSON serialization
    json.dumps(response)

    return response