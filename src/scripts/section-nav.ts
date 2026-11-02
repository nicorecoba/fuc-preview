// Barra de secciones: resalta la sección visible al hacer scroll y maneja el menú "Más" (tablet y celular).
// El desplazamiento al hacer clic lo resuelve CSS (anclas + scroll-margin-top).

function initScrollSpy(): void {
  const links = document.querySelectorAll<HTMLAnchorElement>('[data-section-link]');
  if (links.length === 0) return;

  const ids = Array.from(links, (link) => link.dataset.sectionLink ?? '');
  const moreButton = document.querySelector<HTMLElement>('[data-section-more]');

  const update = (): void => {
    let active = ids[0];
    for (const id of ids) {
      const section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top < 140) active = id;
    }
    links.forEach((link) => {
      const on = link.dataset.sectionLink === active;
      link.classList.toggle('is-active', on);
      if (on) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
    // En pantallas chicas "Conocé el canotaje" vive dentro del menú: se resalta el botón.
    moreButton?.classList.toggle('is-active', active === 'federacion');
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
}

function initMoreMenu(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-section-more]');
  const menu = document.querySelector<HTMLElement>('[data-section-menu]');
  if (!button || !menu) return;

  const toggle = (abrir: boolean): void => {
    menu.hidden = !abrir;
    button.setAttribute('aria-expanded', String(abrir));
  };

  button.addEventListener('click', () => toggle(menu.hidden !== false));
  menu.addEventListener('click', () => toggle(false));
}

export function initSectionNav(): void {
  initScrollSpy();
  initMoreMenu();
}
