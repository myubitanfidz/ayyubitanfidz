// Ganti username di sini untuk memilih akun GitHub.
const githubUsername = 'myubitanfidz';
const statsSection = document.querySelector('.github-stats');
const statsStatus = document.querySelector('#github-status');
const calendar = document.querySelector('#github-calendar');

function renderContributions(days) {
    const ordered = [...days].sort((a, b) => a.date.localeCompare(b.date));
    if (!ordered.length) throw new Error('Data kontribusi kosong');
    const offset = new Date(ordered[0].date + 'T00:00:00Z').getUTCDay();
    const weeks = Math.ceil((offset + ordered.length) / 7);
    const months = document.createElement('div');
    months.className = 'contribution-months';
    months.style.setProperty('--weeks', weeks);
    const grid = document.createElement('div');
    grid.className = 'contribution-grid';
    grid.style.setProperty('--weeks', weeks);
    for (let i = 0; i < offset; i++) {
        const blank = document.createElement('span');
        blank.className = 'contribution-cell contribution-cell--blank';
        grid.append(blank);
    }
    let previousMonth = -1;
    let previousLabelColumn = -4;
    ordered.forEach((day, index) => {
        const date = new Date(day.date + 'T00:00:00Z');
        const month = date.getUTCMonth();
        const column = Math.floor((offset + index) / 7);
        if (month !== previousMonth) {
            if (column - previousLabelColumn >= 3) {
                const label = document.createElement('span');
                label.textContent = date.toLocaleDateString('en', { month: 'short', timeZone: 'UTC' });
                label.style.gridColumn = column + 1;
                months.append(label);
                previousLabelColumn = column;
            }
            previousMonth = month;
        }
        const cell = document.createElement('span');
        cell.className = 'contribution-cell';
        cell.dataset.level = Math.max(0, Math.min(4, Number(day.level) || 0));
        cell.title = `${day.count} kontribusi · ${day.date}`;
        grid.append(cell);
    });
    calendar.replaceChildren(months, grid);
    const total = ordered.reduce((sum, day) => sum + day.count, 0);
    document.querySelector('#github-total').textContent = `${new Intl.NumberFormat('id-ID').format(total)} kontribusi dalam setahun terakhir`;
    calendar.setAttribute('aria-label', `Kalender kontribusi GitHub ${githubUsername}: ${total} kontribusi dalam setahun terakhir. Arahkan kursor ke kotak untuk melihat tanggal dan jumlah kontribusi.`);
}

async function loadGithubStats() {
    try {
        // Layanan publik pihak ketiga, tanpa token rahasia di frontend.
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(githubUsername)}?y=last`, { signal: AbortSignal.timeout(15000) });
        if (!response.ok) throw new Error('Statistik tidak tersedia');
        const data = await response.json();
        if (!Array.isArray(data.contributions)) throw new Error('Format data tidak sesuai');
        renderContributions(data.contributions);
        statsStatus.textContent = 'Kontribusi GitHub selama setahun terakhir.';
    } catch {
        statsStatus.textContent = 'Kalender belum dapat dimuat. Silakan lihat kontribusi melalui tautan profil GitHub di atas.';
        document.querySelector('#github-total').textContent = 'Data kontribusi tidak tersedia';
    }
}

// Memuat sekali saat mendekati layar, agar bagian atas halaman tetap ringan.
const statsObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
        statsObserver.disconnect();
        loadGithubStats();
    }
}, { rootMargin: '200px' });
statsObserver.observe(statsSection);
