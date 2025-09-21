import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ shortId: string }> }
) {
  try {
    const { shortId } = await params;

    const link = await prisma.link.findUnique({
      where: { shortId },
    });

    let targetLink = link;

    // Если ссылка не найдена, ищем дефолтную ссылку
    if (!link) {
      const defaultLink = await prisma.link.findFirst({
        where: {
          isDefault: true,
          isActive: true,
        },
      });

      if (!defaultLink) {
        return NextResponse.json(
          { error: "Link not found and no default link set" },
          { status: 404 }
        );
      }

      targetLink = defaultLink;
    }

    if (!targetLink!.isActive) {
      return NextResponse.json({ error: "Link is inactive" }, { status: 403 });
    }

    await prisma.link.update({
      where: { id: targetLink!.id },
      data: { clickCount: targetLink!.clickCount + 1 },
    });

    return NextResponse.json({
      url: targetLink!.url,
      title: targetLink!.title,
      description: targetLink!.description,
      isDefault: !link, // Если ссылка не найдена, то редиректим через дефолтную
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process redirect" },
      { status: 500 }
    );
  }
}
