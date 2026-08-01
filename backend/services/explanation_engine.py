# Explanation engine service that generates a readable risk report with matched reasons.
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CONFIG_DIR = BASE_DIR / "config"

RISK_WEIGHTS = CONFIG_DIR / "risk_weights.json"


class ExplanationEngine:

    def __init__(self):
        with open(RISK_WEIGHTS, "r") as file:
            self.weights = json.load(file)

    def get_value(self, patient, path):
        value = patient

        try:
            for key in path:
                value = value[key]
            return value
        except (KeyError, TypeError):
            return None

    def evaluate_rule(self, patient_value, operator, rule_value):

        if operator == "==":
            return patient_value == rule_value

        if operator == ">=":
            return patient_value >= rule_value

        if operator == "<=":
            return patient_value <= rule_value

        if operator == ">":
            return patient_value > rule_value

        if operator == "<":
            return patient_value < rule_value

        return False

    def get_risk_level(self, score):

        levels = self.weights["risk_levels"]

        if levels["high"]["min"] <= score <= levels["high"]["max"]:
            return "High"

        if levels["moderate"]["min"] <= score <= levels["moderate"]["max"]:
            return "Moderate"

        return "Low"

    def generate(self, scores, patient):

        report = {}

        for cancer, score in scores.items():

            reasons = []

            # Evaluate all rules
            for rule in self.weights["rules"]:

                patient_value = self.get_value(
                    patient,
                    rule["path"]
                )

                if patient_value is None:
                    continue

                if (
                    cancer in rule["weights"]
                    and self.evaluate_rule(
                        patient_value,
                        rule["operator"],
                        rule["value"]
                    )
                ):
                    reasons.append(rule["name"])

            # Evaluate symptoms
            symptoms = patient.get("symptoms", {})

            for symptom, present in symptoms.items():

                if (
                    present
                    and symptom in self.weights["symptoms"]
                    and cancer in self.weights["symptoms"][symptom]
                ):
                    reasons.append(
                        symptom.replace("_", " ").title()
                    )

            report[cancer] = {
                "score": score,
                "risk": self.get_risk_level(score),
                "reasons": reasons
            }

        return report