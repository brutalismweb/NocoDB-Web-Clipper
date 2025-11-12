function localizeHtmlPage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const message = chrome.i18n.getMessage(key);
    if (message) {
      if (key === 'noSettings') {
        el.innerHTML = message;
      } else {
        el.textContent = message;
      }
    }
  });

  const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
  placeholders.forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const message = chrome.i18n.getMessage(key);
    if (message) {
      el.placeholder = message;
    }
  });
}

document.addEventListener('DOMContentLoaded', async function () {
  localizeHtmlPage();

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  document.getElementById('title').value = tab.title;

  try {
    await loadTableSettings();
    await loadExistingTags();

    document.getElementById('table-select').addEventListener('change', async function () {
      await loadExistingTags();
    });

    setupTagsInput();

    document.getElementById('bookmark-form').addEventListener('submit', async function (event) {
      event.preventDefault();

      const title = document.getElementById('title').value;
      const comment = document.getElementById('comment').value;
      const tags = document.getElementById('tags').value;
      const url = tab.url;
      const selectedTableId = document.getElementById('table-select').value;

      const bookmarkData = {
        "Name": title,
        "Link": url,
        "Comment": comment,
        "Tags": tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      const result = await saveBookmarkToNocoDB(bookmarkData, selectedTableId);

      const statusEl = document.getElementById('status-message');
      if (result.success) {
        statusEl.textContent = chrome.i18n.getMessage('bookmarkSaved');
        statusEl.style.color = 'green';

        setTimeout(async () => {
          await loadExistingTags();
          setTimeout(() => window.close(), 500);
        }, 1000);
      } else {
        statusEl.textContent = chrome.i18n.getMessage('errorPrefix') + result.error;
        statusEl.style.color = 'red';
      }
    });
  } catch (error) {
    const statusEl = document.getElementById('status-message');
    statusEl.innerHTML = chrome.i18n.getMessage('noSettings');
    statusEl.style.color = '#d32f2f';
    statusEl.style.textAlign = 'center';
    const link = statusEl.querySelector('a');
    if (link) {
      link.style.color = '#0866FF';
      link.style.textDecoration = 'none';
    }
    document.getElementById('bookmark-form').style.opacity = '0.5';
    document.getElementById('bookmark-form').querySelector('button').disabled = true;
  }
});

// ... остальной код popup.js без изменений (getNocoDBSettings, loadTableSettings и т.д.) ...

// Только в updateTagsUI замените текст:
function updateTagsUI() {
  const datalist = document.getElementById('existing-tags');
  const tagsCloud = document.getElementById('tags-cloud');

  datalist.innerHTML = '';
  tagsCloud.innerHTML = '';

  allTags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    datalist.appendChild(option);
  });

  if (allTags.length === 0) {
    tagsCloud.innerHTML = `<div style="color: #666; font-style: italic;">${chrome.i18n.getMessage('noTagsYet')}</div>`;
    return;
  }

  allTags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.textContent = tag;
    tagElement.className = 'tag-item';
    tagElement.addEventListener('click', () => addTagToInput(tag));
    tagsCloud.appendChild(tagElement);
  });
}

// Остальные функции (addTagToInput, setupTagsInput, saveBookmarkToNocoDB) оставьте как есть.