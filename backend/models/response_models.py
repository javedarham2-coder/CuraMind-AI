from typing import Any, Dict

from pydantic import BaseModel


class PredictResponse(BaseModel):
    """
    Prediction payload returned by the recommendation engine.
    """
    report: Dict[str, Any]


class APIResponse(BaseModel):
    """
    Standard API response wrapper used across all endpoints.
    """

    success: bool
    message: str
    data: Any = None
    