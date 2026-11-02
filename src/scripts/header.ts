// Interacciones de UI del header. No hay lógica de negocio.

const THEME_KEY = 'fuc-tema';

function initThemeToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  if (buttons.length === 0) return;

  const root = document.documentElement;

  const sync = (): void => {
    const noche = root.dataset.theme === 'noche';
    buttons.forEach((button) => {
      button.setAttribute('aria-label', noche ? 'Cambiar a modo claro' : 'Cambiar a modo noche');
      button.title = noche ? 'Modo claro' : 'Modo noche';
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const noche = root.dataset.theme !== 'noche';
      if (noche) {
        root.dataset.theme = 'noche';
      } else {
        delete root.dataset.theme;
      }
      try {
        localStorage.setItem(THEME_KEY, noche ? 'noche' : 'claro');
      } catch {
        // Sin almacenamiento disponible: el tema solo dura mientras la página está abierta.
      }
      sync();
    });
  });

  sync();
}

function initSearchToggle(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-search-toggle]');
  const nav = document.querySelector<HTMLElement>('.nav');
  const search = document.querySelector<HTMLElement>('.search');
  const input = document.querySelector<HTMLInputElement>('.search__input');
  if (!button || !nav || !search || !input) return;

  button.addEventListener('click', () => {
    const abrir = search.hidden !== false;
    search.hidden = !abrir;
    nav.hidden = abrir;
    button.classList.toggle('is-active', abrir);
    button.setAttribute('aria-expanded', String(abrir));
    button.setAttribute('aria-label', abrir ? 'Cerrar búsqueda' : 'Buscar');
    button.title = abrir ? 'Cerrar búsqueda' : 'Buscar';
    if (abrir) input.focus();
  });
}

function initMobileMenu(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('#mobile-menu');
  if (!button || !menu) return;

  button.addEventListener('click', () => {
    const abrir = menu.hidden !== false;
    menu.hidden = !abrir;
    button.classList.toggle('is-active', abrir);
    button.setAttribute('aria-expanded', String(abrir));
    button.setAttribute('aria-label', abrir ? 'Cerrar menú' : 'Abrir menú');
    button.title = abrir ? 'Cerrar menú' : 'Abrir menú';
  });
}

export function initHeader(): void {
  initThemeToggle();
  initSearchToggle();
  initMobileMenu();
}
