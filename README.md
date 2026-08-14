# 🧠 CuraMind

### AI-Assisted Early Cancer Risk Screening & Clinical Decision Support

[![Live Demo](https://img.shields.io/badge/Live%20Demo-CuraMind-6C4CE8?style=for-the-badge)](https://curamind-ai.netlify.app/)
[![Backend API](https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge)](https://curamind-ai-mx76.onrender.com/)

**CuraMind** is an AI-assisted preventive healthcare platform designed to simplify the early cancer screening journey.

It collects relevant patient information—including demographics, lifestyle factors, family history, medical information, environmental factors, and symptoms—and processes the assessment through **CuraCore™**, our rule-based risk screening engine.

The system generates cancer-wise risk scores, explains contributing factors, and provides personalized screening-oriented recommendations.

> ⚕️ **Important:** CuraMind is a screening and clinical decision-support prototype. It does **not** diagnose or predict cancer and does not replace qualified medical professionals or clinical evaluation.

---

## 🚀 Live Prototype

### 🌐 Frontend

**https://curamind-ai.netlify.app/**

### ⚙️ Backend API

**https://curamind-ai-mx76.onrender.com/**

### ❤️ Health Check

**https://curamind-ai-mx76.onrender.com/health**

The deployed prototype connects the React frontend to the FastAPI backend and runs the CuraCore risk-screening workflow end-to-end.

---

# 🎯 Problem

Cancer screening can be confusing and delayed because people may:

* Ignore early symptoms
* Be unaware of important risk factors
* Not know which screening pathway is appropriate
* Search for information across disconnected sources
* Reach healthcare providers later than ideal

Healthcare providers can also benefit from better-organized patient information and risk-screening support.

CuraMind aims to simplify this journey by bringing **patient assessment, risk screening, explanations, and recommendations into one workflow.**

---

# 💡 Solution

CuraMind follows a patient-to-screening workflow:

```text
👤 Patient
    ↓
📋 Health Assessment
    ↓
🧠 CuraCore™ Risk Engine
    ↓
🎯 Cancer-Wise Risk Results
    ↓
💡 Personalized Recommendations
    ↓
👨‍⚕️ Clinical Review
```

The current prototype focuses on the first five stages and provides a working end-to-end screening workflow.

---

# 🧠 CuraCore™

**CuraCore™** is the current intelligence layer of CuraMind.

The present prototype uses a **transparent rule-based risk engine** rather than a trained machine-learning model.

### Current pipeline

```text
Patient Data
     ↓
Configured Risk Rules & Weights
     ↓
Cancer-Wise Risk Scores
     ↓
Risk Classification
     ↓
Explanation Engine
     ↓
Recommendation Engine
     ↓
Final Screening Report
```

### Risk Engine

The risk engine evaluates configured rules against patient information and symptom data to calculate cancer-wise scores.

### Explanation Engine

The explanation engine identifies the matched risk factors and generates understandable reasons associated with the calculated scores.

### Recommendation Engine

The recommendation engine uses the resulting risk level and configured cancer-specific information to generate:

* Recommended actions
* Next steps
* Relevant specialists
* Lifestyle guidance
* Tests to discuss where applicable

---

# ✨ Current Features

### 👤 Patient Assessment

The assessment workflow collects structured information across multiple areas:

* Personal information
* Medical information
* Lifestyle
* Family history
* Environmental factors
* Symptoms
* Relevant reports/information

### 🧠 Rule-Based Risk Screening

CuraCore™ evaluates the submitted information using configured rules and risk weights.

### 🎯 Cancer-Wise Risk Assessment

The backend calculates scores for the supported cancer categories and classifies applicable results into risk levels.

### 🔍 Explainable Results

The system provides the factors/rules that contributed to the calculated risk score.

### 💡 Personalized Recommendations

Recommendations are generated according to the resulting risk level and cancer-specific configuration.

### 📊 Results Dashboard

The frontend presents:

* Overall risk
* Cancer-wise scores
* Risk levels
* Contributing factors
* Recommended actions
* Suggested tests
* Lifestyle guidance

### 🔄 Full-Stack Integration

The frontend communicates with the FastAPI backend through REST API endpoints.

---
---

# 🖥️ How CuraMind Works

### 🏠 1. Start Screening
Begin the CuraMind cancer-risk screening journey from the landing page.By clicking on Start Screening

<img width="1680" height="932" alt="CuraMind Landing Page" src="https://github.com/user-attachments/assets/5e9f8252-95be-46e0-a638-f1c26289851f" />

---

### 📋 2. Health Assessment
Complete a guided 7-step assessment covering personal, lifestyle, family, medical, symptom, and environmental factors.

<img width="1680" height="932" alt="CuraMind Health Assessment" src="https://github.com/user-attachments/assets/79affe94-d9f0-4f44-8e93-fd557a607945" />

---

### 📄 3. Medical Reports
Optionally upload supporting medical reports before running the analysis. Then Click on Run CuraCore Analyse.

<img width="1680" height="932" alt="CuraMind Medical Reports" src="https://github.com/user-attachments/assets/34c59bc1-3e6d-4956-b65d-7d636e01c9d0" />

---

### 🧠 4. CuraCore™ Analysis
The rule-based CuraCore™ engine evaluates submitted risk factors and generates screening results.

<img width="1293" height="755" alt="CuraCore Analysis" src="https://github.com/user-attachments/assets/b9ac03f8-b0fe-4ccd-830f-27a2fdbc8adf" />

---

### 🎯 5. Risk Dashboard
View overall risk, cancer-wise scores, priority areas, recommended specialists, and contributing risk factors.

<img width="1680" height="932" alt="CuraMind Risk Dashboard" src="https://github.com/user-attachments/assets/ec08327d-6f2c-481a-9413-3a9a0857b665" />

---

### 📑 6. Final Report
Review, share, print, or download the generated CuraCore™ screening report.

<img width="1680" height="932" alt="CuraMind Final Report" src="https://github.com/user-attachments/assets/1ab3de50-0725-4efc-bb20-b4d17920548f" />

<img width="1680" height="932" alt="CuraMind Cancer Wise Report" src="https://github.com/user-attachments/assets/a1694bee-61bf-41e8-89c0-21cee1ae72a0" />

---

# 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │       Patient        │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React + Vite UI    │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌──────────────────────┐
                    │    FastAPI Backend   │
                    └──────────┬───────────┘
                               │
                ┌──────────────┼──────────────┐
                ▼              ▼              ▼
        ┌────────────┐ ┌─────────────┐ ┌──────────────┐
        │ Risk Engine│ │ Explanation │ │ Recommendation│
        │            │ │   Engine    │ │    Engine     │
        └─────┬──────┘ └──────┬──────┘ └──────┬───────┘
              │               │               │
              └───────────────┼───────────────┘
                              ▼
                    ┌──────────────────────┐
                    │   Screening Report   │
                    │ Risk + Reasons +     │
                    │ Recommendations      │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Results Dashboard  │
                    └──────────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Framer Motion
* Lucide React
* Three.js / Spline tooling

## Backend

* Python
* FastAPI
* Uvicorn
* Pydantic

## Risk & Intelligence Layer

* CuraCore™ Rule-Based Risk Engine
* Risk Weight Configuration
* Explanation Engine
* Recommendation Engine
* JSON-based configuration

## Deployment

* **Netlify** — Frontend
* **Render** — Backend

---

# 📁 Project Structure

```text
CuraMind/
│
├── backend/
│   ├── api/
│   │   └── routes.py
│   │
│   ├── config/
│   │   ├── patient_schema.json
│   │   ├── recommendations.json
│   │   └── risk_weights.json
│   │
│   ├── exceptions/
│   │   └── handlers.py
│   │
│   ├── models/
│   │   ├── request_models.py
│   │   └── response_models.py
│   │
│   ├── services/
│   │   ├── risk_engine.py
│   │   ├── explanation_engine.py
│   │   └── recommendation_engine.py
│   │
│   ├── utils/
│   │   └── responses.py
│   │
│   ├── main.py
│   ├── requirements.txt
│   └── test_engine.py
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── types/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── patient_schema.md
└── README.md
```

---

# 🔌 API

The backend currently exposes the following primary endpoints:

| Method | Endpoint   | Purpose                                                   |
| ------ | ---------- | --------------------------------------------------------- |
| `GET`  | `/`        | API information                                           |
| `GET`  | `/health`  | Health check                                              |
| `POST` | `/predict` | Process patient assessment and generate screening results |

### Example health response

```json
{
  "success": true,
  "message": "API is healthy.",
  "data": {
    "status": "healthy"
  }
}
```

---

# 💻 Local Development

## 1. Clone the repository

```bash
git clone <https://github.com/javedarham2-coder/CuraMind-AI.git>
cd CuraMind
```

---

## 2. Start the backend

```bash
cd backend
```

Create/activate a Python virtual environment if required:

```bash
python -m venv venv
```

### macOS / Linux

```bash
source venv/bin/activate
```

### Windows

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start FastAPI:

```bash
uvicorn main:app --reload
```

The backend will normally run at:

```text
http://127.0.0.1:8000
```

---

## 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create/update the frontend environment file:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Then start Vite:

```bash
npm run dev
```

The frontend will normally be available at the local Vite URL shown in the terminal.

---

# 🌐 Production Deployment

The current prototype uses:

```text
GitHub
   │
   ├── Frontend → Netlify
   │
   └── Backend  → Render
```

The frontend communicates with the deployed backend through:

```env
VITE_API_URL=https://curamind-ai-mx76.onrender.com
```

### Deployment workflow

```text
Edit Code
    ↓
Test Locally
    ↓
Git Commit
    ↓
Git Push
    ↓
GitHub
    ├──────────────→ Netlify
    │                 Frontend Deployment
    │
    └──────────────→ Render
                      Backend Deployment
```

---

# 🧪 Current Prototype Status

### 🟢 Working

* Patient assessment
* Frontend/backend integration
* FastAPI API
* CuraCore rule-based risk engine
* Cancer-wise risk scoring
* Risk classification
* Explanation generation
* Personalized recommendations
* Results/report interface
* End-to-end deployed workflow

### 🟡 Not currently implemented

* Doctor/clinical dashboard
* Persistent patient database
* Production authentication
* Advanced hospital/doctor locator functionality
* Full production-grade healthcare infrastructure

### 🔵 Planned Future Enhancements

* Curated cancer-risk datasets
* Unified machine-learning training dataset
* Machine-learning-based risk estimation
* Random Forest / Gradient Boosting model comparison
* SHAP-based explainability
* Medical report analysis
* Expanded clinical workflows
* Production-grade security and deployment

> The current hackathon prototype intentionally uses a **rule-based engine** so that the screening logic remains transparent and explainable.

---

# 🛣️ Roadmap

### Phase 1 — Assessment

Patient registration and structured health assessment.

### Phase 2 — CuraCore™ Screening

Rule-based cancer risk screening and risk stratification.

### Phase 3 — Personalized Guidance

Screening-oriented recommendations and explainable results.

### Phase 4 — Clinical Workflow

Doctor dashboard, patient prioritization, clinical validation, and follow-up planning.

### Phase 5 — Future AI Enhancement

Machine-learning models, SHAP explainability, medical report analysis, and broader deployment.

---

# ⚕️ Medical Disclaimer

**CuraMind is an AI-assisted screening and clinical decision-support prototype.**

It does **not** diagnose cancer, confirm the presence of cancer, or replace professional medical evaluation.

The risk scores and recommendations generated by CuraCore™ are intended to support screening awareness and decision-making. Users should consult qualified healthcare professionals for appropriate medical assessment, testing, diagnosis, and treatment.

---

### Made with ❤️ for more accessible and explainable preventive healthcare.

**CuraMind — Earlier Screening. Better Decisions. Better Outcomes.**
