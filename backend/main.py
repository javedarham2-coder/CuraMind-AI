# Entrypoint for the FastAPI backend. Sets up app metadata, CORS, routes, and exception handlers.
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router
from exceptions.handlers import register_exception_handlers

app = FastAPI(
    title="CuraMind API",
    description="AI-assisted Cancer Risk Screening API",
    version="1.0.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      # Allow all origins during development
    allow_credentials=False,  # Must be False when using "*"
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(router)

# Register exception handlers
register_exception_handlers(app)
