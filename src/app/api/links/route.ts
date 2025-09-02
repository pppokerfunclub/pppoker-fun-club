import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const link = await prisma.link.findFirst();

  return NextResponse.json({
    url: link?.url,
  });
}

export async function POST(request: Request) {
  const { url } = await request.json();

  const key = request.headers.get("x-api-key");

  if (!key) {
    return NextResponse.json({ error: "API key is required" }, { status: 401 });
  }

  const apiKey = await prisma.apiKey.findFirst({
    where: {
      key,
    },
  });

  if (!apiKey) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
  }

  const existingLink = await prisma.link.findFirst();
  if (existingLink) {
    await prisma.link.update({
      where: { id: existingLink.id },
      data: { url },
    });
  } else {
    await prisma.link.create({
      data: { url },
    });
  }

  return NextResponse.json({ ok: true });
}
