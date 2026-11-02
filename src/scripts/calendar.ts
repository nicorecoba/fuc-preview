// Filtro por disciplina del calendario: muestra u oculta filas.

export function initCalendar(): void {
  const tabs = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const rows = document.querySelectorAll<HTMLElement>('.calendar-row');
  if (tabs.length === 0 || rows.length === 0) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter ?? 'todas';
      tabs.forEach((other) => other.setAttribute('aria-selected', String(other === tab)));

      let visibles = 0;
      rows.forEach((row) => {
        const mostrar = filter === 'todas' || row.dataset.disciplina === filter;
        row.hidden = !mostrar;
        row.classList.toggle('is-first', mostrar && visibles === 0);
        if (mostrar) visibles += 1;
      });
    });
  });
}
