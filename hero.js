// Setiap foto mengikuti lintasan elips, bukan menggeser seluruh baris datar.
const wall = document.querySelector('.hero__photo-wall');
const rows = [...wall.querySelectorAll('.photo-row')];
const sources = [...new Set([...wall.querySelectorAll('img')].map(img => img.src))];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

const cards = rows.map((row, rowIndex) => {
    const track = row.querySelector('.photo-track');
    row.replaceChildren(track);
    // Satu rangkaian berisi foto berbeda; pergantian terjadi di luar layar.
    const images = sources.map((_, index) => {
        const img = document.createElement('img');
        img.src = sources[(index + rowIndex * 3) % sources.length];
        img.alt = '';
        img.draggable = false;
        return img;
    });
    track.replaceChildren(...images);
    return images;
});

let width = wall.clientWidth;
let height = wall.clientHeight;
new ResizeObserver(() => {
    width = wall.clientWidth;
    height = wall.clientHeight;
}).observe(wall);

let elapsed = 0;
let previousTime;
function animate(time) {
    const delta = previousTime === undefined ? 0 : Math.min(time - previousTime, 50);
    previousTime = time;
    if (!motionPreference.matches) elapsed += delta / 1000;

    const radius = width * 0.78;
    const depth = Math.min(width * 0.32, 480);
    const arc = Math.PI * 1.14;
    const rowSpacing = height * 0.94 / rows.length;

    cards.forEach((images, rowIndex) => {
        const direction = rowIndex % 2 === 0 ? 1 : -1;
        const phase = elapsed * direction * 0.045 + rowIndex * 0.19;
        const y = (rowIndex - (rows.length - 1) / 2) * rowSpacing;

        images.forEach((img, index) => {
            const position = index / images.length * arc + phase;
            const angle = ((position % arc) + arc) % arc - arc / 2;
            const x = radius * Math.sin(angle);
            const z = -240 + depth * (1 - Math.cos(angle));
            // Foto mengikuti arah permukaan elips di posisinya saat ini.
            const rotation = -Math.atan2(depth * Math.sin(angle), radius * Math.cos(angle));
            img.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotation}rad)`;
        });
    });
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
