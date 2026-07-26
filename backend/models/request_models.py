from typing import Any, Dict

from pydantic import BaseModel, Field


class PredictRequest(BaseModel):
    """
    Request body for the /predict endpoint.
    """

    patient: Dict[str, Any] = Field(
        ...,
        description="Patient information following the patient_schema.json structure."
    )
    