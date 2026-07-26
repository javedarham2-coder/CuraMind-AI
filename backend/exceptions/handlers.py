from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError

from utils.responses import error_response


def register_exception_handlers(app: FastAPI):
    """
    Register all global exception handlers.
    """

    @app.exception_handler(RequestValidationError)
    async def validation_exception_handler(
        request: Request,
        exc: RequestValidationError
    ):

        return error_response(
            message="Invalid request data.",
            status_code=422,
            details=exc.errors()
        )

    @app.exception_handler(FileNotFoundError)
    async def file_not_found_handler(
        request: Request,
        exc: FileNotFoundError
    ):

        return error_response(
            message=str(exc),
            status_code=500
        )

    @app.exception_handler(Exception)
    async def generic_exception_handler(
        request: Request,
        exc: Exception
    ):

        print(exc)

        return error_response(
            message="Internal server error.",
            status_code=500
        )
        