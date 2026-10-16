// Setiap foto mengikuti lintasan elips, bukan menggeser seluruh baris datar.
const wall = document.querySelector('.hero__photo-wall');
const rows = [...wall.querySelectorAll('.photo-row')];
const sources = [...new Set([...wall.querySelectorAll('img')].map(img => img.src))];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

const arc = Math.PI * 1.14;
let width;
let cardWidth;
let cards = [];

function layout() {
    width = wall.clientWidth;
    // Jarak antarfoto sekitar 8px pada bagian tengah lengkungan.
    const fontSize = parseFloat(getComputedStyle(wall).fontSize);
    cardWidth = Math.max(10 * fontSize, Math.min(innerWidth * 0.18, 16 * fontSize));
    const count = Math.max(6, Math.floor(arc * width * 0.78 / (cardWidth + 8)));
    cards = rows.map((row, rowIndex) => {
    const track = row.querySelector('.photo-track');
    row.replaceChildren(track);
    // Jumlah foto mengikuti lebar layar supaya rangkaian tetap rapat.
    const images = Array.from({ length: count }, (_, index) => {
        const img = document.createElement('img');
        img.src = sources[(index + rowIndex * 3) % sources.length];
        img.alt = '';
        img.draggable = false;
        return img;
    });
    track.replaceChildren(...images);
    return images;
    });
}

layout();
new ResizeObserver(layout).observe(wall);

let elapsed = 0;
let previousTime;
function animate(time) {
    const delta = previousTime === undefined ? 0 : Math.min(time - previousTime, 50);
    previousTime = time;
    if (!motionPreference.matches) elapsed += delta / 1000;

    const radius = width * 0.78;
    const depth = Math.min(width * 0.32, 480);
    const rowSpacing = cardWidth * 9 / 16 + 10;

    cards.forEach((images, rowIndex) => {
        const direction = rowIndex % 2 === 0 ? 1 : -1;
        // Baris genap dimulai setengah kartu dari baris ganjil (pola batu bata).
        const brickOffset = rowIndex % 2 * (arc / images.length / 2);
        const phase = elapsed * direction * 0.045 + brickOffset;
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
