export class APIError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number, data: any) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.data = data;
  }
}

async function fetcher<T>(
  endPoint: string,
  options: RequestInit = {}
): Promise<T> {
  const baseUrl = process.env.API_BASE_URL! || "http://localhost:3000/api";
  if (!baseUrl) {
    throw new Error("API_BASE_URL is not defined");
  }
  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
  const cleanEndpoint = endPoint.startsWith("/") ? endPoint : `/${endPoint}`;
  const fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  const config: RequestInit = {
    ...options,
    headers,
    cache: options.cache || "no-cache", // Mặc định không cache để lấy data mới nhất
  };

  try {
    const response = await fetch(fullUrl, config);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new APIError(
        data?.message || "An error occurred while fetching the data.",
        response.status,
        data
      );
    }
    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Network error or invalid JSON response", 500, null);
  }
}

export const api = {
  get: <T>(endPoint: string, headers?: HeadersInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "GET",
      headers,
    });
  },
  post: <T>(endPoint: string, body: any, headers?: HeadersInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
  },
  put: <T>(endPoint: string, body: any, headers?: HeadersInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });
  },
  delete: <T>(endPoint: string, headers?: HeadersInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "DELETE",
      headers,
    });
  },
};
