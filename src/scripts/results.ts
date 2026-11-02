// Selector de pruebas: muestra la tabla de la prueba elegida.

export function initResults(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('[data-event-tab]');
  const panels = document.querySelectorAll<HTMLElement>('[data-event-panel]');
  if (tabs.length === 0 || panels.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const id = tab.dataset.eventTab;
      tabs.forEach((other) => other.setAttribute('aria-selected', String(other === tab)));
      panels.forEach((panel) => {
        panel.hidden = panel.dataset.eventPanel !== id;
      });
    });
  });
}
