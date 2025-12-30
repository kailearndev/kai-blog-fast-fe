// 1. Giữ nguyên class Error của bạn
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
  // 2. SỬA QUAN TRỌNG: Trỏ thẳng vào Backend thật (Bỏ localhost đi để fix lỗi Network)
  const baseUrl = process.env.API_BASE_URL!;

  // Logic clean URL giữ nguyên
  const cleanBaseUrl = baseUrl.replace(/\/+$/, "");
  const cleanEndpoint = endPoint.startsWith("/") ? endPoint : `/${endPoint}`;
  const fullUrl = `${cleanBaseUrl}${cleanEndpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    // 3. SỬA QUAN TRỌNG: Mặc định cache 1 tiếng (ISR)
    // Giúp build thành công ra Static, fix lỗi "Dynamic server usage"
    next: { revalidate: 3600 },

    // Spread options xuống cuối để cho phép ghi đè từ bên ngoài
    ...options,

    headers,
  };

  // Log ra để debug
  console.log(`🚀 [API] Calling: ${fullUrl}`);

  try {
    const response = await fetch(fullUrl, config);

    let data;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      // Bắt lỗi parse JSON phòng trường hợp Server trả về HTML lỗi
      try {
        data = await response.json();
      } catch (e) {
        data = null;
      }
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Log lỗi chi tiết từ server
      console.error("❌ [API ERROR DETAILS]:", data);
      throw new APIError(
        data?.message || `Error ${response.status}: ${response.statusText}`,
        response.status,
        data
      );
    }
    return data as T;
  } catch (error: any) {
    if (error instanceof APIError) {
      throw error;
    }
    // Log lỗi gốc ra console để biết đường sửa
    console.error("💀 [FETCH FAILED]:", error);

    throw new APIError(error.message || "Network error", 500, null);
  }
}

// 4. SỬA QUAN TRỌNG: Cho phép truyền options vào wrapper
export const api = {
  get: <T>(endPoint: string, options?: RequestInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "GET",
      ...options, // 👈 Cho phép truyền { next: { revalidate: 0 } } từ page
    });
  },
  post: <T>(endPoint: string, body: any, options?: RequestInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "POST",
      body: JSON.stringify(body),
      ...options,
    });
  },
  put: <T>(endPoint: string, body: any, options?: RequestInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "PUT",
      body: JSON.stringify(body),
      ...options,
    });
  },
  delete: <T>(endPoint: string, options?: RequestInit): Promise<T> => {
    return fetcher<T>(endPoint, {
      method: "DELETE",
      ...options,
    });
  },
};
