from fastapi import FastAPI

from api.routes import router
from exceptions.handlers import register_exception_handlers

app = FastAPI(
    title="CuraMind API",
    description="AI-assisted Cancer Risk Screening API",
    version="1.0.0"
)

app.include_router(router)

register_exception_handlers(app)
