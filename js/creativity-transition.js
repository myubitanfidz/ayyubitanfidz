// Dimuat di head untuk menyiapkan transisi sebelum halaman pertama kali tampil.
(() => {
    const key = 'ayyubi-creativity-transition';
    const root = document.documentElement;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let incoming = false;
    let navigating = false;
    try {
        const saved = JSON.parse(sessionStorage.getItem(key) || 'null');
        sessionStorage.removeItem(key);
        incoming = saved && saved.path === location.pathname && Date.now() - saved.time < 20000 && !reduced.matches;
    } catch { /* Navigasi tetap berfungsi jika penyimpanan tidak tersedia. */ }
    if (incoming) root.classList.add('creativity-entering');

    document.addEventListener('DOMContentLoaded', () => {
        if (incoming) {
            requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('creativity-arrived')));
            setTimeout(() => root.classList.remove('creativity-entering', 'creativity-arrived'), 1400);
        }
        document.querySelectorAll('[data-creativity-transition]').forEach(link => {
            link.addEventListener('click', async event => {
                if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || reduced.matches) return;
                event.preventDefault();
                if (navigating) return;
                navigating = true;
                const destination = new URL(link.href);
                const rect = link.getBoundingClientRect();
                const x = rect.left + rect.width / 2;
                const y = rect.top + rect.height / 2;
                const radius = Math.ceil(Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y)));
                const surface = document.createElement('div');
                surface.className = 'creativity-surface';
                surface.setAttribute('aria-hidden', 'true');
                document.body.append(surface);
                root.style.setProperty('--sink-origin', `${x}px ${y + scrollY}px`);
                root.classList.add('creativity-leaving');
                try {
                    // EDIT DURASI: 1100 ms untuk warna menjalar dari tombol.
                    await surface.animate([
                        { clipPath: `circle(${rect.height / 2}px at ${x}px ${y}px)` },
                        { clipPath: `circle(${radius}px at ${x}px ${y}px)` },
                    ], { duration: 1100, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' }).finished;
                } catch { /* Jika animasi tidak didukung, lanjutkan navigasi. */ }
                try { sessionStorage.setItem(key, JSON.stringify({ path: destination.pathname, time: Date.now() })); } catch {}
                location.assign(destination.href);
            });
        });
    });
    // Pulihkan halaman ketika pengguna menekan tombol Back browser.
    window.addEventListener('pageshow', event => {
        if (!event.persisted) return;
        navigating = false;
        root.classList.remove('creativity-leaving', 'creativity-entering', 'creativity-arrived');
        document.querySelectorAll('.creativity-surface').forEach(surface => surface.remove());
    });
})();
