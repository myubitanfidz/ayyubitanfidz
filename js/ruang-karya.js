// data-filter pada tombol harus sama dengan data-category pada section.
const workFilters = document.querySelectorAll('[data-filter]');
const workSections = document.querySelectorAll('[data-category]');
workFilters.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.filter;
        workFilters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
        workSections.forEach(section => {
            section.hidden = category !== 'all' && section.dataset.category !== category;
        });
        document.querySelector('#works-status').textContent = category === 'all'
            ? 'Menampilkan semua karya.' : `Menampilkan kategori ${button.textContent}.`;
    });
});
