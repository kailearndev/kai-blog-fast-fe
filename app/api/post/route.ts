import { api, APIError } from "@/lib/fetch";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await api.get("/posts");
    return NextResponse.json(data);
  } catch (error: any) {
    if (error instanceof APIError) {
      return NextResponse.json(
        { message: error.message, detail: error.data },
        { status: error.status }
      );
    }
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}
