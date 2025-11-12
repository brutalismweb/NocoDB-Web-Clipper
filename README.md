# 🧩 NocoDB Web Clipper

**NocoDB Web Clipper** is a simple Chrome extension that lets you save web pages directly into your NocoDB database — including the page title, link, tags, and your personal comment.

---

## ✨ Features
- Save **Title**, **Link**, **Tags**, and **Comment** directly into your NocoDB table  
- Works with self-hosted and cloud NocoDB instances  
- Simple setup: specify your server URL, API key, and table endpoint  
- Easy installation via Developer Mode for testing and development  

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
