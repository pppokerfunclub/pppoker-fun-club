# Быстрый старт - Система сокращения ссылок

## Что было реализовано

✅ **Полная система управления ссылками:**

- Создание коротких ссылок с уникальными ID
- Создание дефолтной ссылки для fallback
- Получение списка всех ссылок
- Обновление и удаление ссылок
- Редирект по короткому ID
- Автоматический fallback на дефолтную ссылку

✅ **API Endpoints:**

- `GET /api/links` - получить все ссылки
- `POST /api/links` - создать ссылку
- `GET /api/links/{id}` - получить ссылку по ID
- `PUT /api/links/{id}` - обновить ссылку
- `DELETE /api/links/{id}` - удалить ссылку
- `GET /api/redirect/{shortId}` - редирект
- `GET /api/default` - получить дефолтную ссылку

✅ **Страницы редиректа:**

- `/` - автоматический редирект на дефолтную ссылку
- `/{shortId}` - автоматический редирект на оригинальную ссылку (с fallback на дефолтную)

## Как использовать

### 1. Создать ссылку

```bash
curl -X POST /api/links \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"url": "https://example.com", "title": "Мой сайт"}'
```

Ответ:

```json
{
  "link": {
    "id": "uuid",
    "url": "https://example.com",
    "shortId": "abc123",
    "title": "Мой сайт",
    "isActive": true,
    "clickCount": 0
  }
}
```

### 2. Использовать редирект

После создания ссылки пользователи могут переходить по:

```
https://yourdomain.com/abc123
```

И их автоматически перенаправит на `https://example.com`

### 3. Создать дефолтную ссылку

```bash
curl -X POST /api/links \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_API_KEY" \
  -d '{"url": "https://example.com", "title": "Дефолтная ссылка", "isDefault": true}'
```

### 4. Получить статистику

```bash
curl -X GET /api/links
```

## Структура базы данных

```sql
-- Таблица ссылок
CREATE TABLE links (
  id          TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  url         TEXT NOT NULL,
  short_id    TEXT UNIQUE,
  title       TEXT,
  description TEXT,
  is_active   BOOLEAN DEFAULT true,
  is_default  BOOLEAN DEFAULT false,
  click_count INTEGER DEFAULT 0,
  created_at  TIMESTAMP DEFAULT NOW(),
  updated_at  TIMESTAMP DEFAULT NOW()
);

-- Таблица API ключей
CREATE TABLE api_keys (
  id         TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Примеры использования

### JavaScript/TypeScript

```typescript
// Создать клиент
const apiClient = new LinkApiClient("your-api-key");

// Создать обычную ссылку
const link = await apiClient.createLink({
  url: "https://example.com",
  title: "Мой сайт",
});

console.log(`Короткая ссылка: https://yourdomain.com/${link.shortId}`);

// Создать дефолтную ссылку
const defaultLink = await apiClient.createDefaultLink({
  url: "https://default-example.com",
  title: "Дефолтная ссылка",
});

console.log(`Дефолтная ссылка создана: ${defaultLink.url}`);
```

### Python

```python
import requests

# Создать ссылку
response = requests.post('/api/links',
  headers={'x-api-key': 'your-api-key'},
  json={'url': 'https://example.com', 'title': 'Мой сайт'}
)

link = response.json()['link']
print(f"Короткая ссылка: https://yourdomain.com/{link['shortId']}")
```

## Что нужно сделать для запуска

1. **Обновить Prisma схему:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **Создать API ключ:**

   ```sql
   INSERT INTO api_keys (key) VALUES ('your-secret-api-key');
   ```

3. **Готово!** Система готова к использованию.

## Особенности

- 🔗 **Автоматическая генерация коротких ID** (6 символов)
- 🏠 **Дефолтная ссылка** для fallback и редиректа с голого домена
- 📊 **Счетчик кликов** для каждой ссылки
- 🔒 **Защита API ключами** для управления ссылками
- ⚡ **Быстрый редирект** без промежуточных страниц
- 🛡️ **Валидация URL** и обработка ошибок
- 📱 **Responsive дизайн** страниц ошибок
- 🔄 **Автоматический fallback** на дефолтную ссылку при несуществующих ID
