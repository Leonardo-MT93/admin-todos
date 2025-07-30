import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json({ message: "Hello, world!" });
}

export async function POST(request: NextRequest) {
    const { message } = await request.json();
    return NextResponse.json({ message: "Hello, world!" });
}