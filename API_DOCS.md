# API Документация - Система сокращения ссылок

## Обзор

API предоставляет полный функционал для управления ссылками:

- Создание коротких ссылок
- Получение списка ссылок
- Обновление и удаление ссылок
- Редирект по коротким ID

## Аутентификация

Все операции создания, обновления и удаления требуют API ключ в заголовке:

```
x-api-key: YOUR_API_KEY
```

## Endpoints

### 1. Получить все ссылки

**GET** `/api/links`

Возвращает список всех ссылок, отсортированный по дате создания (новые первые).

**Ответ:**

```json
{
  "links": [
    {
      "id": "uuid",
      "url": "https://example.com",
      "shortId": "abc123",
      "title": "Пример ссылки",
      "description": "Описание ссылки",
      "isActive": true,
      "clickCount": 42,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### 2. Создать новую ссылку

**POST** `/api/links`

Создает новую короткую ссылку.

**Заголовки:**

```
Content-Type: application/json
x-api-key: YOUR_API_KEY
```

**Тело запроса:**

```json
{
  "url": "https://example.com",
  "title": "Название ссылки (опционально)",
  "description": "Описание ссылки (опционально)"
}
```

**Ответ (201):**

```json
{
  "link": {
    "id": "uuid",
    "url": "https://example.com",
    "shortId": "abc123",
    "title": "Название ссылки",
    "description": "Описание ссылки",
    "isActive": true,
    "clickCount": 0,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Ошибки:**

- `400` - URL обязателен
- `401` - Неверный или отсутствующий API ключ
- `500` - Ошибка создания ссылки

### 3. Получить конкретную ссылку

**GET** `/api/links/{id}`

Возвращает данные конкретной ссылки по её UUID.

**Ответ:**

```json
{
  "link": {
    "id": "uuid",
    "url": "https://example.com",
    "shortId": "abc123",
    "title": "Название ссылки",
    "description": "Описание ссылки",
    "isActive": true,
    "clickCount": 42,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Ошибки:**

- `404` - Ссылка не найдена

### 4. Обновить ссылку

**PUT** `/api/links/{id}`

Обновляет данные существующей ссылки.

**Заголовки:**

```
Content-Type: application/json
x-api-key: YOUR_API_KEY
```

**Тело запроса (все поля опциональны):**

```json
{
  "url": "https://new-example.com",
  "title": "Новое название",
  "description": "Новое описание",
  "isActive": false
}
```

**Ответ:**

```json
{
  "link": {
    "id": "uuid",
    "url": "https://new-example.com",
    "shortId": "abc123",
    "title": "Новое название",
    "description": "Новое описание",
    "isActive": false,
    "clickCount": 42,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T12:00:00.000Z"
  }
}
```

**Ошибки:**

- `401` - Неверный или отсутствующий API ключ
- `404` - Ссылка не найдена

### 5. Удалить ссылку

**DELETE** `/api/links/{id}`

Удаляет ссылку по её UUID.

**Заголовки:**

```
x-api-key: YOUR_API_KEY
```

**Ответ:**

```json
{
  "message": "Link deleted successfully"
}
```

**Ошибки:**

- `401` - Неверный или отсутствующий API ключ
- `404` - Ссылка не найдена

### 6. Редирект по короткому ID

**GET** `/api/redirect/{shortId}`

Возвращает данные ссылки для редиректа. Увеличивает счетчик кликов.
Если ссылка не найдена, автоматически перенаправляет на дефолтную ссылку (если настроена).

**Ответ:**

```json
{
  "url": "https://example.com",
  "title": "Название ссылки",
  "description": "Описание ссылки"
}
```

**Ошибки:**

- `404` - Ссылка не найдена
- `403` - Ссылка неактивна

### 7. Получить дефолтную ссылку

**GET** `/api/default`

Возвращает дефолтную ссылку для редиректа с голого домена. Увеличивает счетчик кликов.

**Ответ:**

```json
{
  "url": "https://example.com",
  "title": "Дефолтная ссылка",
  "description": "Описание дефолтной ссылки"
}
```

**Ошибки:**

- `404` - Дефолтная ссылка не настроена

## Дефолтные ссылки

Система поддерживает одну дефолтную ссылку (`isDefault: true`), которая используется для:

- Редиректа с голого домена (`/`)
- Fallback при переходе на несуществующий `shortId`

**Особенности:**

- Может быть только одна дефолтная ссылка
- Дефолтная ссылка не имеет `shortId` (равен `null`)
- При создании новой дефолтной ссылки старая автоматически сбрасывается

## Использование редиректов

После создания ссылки с `shortId`, пользователи могут переходить по адресу:

```
https://yourdomain.com/{shortId}
```

Например, если создана ссылка с `shortId: "abc123"`, то редирект будет работать по адресу:

```
https://yourdomain.com/abc123
```

## Примеры использования

### JavaScript/TypeScript

```typescript
import { LinkApiClient } from "@/shared/lib";

const apiClient = new LinkApiClient("your-api-key");

// Создать ссылку
const newLink = await apiClient.createLink({
  url: "https://example.com",
  title: "Мой сайт",
  description: "Главная страница",
});

// Получить все ссылки
const links = await apiClient.getAllLinks();

// Обновить ссылку
await apiClient.updateLink(newLink.id, {
  isActive: false,
});

// Удалить ссылку
await apiClient.deleteLink(newLink.id);
```

### cURL

```bash
# Создать ссылку
curl -X POST /api/links \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"url": "https://example.com", "title": "Мой сайт"}'

# Получить все ссылки
curl -X GET /api/links

# Обновить ссылку
curl -X PUT /api/links/uuid \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"isActive": false}'

# Удалить ссылку
curl -X DELETE /api/links/uuid \
  -H "x-api-key: YOUR_API_KEY"
```

## Коды ответов

- `200` - Успешный запрос
- `201` - Ресурс создан
- `400` - Неверный запрос
- `401` - Неавторизован
- `403` - Доступ запрещен
- `404` - Ресурс не найден
- `500` - Внутренняя ошибка сервера

## Структура данных

### Link

```typescript
interface Link {
  id: string; // UUID ссылки
  url: string; // Оригинальный URL
  shortId: string | null; // Короткий ID для редиректа (null для дефолтной)
  title?: string; // Название ссылки
  description?: string; // Описание ссылки
  isActive: boolean; // Активна ли ссылка
  isDefault: boolean; // Является ли дефолтной ссылкой
  clickCount: number; // Количество кликов
  createdAt: string; // Дата создания (ISO)
  updatedAt: string; // Дата обновления (ISO)
}
```
