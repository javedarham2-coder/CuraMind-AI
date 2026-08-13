# Simple test harness to exercise the risk, explanation, and recommendation pipeline locally.

from services.risk_engine import RiskEngine
from services.explanation_engine import ExplanationEngine
from services.recommendation_engine import RecommendationEngine

from pprint import pprint

patient = {
    "personal_information": {
        "age": 58,
        "gender": "male"
    },

    "lifestyle": {
        "smoking": {
            "status": "regular"
        },

        "alcohol": {
            "status": "heavy"
        },

        "tobacco": True
    },

    "family_history": {
        "has_cancer_history": True
    },

    "symptoms": {
        "persistent_cough": True,
        "weight_loss": True,
        "blood_in_stool": False,
        "lump": False,
        "fatigue": True,
        "difficulty_swallowing": False,
        "voice_change": False,
        "non_healing_ulcer": False,
        "abnormal_bleeding": False
    }
}

engine = RiskEngine()

scores = engine.calculate_risk(patient)

explainer = ExplanationEngine()

report = explainer.generate(
    scores,
    patient
)

recommender = RecommendationEngine()

final_report = recommender.generate(report)

pprint(final_report)

