import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
CONFIG_DIR = BASE_DIR / "config"

RISK_WEIGHTS = CONFIG_DIR / "risk_weights.json"


class RiskEngine:

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

    def add_scores(self, scores, weights):
        for cancer, value in weights.items():
            scores[cancer] = scores.get(cancer, 0) + value

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

    def calculate_risk(self, patient_data):

        scores = {
            cancer: 0
            for cancer in self.weights["supported_cancers"]
        }

        # Execute all rules
        for rule in self.weights["rules"]:

            patient_value = self.get_value(
                patient_data,
                rule["path"]
            )

            if patient_value is None:
                continue

            if self.evaluate_rule(
                patient_value,
                rule["operator"],
                rule["value"]
            ):
                self.add_scores(
                    scores,
                    rule["weights"]
                )

        # Process symptoms
        symptoms = patient_data.get("symptoms", {})

        for symptom, present in symptoms.items():

            if not present:
                continue

            if symptom in self.weights["symptoms"]:
                self.add_scores(
                    scores,
                    self.weights["symptoms"][symptom]
                )

        return scores
    
    