function localizeHtmlPage() {
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const message = chrome.i18n.getMessage(key);
    if (message) {
      // Сохраняем HTML-ссылки, если есть
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

document.addEventListener('DOMContentLoaded', async () => {
  localizeHtmlPage();

  const urlInput = document.getElementById('nocodbUrl');
  const tokenInput = document.getElementById('apiToken');
  const saveServerBtn = document.getElementById('save-server');
  const statusEl = document.getElementById('connection-status');
  const tablesContainer = document.getElementById('tables-container');
  const emptyHint = document.getElementById('empty-hint');
  const saveBtn = document.getElementById('save');
  const notifEl = document.getElementById('notification');

  const settings = await chrome.storage.local.get(['nocodbUrl', 'apiToken', 'tableConfig']);
  urlInput.value = settings.nocodbUrl || '';
  tokenInput.value = settings.apiToken || '';
  const tableConfig = settings.tableConfig || {};
  renderTables(tableConfig);

  saveServerBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    const token = tokenInput.value.trim();

    if (!url || !token) {
      showStatus(chrome.i18n.getMessage('fillUrlAndToken'), 'error');
      return;
    }

    try {
      new URL(url);
    } catch {
      showStatus(chrome.i18n.getMessage('invalidUrl'), 'error');
      return;
    }

    await chrome.storage.local.set({ nocodbUrl: url, apiToken: token });
    showStatus(chrome.i18n.getMessage('connectionSaved'), 'success');
  });

  document.getElementById('add-table').addEventListener('click', () => {
    addTableUI();
    updateEmptyHint();
  });

  saveBtn.addEventListener('click', async () => {
    const { nocodbUrl, apiToken } = await chrome.storage.local.get(['nocodbUrl', 'apiToken']);
    if (!nocodbUrl || !apiToken) {
      showNotification(chrome.i18n.getMessage('checkConnectionFirst'), 'error');
      return;
    }

    const tableConfigs = {};
    document.querySelectorAll('.table-group').forEach((el, idx) => {
      const id = el.querySelector('.table-id').value.trim();
      if (!id) return;

      tableConfigs[id] = {
        name: el.querySelector('.table-name').value.trim() || `Table ${idx + 1}`,
        fields: {
          title: el.querySelector('.field-title').value.trim() || 'Name',
          url: el.querySelector('.field-url').value.trim() || 'Link',
          comment: el.querySelector('.field-comment').value.trim() || 'Comment',
          tags: el.querySelector('.field-tags').value.trim() || 'Tags'
        }
      };
    });

    if (Object.keys(tableConfigs).length === 0) {
      showNotification(chrome.i18n.getMessage('addAtLeastOneTable'), 'error');
      return;
    }

    await chrome.storage.local.set({ tableConfig: tableConfigs });
    showNotification(chrome.i18n.getMessage('settingsSaved'), 'success');
    setTimeout(() => window.close(), 1500);
  });

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.style.color = 
      type === 'success' ? '#10b981' :
      type === 'error'   ? '#ef4444' :
      type === 'info'    ? '#3b82f6' : '#64748b';
  }

  function showNotification(text, type) {
    notifEl.textContent = text;
    notifEl.className = `notification ${type}`;
    setTimeout(() => {
      notifEl.style.opacity = '0';
      notifEl.style.transform = 'translateY(10px)';
    }, 2500);
  }

  function addTableUI(tableId = '', config = {}) {
    const div = document.createElement('div');
    div.className = 'table-group';

    const name = config.name || '';
    const f = config.fields || {};

    div.innerHTML = `
      <button type="button" class="remove-table" title="${chrome.i18n.getMessage('deleteTableBtn')}">✖</button>
      <div class="field">
        <input type="text" class="table-id" placeholder="${chrome.i18n.getMessage('tableIdPlaceholder')}" value="${tableId}">
      </div>
      <div class="field">
        <input type="text" class="table-name" placeholder="${chrome.i18n.getMessage('tableNamePlaceholder')}" value="${name}">
      </div>
      <div class="table-fields">
        <div class="field">
          <input type="text" class="field-title" placeholder="${chrome.i18n.getMessage('fieldTitlePlaceholder')}" value="${f.title || ''}">
        </div>
        <div class="field">
          <input type="text" class="field-url" placeholder="${chrome.i18n.getMessage('fieldUrlPlaceholder')}" value="${f.url || ''}">
        </div>
        <div class="field">
          <input type="text" class="field-comment" placeholder="${chrome.i18n.getMessage('fieldCommentPlaceholder')}" value="${f.comment || ''}">
        </div>
        <div class="field">
          <input type="text" class="field-tags" placeholder="${chrome.i18n.getMessage('fieldTagsPlaceholder')}" value="${f.tags || ''}">
        </div>
      </div>
    `;

    div.querySelector('.remove-table').addEventListener('click', () => {
      div.remove();
      updateEmptyHint();
    });

    tablesContainer.appendChild(div);
    updateEmptyHint();
  }

  function renderTables(tableConfig) {
    tablesContainer.innerHTML = '';
    if (Object.keys(tableConfig).length === 0) {
      updateEmptyHint();
      return;
    }
    for (const [id, config] of Object.entries(tableConfig)) {
      addTableUI(id, config);
    }
  }

  function updateEmptyHint() {
    emptyHint.style.display = tablesContainer.children.length ? 'none' : 'block';
  }
});