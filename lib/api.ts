export async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem('raya_token') : null;
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, { 
      ...options, 
      headers,
      // Setting a signal timeout prevents the app from hanging forever
      signal: AbortSignal.timeout(8000) 
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    return await response.json();
  } catch (err: any) {
    // If the fetch fails entirely (Backend not running)
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      throw new Error("Backend server is offline. Please run 'npm run dev' on the API.");
    }
    throw err;
  }
}