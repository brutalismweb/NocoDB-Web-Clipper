# 🧩 NocoDB Web Clipper

**NocoDB Web Clipper** is a simple Chrome extension that lets you save web pages directly into your NocoDB database — including the page title, link, tags, and your personal comment.
---

## ✨ Features
- Save **Title**, **Link**, **Tags**, and **Comment** directly into your NocoDB table  
- Works with self-hosted and cloud NocoDB instances  
- Simple setup: specify your server URL, API key, and table endpoint  
- Easy installation via Developer Mode for testing and development
- The extension automatically supports English, German, Spanish, French, and Russian languages.

---

## ⚙️ Requirements
- Google Chrome or any Chromium-based browser  
- A working NocoDB instance with an existing table for bookmarks  
- Your NocoDB **API key**

---

## ⚙️ Setup (NocoDB)
1. Create a table in your NocoDB project to store bookmarks.  
2. Add the following fields:
   - `Title` — Text  
   - `Link` — URL/Text  
   - `Tags` — Text  
   - `Comment` — Long text  
3. Generate your **API key** from NocoDB.  
4. Note the **table ID**  (e.g. `/api/v1/tables/<tableId>/records`).

---

## 🧠 Installation (Developer Mode)

> Since this extension is not yet published on the Chrome Web Store, you can install it manually in Developer Mode.

1. Download or clone this repository:
   ```bash
   git clone https://github.com/brutalismweb/NocoDB_web-clipper.git
   ```
2. Open Google Chrome and go to: chrome://extensions/
3. Turn on Developer mode (toggle in the top-right corner).
4. Click Load unpacked.
5. Select the folder where the extension files are located (the one with manifest.json).
6. The extension will appear in your toolbar and is ready to use 🎉

# 🧩 NocoDB Web Clipper

**NocoDB Web Clipper** - это простое расширение для Chrome, которое позволяет сохранять веб-страницы напрямую в вашу базу данных NocoDB — включая заголовок страницы, ссылку, теги и ваш комментарий.
---

## ✨ Возможности
- Сохраняет **Название**, **Ссылку**, **Теги**, и **Комментарий** прямо в таблицу NocoDB
- Работает с как с self-hosted, так и с облачными версиями NocoDB
- Простая настройка: укажите URL вашего сервера, API-ключ и идентификатор таблицы  
- Легкая установка через режим разработчика (Developer Mode) для тестирования и разработки
- Расширение поддерживает в автоматическом режиме Английский, Немецкий, Испанский, Французский и Русский языки.

---

## ⚙️ Требования
- Браузер Google Chrome или любой на основе Chromium
- Рабочий экземпляр NocoDB с заранее созданной таблицей для закладок
- Ваш **API-ключ** от NocoDB

---

## ⚙️ Настройка (в NocoDB)
1. Создайте таблицу в вашем проекте NocoDB для хранения закладок.
2. Add the following fields:
   - `Название` — Text  
   - `Ссылка` — URL/Text  
   - `Теги` — Text  
   - `Комментарий` — Long text  
3. Сгенерируйте ваш **API-ключ** в NocoDB.
4. Скопируйте **ID таблицы**  (например `/api/v1/tables/<tableId>/records`).

---

## 🧠 Установка (через режим разработчика)

> Так как расширение пока не опубликовано в Chrome Web Store, его можно установить вручную через Developer Mode.

1. Скачайте или клонируйте репозиторий:
   ```bash
   git clone https://github.com/brutalismweb/NocoDB_web-clipper.git 
   ```
2. Откройте Google Chrome и перейдите по адресу: chrome://extensions/
3. Включите Режим разработчика (переключатель в правом верхнем углу).
4. Нажмите Загрузить распакованное расширение (Load unpacked).
5. Выберите папку, в которой находятся файлы расширения (где лежит manifest.json).
6. Расширение появится на панели инструментов и готово к использованию 🎉

