import { EventAnalysisData, AnalysisResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function checkBackendHealth(): Promise<{ status: string; has_serpapi_key: boolean }> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
    });
    if (!res.ok) {
      return { status: 'error', has_serpapi_key: false };
    }
    return await res.json();
  } catch (err) {
    return { status: 'unreachable', has_serpapi_key: false };
  }
}

export async function fetchSponsorshipAnalysis(
  payload: EventAnalysisData,
  customApiKey?: string
): Promise<AnalysisResponse> {
  const url = `${API_BASE_URL}/api/analyze`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (customApiKey && customApiKey.trim()) {
    headers['api-key-header'] = customApiKey.trim();
  }

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMsg = `Server returned ${response.status}: ${response.statusText}`;
    try {
      const errorJson = await response.json();
      if (errorJson.detail) {
        errorMsg = errorJson.detail;
      }
    } catch {
      // fallback to statusText
    }
    throw new Error(errorMsg);
  }

  const data = await response.json();
  return data;
}
