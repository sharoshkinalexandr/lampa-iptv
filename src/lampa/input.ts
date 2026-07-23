import type { LampaLike } from '../types';

export function notify(Lampa: LampaLike, message: string): void {
  if (Lampa?.Noty?.show) Lampa.Noty.show(message);
  else globalThis.alert?.(message);
}

export function askText(
  Lampa: LampaLike,
  title: string,
  value = '',
  options: { password?: boolean; numeric?: boolean } = {}
): Promise<string> {
  return new Promise((resolve) => {
    if (Lampa?.Input?.edit) {
      Lampa.Input.edit(
        {
          title,
          free: true,
          nosave: true,
          value,
          password: options.password === true,
          layout: options.numeric ? 'nums' : undefined,
          keyboard: 'lampa'
        },
        (answer: string) => resolve((answer ?? '').trim())
      );
      return;
    }
    resolve((globalThis.prompt?.(title, value) ?? '').trim());
  });
}

export function choose<T extends { title: string }>(
  Lampa: LampaLike,
  title: string,
  items: T[],
  onBack?: () => void
): Promise<T | undefined> {
  return new Promise((resolve) => {
    if (Lampa?.Select?.show) {
      Lampa.Select.show({
        title,
        items,
        onSelect: (item: T) => resolve(item),
        onBack: () => {
          onBack?.();
          resolve(undefined);
        }
      });
      return;
    }
    const answer = globalThis.prompt?.(
      `${title}\n${items.map((item, index) => `${index + 1}. ${item.title}`).join('\n')}`,
      '1'
    );
    const selected = Number(answer) - 1;
    resolve(items[selected]);
  });
}

export function confirmAction(Lampa: LampaLike, title: string, text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (Lampa?.Modal?.open) {
      const body = document.createElement('div');
      body.className = 'lampa-iptv-confirm';
      body.textContent = text;
      Lampa.Modal.open({
        title,
        align: 'center',
        html: body,
        buttons: [
          {
            name: 'Отмена',
            onSelect: () => {
              Lampa.Modal.close();
              resolve(false);
            }
          },
          {
            name: 'Подтвердить',
            onSelect: () => {
              Lampa.Modal.close();
              resolve(true);
            }
          }
        ],
        onBack: () => resolve(false)
      });
      return;
    }
    resolve(globalThis.confirm?.(`${title}\n\n${text}`) ?? false);
  });
}

export function askMultiline(
  Lampa: LampaLike,
  title: string,
  initial = ''
): Promise<string | undefined> {
  return new Promise((resolve) => {
    if (!Lampa?.Modal?.open) {
      resolve(globalThis.prompt?.(title, initial) ?? undefined);
      return;
    }
    const body = document.createElement('div');
    body.className = 'lampa-iptv-textarea-wrap';
    const hint = document.createElement('div');
    hint.className = 'lampa-iptv-textarea-hint';
    hint.textContent =
      'Вставьте текст. На устройствах без ввода многострочного текста используйте импорт файла.';
    const textarea = document.createElement('textarea');
    textarea.className = 'lampa-iptv-textarea';
    textarea.value = initial;
    textarea.setAttribute('aria-label', title);
    body.append(hint, textarea);
    Lampa.Modal.open({
      title,
      html: body,
      size: 'large',
      buttons: [
        {
          name: 'Отмена',
          onSelect: () => {
            Lampa.Modal.close();
            resolve(undefined);
          }
        },
        {
          name: 'Импортировать',
          onSelect: () => {
            const value = textarea.value;
            Lampa.Modal.close();
            resolve(value);
          }
        }
      ],
      onBack: () => resolve(undefined)
    });
    globalThis.setTimeout(() => textarea.focus(), 50);
  });
}

export function readLocalFile(
  accept: string
): Promise<{ name: string; content: string } | undefined> {
  return new Promise((resolve, reject) => {
    if (typeof FileReader === 'undefined') {
      reject(new Error('File API не поддерживается на этом устройстве.'));
      return;
    }
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.style.display = 'none';
    input.addEventListener(
      'change',
      () => {
        const file = input.files?.[0];
        if (!file) {
          input.remove();
          resolve(undefined);
          return;
        }
        const reader = new FileReader();
        reader.onload = () => {
          input.remove();
          resolve({ name: file.name, content: String(reader.result ?? '') });
        };
        reader.onerror = () => {
          input.remove();
          reject(reader.error ?? new Error('Не удалось прочитать файл.'));
        };
        reader.readAsText(file);
      },
      { once: true }
    );
    document.body.append(input);
    input.click();
  });
}

export function downloadText(filename: string, content: string, mime = 'application/json'): void {
  const blob = new Blob([content], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  globalThis.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
