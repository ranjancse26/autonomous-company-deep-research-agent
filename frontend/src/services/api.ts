// API Service for Deep Research Agent
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.detail || `HTTP error! status: ${response.status}`,
      };
    }

    // For file responses, return the blob
    if (
      response.headers.get('content-type')?.includes('application/pdf') ||
      response.headers.get('content-type')?.includes('text/markdown')
    ) {
      const data = await response.blob();
      return { data: data as T };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Health check
export async function checkApiHealth(): Promise<ApiResponse<{ status: string }>> {
  return fetchApi<{ status: string }>('/');
}

// Comprehensive research
export async function runResearch(
  query: string,
  country: string = 'US',
  researchTypes?: string[]
): Promise<ApiResponse<any>> {
  const params = new URLSearchParams({
    query: query,
    country: country,
  });
  if (researchTypes && researchTypes.length > 0) {
    researchTypes.forEach(type => params.append('research_types', type));
  }
  return fetchApi<any>(`/research?${params.toString()}`, {
    method: 'POST',
  });
}

// Generate VC Report
export async function generateVCReport(
  company: string,
  format: 'pdf' | 'markdown' = 'pdf',
  country: string = 'US'
): Promise<ApiResponse<Blob>> {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-vc-report`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        company,
        format,
        country,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        error: errorData.detail || `HTTP error! status: ${response.status}`,
      };
    }

    const blob = await response.blob();
    return { data: blob };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
}

// Get funding history
export async function getFundingHistory(
  company: string
): Promise<ApiResponse<any>> {
  return fetchApi<any>(`/company/funding?company=${encodeURIComponent(company)}`);
}

// Get competitors
export async function getCompetitors(
  company: string
): Promise<ApiResponse<any>> {
  return fetchApi<any>(`/company/competitors?company=${encodeURIComponent(company)}`);
}

// Get founders
export async function getFounders(
  company: string
): Promise<ApiResponse<any>> {
  return fetchApi<any>(`/company/founders?company=${encodeURIComponent(company)}`);
}

// Get hiring signals
export async function getHiringSignals(
  company: string
): Promise<ApiResponse<any>> {
  return fetchApi<any>(`/company/hiring?company=${encodeURIComponent(company)}`);
}

// Get news intelligence
export async function getNewsIntelligence(
  company: string
): Promise<ApiResponse<any>> {
  return fetchApi<any>(`/company/news?company=${encodeURIComponent(company)}`);
}

// Get technology stack
export async function getTechnologyStack(
  company: string
): Promise<ApiResponse<any>> {
  return fetchApi<any>(`/company/technology?company=${encodeURIComponent(company)}`);
}