import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// GET - получить дефолтную ссылку
export async function GET() {
  try {
    const defaultLink = await prisma.link.findFirst({
      where: {
        isDefault: true,
        isActive: true,
      },
    });

    if (!defaultLink) {
      return NextResponse.json(
        { error: "No default link found" },
        { status: 404 }
      );
    }

    // Увеличиваем счетчик кликов
    await prisma.link.update({
      where: { id: defaultLink.id },
      data: { clickCount: defaultLink.clickCount + 1 },
    });

    return NextResponse.json({
      url: defaultLink.url,
      title: defaultLink.title,
      description: defaultLink.description,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch default link" },
      { status: 500 }
    );
  }
}
