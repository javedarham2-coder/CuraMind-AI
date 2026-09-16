# Defines API endpoints and orchestrates risk, explanation, and recommendation services.
from fastapi import APIRouter

from models.request_models import PredictRequest
from models.response_models import PredictResponse

from services.risk_engine import RiskEngine
from services.explanation_engine import ExplanationEngine
from services.recommendation_engine import RecommendationEngine
from utils.responses import success_response
from ml.curamind_ml_service import predict_curamind

router = APIRouter()


@router.get("/")
def root():
    return success_response(
    data={
        "name": "CuraMind API",
        "version": "1.0.0"
    },
    message="API is running."
)


@router.get("/health")
def health():
    return success_response(
    data={
        "status": "healthy"
    },
    message="API is healthy."
)


@router.post(
    "/predict",
    response_model=PredictResponse
)
def predict(request: PredictRequest):
    
    ml_result = predict_curamind(request.patient)

    risk_engine = RiskEngine()
    

    scores = risk_engine.calculate_risk(
        request.patient
    )

    explanation_engine = ExplanationEngine()

    report = explanation_engine.generate(
        scores,
        request.patient
    )

    recommendation_engine = RecommendationEngine()

    final_report = recommendation_engine.generate(
        report
    )
    final_report["ml_prediction"] = ml_result

    return success_response(
    data=PredictResponse(
        report=final_report
    ).model_dump(),

    message="Prediction completed successfully."
)
    
    