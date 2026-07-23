(function () {
  'use strict';

  var components = Object.create(null);
  var activities = [];
  var settings = [];
  var storagePrefix = 'lampa-iptv-demo:';
  var content = document.getElementById('content');

  function valueFromStorage(key, fallback) {
    try {
      var raw = localStorage.getItem(storagePrefix + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function setStorage(key, value) {
    localStorage.setItem(storagePrefix + key, JSON.stringify(value));
  }

  function toast(message) {
    document.querySelector('.demo-toast')?.remove();
    var node = document.createElement('div');
    node.className = 'demo-toast';
    node.textContent = String(message);
    document.body.append(node);
    setTimeout(function () {
      node.remove();
    }, 3500);
  }

  function closeOverlay() {
    document.querySelector('.demo-player, .demo-modal')?.remove();
  }

  function renderActivity(params) {
    var Component = components[params.component];
    if (!Component) {
      toast('Компонент не зарегистрирован: ' + params.component);
      return;
    }
    var instance = new Component(params);
    instance.activity = {
      loader: function () {},
      params: params
    };
    activities.push({ component: params.component, instance: instance, params: params });
    content.replaceChildren(instance.create());
    instance.start();
    setTimeout(function () {
      content.querySelector('.selector')?.focus();
    }, 0);
  }

  function backward() {
    var current = activities.pop();
    current?.instance?.destroy?.();
    var previous = activities.pop();
    if (previous) renderActivity(previous.params);
    else {
      content.innerHTML =
        '<section class="demo-welcome"><h1>Браузерное демо</h1><p>Нажмите «ТВ» слева. Реальные потоки в стенд не включены.</p></section>';
      document.querySelector('.menu__item')?.focus();
    }
  }

  function modal(options) {
    closeOverlay();
    var node = document.createElement('div');
    node.className = 'demo-modal';
    var title = document.createElement('h2');
    title.textContent = options.title || 'Lampa IPTV';
    var body = document.createElement('div');
    if (options.html instanceof Node) body.append(options.html);
    else body.textContent = String(options.html || '');
    var close = document.createElement('button');
    close.textContent = 'Закрыть';
    close.addEventListener('click', closeOverlay);
    node.append(title, body, close);
    document.body.append(node);
    close.focus();
  }

  window.appready = true;
  window.Lampa = {
    Component: {
      add: function (name, Component) {
        if (Component) components[name] = Component;
        else delete components[name];
      }
    },
    Activity: {
      push: renderActivity,
      backward: backward,
      active: function () {
        return activities[activities.length - 1] || {};
      }
    },
    Controller: {
      add: function () {},
      toggle: function () {},
      collectionSet: function () {},
      collectionFocus: function (last, root) {
        (last || root.querySelector('.selector'))?.focus?.();
      }
    },
    Storage: {
      get: valueFromStorage,
      set: setStorage,
      field: function () {
        return '';
      }
    },
    SettingsApi: {
      addComponent: function (component) {
        settings.push(component);
      },
      addParam: function () {},
      removeComponent: function (id) {
        settings = settings.filter(function (item) {
          return item.component !== id;
        });
      }
    },
    Input: {
      edit: function (options, success, cancel) {
        var result = window.prompt(options.title || 'Введите значение', options.value || '');
        if (result === null) cancel?.();
        else success(result);
      }
    },
    Select: {
      show: function (options) {
        var values = options.items || [];
        var answer = window.prompt(
          (options.title || 'Выберите') +
            '\n' +
            values
              .map(function (item, index) {
                return index + 1 + '. ' + item.title;
              })
              .join('\n'),
          '1'
        );
        var selected = values[Number(answer) - 1];
        if (selected) options.onSelect?.(selected);
        else options.onBack?.();
      }
    },
    Modal: {
      open: modal,
      close: closeOverlay
    },
    Player: {
      play: function (data) {
        closeOverlay();
        var node = document.createElement('div');
        node.className = 'demo-player';
        var title = document.createElement('h2');
        title.textContent = data.title || 'Канал';
        var text = document.createElement('p');
        text.textContent =
          'Mock-плеер получил URL. Сетевой поток намеренно не запускается в публичном демо.';
        var close = document.createElement('button');
        close.textContent = 'Закрыть';
        close.addEventListener('click', closeOverlay);
        node.append(title, text, close);
        document.body.append(node);
        close.focus();
      },
      playlist: function () {},
      runas: function () {}
    },
    Noty: { show: toast },
    Background: { immediately: function () {} },
    Lang: { add: function () {} },
    Manifest: {},
    Listener: {
      follow: function () {},
      remove: function () {}
    }
  };

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      if (document.querySelector('.demo-player, .demo-modal')) closeOverlay();
      else backward();
      return;
    }
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    var selectors = Array.from(document.querySelectorAll('.selector')).filter(function (node) {
      return node.offsetParent !== null;
    });
    if (!selectors.length) return;
    var index = Math.max(0, selectors.indexOf(document.activeElement));
    var direction = event.key === 'ArrowUp' || event.key === 'ArrowLeft' ? -1 : 1;
    var next = selectors[(index + direction + selectors.length) % selectors.length];
    event.preventDefault();
    next.focus();
  });
})();
