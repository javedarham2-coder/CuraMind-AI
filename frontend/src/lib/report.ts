import type { CancerRiskResult, PredictResponse, Recommendation, RiskBreakdown, RiskLevel } from "@/types/patient";

export function getReportEntries(response: PredictResponse): Array<[string, CancerRiskResult]> {
  return Object.entries(response.report);
}

export function getRiskBreakdown(response: PredictResponse): RiskBreakdown[] {
  return getReportEntries(response).map(([cancer, result]) => ({
    key: cancer,
    label: cancer.charAt(0).toUpperCase() + cancer.slice(1),
    score: result.score,
    risk: result.risk,
  }));
}

export function getPrimaryResult(response: PredictResponse): CancerRiskResult | null {
  return getReportEntries(response).reduce<CancerRiskResult | null>(
    (highest, [, result]) => !highest || result.score > highest.score ? result : highest,
    null,
  );
}

export function getOverallRisk(response: PredictResponse): { score: number; level: RiskLevel } {
  const primary = getPrimaryResult(response);
  return primary ? { score: primary.score, level: primary.risk } : { score: 0, level: "Low" };
}

export function getSignalCount(response: PredictResponse): number {
  return getReportEntries(response).reduce((count, [, result]) => count + result.reasons.length, 0);
}

export function getRecommendation(response: PredictResponse): Recommendation | null {
  return getPrimaryResult(response)?.recommendation ?? null;
}

export function uniqueReportValues(response: PredictResponse, key: "tests_to_discuss" | "lifestyle"): string[] {
  return [...new Set(getReportEntries(response).flatMap(([, result]) => result.recommendation[key] ?? []))];
}
