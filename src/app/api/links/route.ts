import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function generateShortId(): string {
  return Math.random().toString(36).substring(2, 8);
}

async function validateApiKey(key: string | null) {
  if (!key) {
    return { error: "API key is required", status: 401 };
  }

  const apiKey = await prisma.apiKey.findFirst({
    where: { key },
  });

  if (!apiKey) {
    return { error: "Invalid API key", status: 401 };
  }

  return null;
}

// GET - получить список всех ссылок
export async function GET() {
  try {
    const links = await prisma.link.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ links });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
}

// POST - создать новую ссылку
export async function POST(request: Request) {
  try {
    const authError = await validateApiKey(request.headers.get("x-api-key"));
    if (authError) {
      return NextResponse.json(authError, { status: authError.status });
    }

    const { url, title, description, isDefault } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Если это дефолтная ссылка, проверяем что других дефолтных нет
    if (isDefault) {
      const existingDefault = await prisma.link.findFirst({
        where: { isDefault: true },
      });

      if (existingDefault) {
        return NextResponse.json(
          {
            error:
              "Default link already exists. Update or delete existing default link first.",
          },
          { status: 400 }
        );
      }
    }

    // Генерируем уникальный shortId только если это не дефолтная ссылка
    let shortId: string | null = null;

    if (!isDefault) {
      let isUnique = false;
      let attempts = 0;

      while (!isUnique && attempts < 10) {
        shortId = generateShortId();
        const existing = await prisma.link.findUnique({
          where: { shortId },
        });

        if (!existing) {
          isUnique = true;
        } else {
          attempts++;
        }
      }

      if (!isUnique) {
        return NextResponse.json(
          { error: "Failed to generate unique short ID" },
          { status: 500 }
        );
      }
    }

    const link = await prisma.link.create({
      data: {
        url,
        shortId,
        title,
        description,
        isDefault: isDefault || false,
      },
    });

    return NextResponse.json({ link }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}
