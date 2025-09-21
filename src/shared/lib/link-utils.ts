// Утилиты для работы со ссылками

export interface LinkData {
  id: string;
  url: string;
  shortId: string | null;
  title?: string;
  description?: string;
  isActive: boolean;
  isDefault: boolean;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLinkData {
  url: string;
  title?: string;
  description?: string;
  isDefault?: boolean;
}

export interface UpdateLinkData {
  url?: string;
  title?: string;
  description?: string;
  isActive?: boolean;
  isDefault?: boolean;
}

// API клиент для работы со ссылками
export class LinkApiClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Получить все ссылки
  async getAllLinks(): Promise<LinkData[]> {
    const response = await fetch("/api/links");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch links");
    }

    return data.links;
  }

  // Создать новую ссылку
  async createLink(linkData: CreateLinkData): Promise<LinkData> {
    const response = await fetch("/api/links", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(linkData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to create link");
    }

    return data.link;
  }

  // Получить ссылку по ID
  async getLink(id: string): Promise<LinkData> {
    const response = await fetch(`/api/links/${id}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to fetch link");
    }

    return data.link;
  }

  // Обновить ссылку
  async updateLink(id: string, linkData: UpdateLinkData): Promise<LinkData> {
    const response = await fetch(`/api/links/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": this.apiKey,
      },
      body: JSON.stringify(linkData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to update link");
    }

    return data.link;
  }

  // Удалить ссылку
  async deleteLink(id: string): Promise<void> {
    const response = await fetch(`/api/links/${id}`, {
      method: "DELETE",
      headers: {
        "x-api-key": this.apiKey,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to delete link");
    }
  }

  // Получить статистику редиректа
  async getRedirectStats(shortId: string): Promise<{
    url: string;
    title?: string;
    description?: string;
    isDefault?: boolean;
  }> {
    const response = await fetch(`/api/redirect/${shortId}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get redirect stats");
    }

    return data;
  }

  // Получить дефолтную ссылку
  async getDefaultLink(): Promise<{
    url: string;
    title?: string;
    description?: string;
  }> {
    const response = await fetch("/api/default");
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get default link");
    }

    return data;
  }

  // Создать дефолтную ссылку
  async createDefaultLink(
    linkData: Omit<CreateLinkData, "isDefault">
  ): Promise<LinkData> {
    return this.createLink({ ...linkData, isDefault: true });
  }
}

// Валидация URL
export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// Форматирование URL (добавление протокола если отсутствует)
export function formatUrl(url: string): string {
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
}

// Генерация QR кода URL
export function generateQrCodeUrl(shortId: string, domain: string): string {
  const shortUrl = `${domain}/${shortId}`;
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    shortUrl
  )}`;
}
