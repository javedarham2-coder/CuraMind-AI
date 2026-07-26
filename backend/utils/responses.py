from fastapi.responses import JSONResponse

from models.response_models import APIResponse


def success_response(
    data=None,
    message="Success",
    status_code=200
):

    response = APIResponse(
        success=True,
        message=message,
        data=data
    )

    return JSONResponse(
        status_code=status_code,
        content=response.model_dump()
    )


def error_response(
    message="Something went wrong.",
    status_code=500,
    details=None
):

    response = APIResponse(
        success=False,
        message=message,
        data=details
    )

    return JSONResponse(
        status_code=status_code,
        content=response.model_dump()
    )
    
    