import type { LampaLike } from '../types';

export function element<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  className?: string,
  text?: string
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

export function selector(className: string, title: string, subtitle?: string): HTMLDivElement {
  const node = element('div', `${className} selector`);
  node.tabIndex = 0;
  const titleNode = element('div', `${className}__title`, title);
  node.append(titleNode);
  if (subtitle) node.append(element('div', `${className}__subtitle`, subtitle));
  return node;
}

export function onEnter(node: HTMLElement, callback: () => void | Promise<void>): void {
  const invoke = (): void => {
    void callback();
  };
  node.addEventListener('hover:enter', invoke);
  node.addEventListener('click', invoke);
  node.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      invoke();
    }
  });
}

export function onLong(node: HTMLElement, callback: () => void): void {
  node.addEventListener('hover:long', callback);
  node.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    callback();
  });
}

export function bindFocus(node: HTMLElement, onFocused: (node: HTMLElement) => void): void {
  const focused = (): void => {
    onFocused(node);
    try {
      node.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
    } catch {
      node.scrollIntoView();
    }
  };
  node.addEventListener('hover:focus', focused);
  node.addEventListener('focus', focused);
}

function navigator(): any {
  const candidate = (globalThis as any).Navigator;
  return candidate && typeof candidate.canmove === 'function' ? candidate : undefined;
}

export function activateContentController(
  Lampa: LampaLike,
  root: HTMLElement,
  getLast: () => HTMLElement | undefined,
  onBack: () => void
): void {
  if (!Lampa?.Controller?.add) return;
  const move = (direction: 'up' | 'down' | 'left' | 'right'): boolean => {
    const navigation = navigator();
    if (navigation?.canmove?.(direction)) {
      navigation.move(direction);
      return true;
    }
    return false;
  };
  Lampa.Controller.add('content', {
    toggle: () => {
      Lampa.Controller.collectionSet?.(root);
      Lampa.Controller.collectionFocus?.(getLast() || false, root);
    },
    up: () => {
      if (!move('up')) Lampa.Controller.toggle?.('head');
    },
    down: () => {
      move('down');
    },
    left: () => {
      if (!move('left')) Lampa.Controller.toggle?.('menu');
    },
    right: () => {
      move('right');
    },
    back: onBack
  });
  Lampa.Controller.toggle('content');
}

export function statusLabel(status: string | undefined): string {
  const labels: Record<string, string> = {
    unknown: 'Не проверен',
    online: 'Онлайн',
    slow: 'Медленный',
    offline: 'Недоступен',
    auth_required: 'Нужна авторизация',
    geo_restricted: 'Геоограничение',
    cors_unknown: 'CORS: неизвестно',
    drm_required: 'Требуется DRM',
    unsupported: 'Не поддерживается',
    not_configured: 'Источник не подключён',
    temporarily_unavailable: 'Временно недоступен'
  };
  return labels[status ?? ''] ?? 'Источник не подключён';
}
