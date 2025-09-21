import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const link = await prisma.link.findUnique({
      where: { id },
    });

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    return NextResponse.json({ link });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch link" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await validateApiKey(request.headers.get("x-api-key"));
    if (authError) {
      return NextResponse.json(authError, { status: authError.status });
    }

    const { id } = await params;
    const { url, title, description, isActive, isDefault } =
      await request.json();

    // Проверяем существование ссылки
    const existingLink = await prisma.link.findUnique({
      where: { id },
    });

    if (!existingLink) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Если пытаемся сделать дефолтной, проверяем что других дефолтных нет
    if (isDefault && !existingLink.isDefault) {
      const existingDefault = await prisma.link.findFirst({
        where: {
          isDefault: true,
          id: { not: id },
        },
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

    // Обновляем ссылку
    const updatedLink = await prisma.link.update({
      where: { id },
      data: {
        ...(url && { url }),
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(isActive !== undefined && { isActive }),
        ...(isDefault !== undefined && { isDefault }),
      },
    });

    return NextResponse.json({ link: updatedLink });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update link" },
      { status: 500 }
    );
  }
}

// DELETE - удалить ссылку
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authError = await validateApiKey(request.headers.get("x-api-key"));
    if (authError) {
      return NextResponse.json(authError, { status: authError.status });
    }

    const { id } = await params;

    // Проверяем существование ссылки
    const existingLink = await prisma.link.findUnique({
      where: { id },
    });

    if (!existingLink) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    // Удаляем ссылку
    await prisma.link.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Link deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete link" },
      { status: 500 }
    );
  }
}
