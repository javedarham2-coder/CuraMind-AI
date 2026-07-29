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
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://10.234.108.11:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routes
app.include_router(router)

# Register exception handlers
register_exception_handlers(app)
