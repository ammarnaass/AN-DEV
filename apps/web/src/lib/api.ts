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
    let errorMsg = "حدث خطأ في الاتصال بالخادم";
    try {
      const data = await res.json();
      errorMsg = data.error || errorMsg;
    } catch {
      // fallback
    }
    throw new Error(errorMsg);
  }

  return res.json();
}

