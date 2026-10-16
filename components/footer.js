// TEMPLATE FOOTER: edit nama, email, dan tautan di sini.
(() => {
    const root = new URL('../', document.currentScript.src);
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="site-footer__inner">
            <div><a class="site-nav__brand" href="${new URL('index.html', root).href}">Ayyubi<span>.</span></a><p>Ruang untuk karya, cerita, dan pemikiran.</p></div>
            <div class="site-footer__links" aria-label="Tautan footer">
                <a href="mailto:mayyubi496@gmail.com">Email ↗</a>
                <a href="https://github.com/myubitanfidz" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href="#main-content">Kembali ke atas ↑</a>
            </div>
        </div>
        <div class="site-footer__bottom">© ${new Date().getFullYear()} Muhammad Ayyubi Tanfidz Ulya.</div>`;
    document.body.append(footer);
})();
