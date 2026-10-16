// TEMPLATE NAVBAR: ubah label dan tujuan menu pada daftar ini.
(() => {
    const root = new URL('../../', document.currentScript.src);
    const home = new URL('index.html', root).href;
    const links = [
        ['Beranda', home],
        ['Biography', new URL('about.html', root).href],
        ['Experience', home + '#experience'],
        ['Dashboard', home + '#projects'],
        ['Ruang Karya', new URL('ruang-karya.html', root).href],
        ['Kontak', home + '#contact'],
    ];
    const header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML = `
        <a class="site-skip" href="#main-content">Lewati ke konten</a>
        <nav class="site-nav" aria-label="Navigasi utama">
            <a class="site-nav__brand" href="${home}" aria-label="Ayyubi Tanfidz — Beranda">Ayyubi<span>.</span></a>
            <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-nav-links">Menu <span aria-hidden="true">☰</span></button>
            <ul class="site-nav__links" id="site-nav-links">${links.map(([label, url]) => `<li><a href="${url}">${label}</a></li>`).join('')}</ul>
        </nav>`;
    document.body.prepend(header);
    const main = document.querySelector('main');
    if (main) { main.id ||= 'main-content'; main.tabIndex = -1; header.querySelector('.site-skip').href = '#' + main.id; }
    const toggle = header.querySelector('button');
    function closeMenu() {
        header.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
    }
    toggle.addEventListener('click', () => {
        const open = header.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(open));
    });
    header.querySelectorAll('.site-nav__links a').forEach(link => link.addEventListener('click', closeMenu));
    header.addEventListener('keydown', event => {
        if (event.key === 'Escape' && header.classList.contains('is-open')) { closeMenu(); toggle.focus(); }
    });
})();


