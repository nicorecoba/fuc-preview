// Selector de vista (Moderna | Formal). La vista vive en <html data-vista="...">;
// el CSS de cada vista cuelga de ese atributo, así que cambiarlo cambia todo el diseño.

const VIEW_KEY = 'fuc-vista';

type Vista = 'moderna' | 'formal';

function esVista(valor: string | undefined): valor is Vista {
  return valor === 'moderna' || valor === 'formal';
}

export function initViewSwitch(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-view]');
  if (buttons.length === 0) return;

  const root = document.documentElement;

  const sync = (): void => {
    const actual = root.dataset.vista ?? 'moderna';
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.view === actual));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const vista = button.dataset.view;
      if (!esVista(vista)) return;

      root.dataset.vista = vista;

      try {
        localStorage.setItem(VIEW_KEY, vista);
      } catch {
        // Sin almacenamiento disponible: la vista solo dura mientras la página está abierta.
      }

      // Deja la vista en la URL (?vista=formal) para poder compartir el enlace.
      const url = new URL(window.location.href);
      url.searchParams.set('vista', vista);
      window.history.replaceState(null, '', url);

      sync();
    });
  });

  sync();
}
