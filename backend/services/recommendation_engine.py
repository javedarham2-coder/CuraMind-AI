import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CONFIG_DIR = BASE_DIR / "config"

RECOMMENDATIONS = CONFIG_DIR / "recommendations.json"


class RecommendationEngine:

    def __init__(self):
        with open(RECOMMENDATIONS, "r") as file:
            self.data = json.load(file)

    def generate(self, report):

        final_report = {}

        risk_profiles = self.data["risk_levels"]
        cancers = self.data["cancers"]

        for cancer, details in report.items():

            risk = details["risk"]

            profile = risk_profiles[risk]

            cancer_info = cancers.get(cancer, {})

            recommendation = {
                "urgency": profile["urgency"],
                "action": profile["action"],
                "next_steps": profile["next_steps"],
                "specialist": cancer_info.get(
                    "specialist",
                    "General Physician"
                ),
                "lifestyle": cancer_info.get(
                    "lifestyle",
                    []
                )
            }

            if profile["show_tests"]:

                recommendation["tests_to_discuss"] = cancer_info.get(
                    "tests",
                    []
                )

            final_report[cancer] = {
                **details,
                "recommendation": recommendation
            }

        return final_report