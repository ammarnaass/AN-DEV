const BASE_URL = ((import.meta as any).env?.VITE_API_URL || "").replace(/\/$/, "");

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const path = endpoint.startsWith("/") ? endpoint : `/api/${endpoint}`;
  const url = BASE_URL ? `${BASE_URL}${path}` : path;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    credentials: "include"
  });

  if (!res.ok) {
    let errorMsg = `خطأ في الخادم (${res.status})`;
    try {
      const text = await res.text();
      try {
        const data = JSON.parse(text);
        errorMsg = data.error || data.message || errorMsg;
      } catch {
        if (text && text.length > 0) {
          errorMsg = `${errorMsg}: ${text.slice(0, 150)}`;
        }
      }
    } catch {
      // fallback
    }
    throw new Error(errorMsg);
  }

  return res.json();
}
