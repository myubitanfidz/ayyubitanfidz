// Setiap foto mengikuti lintasan elips, bukan menggeser seluruh baris datar.
const wall = document.querySelector('.hero__photo-wall');
const rows = [...wall.querySelectorAll('.photo-row')];
const sources = [...new Set([...wall.querySelectorAll('img')].map(img => img.src))];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

const arc = Math.PI * 1.14;
let width;
let cardWidth;
let cards = [];
let curve = [];
let curveLength = 0;

// Tabel panjang lintasan: jarak yang sama di permukaan elips
// membutuhkan perubahan sudut yang berbeda di tengah dan tepi.
function buildCurve() {
    const radius = width * 0.78;
    const depth = Math.min(width * 0.32, 480);
    curve = [];
    curveLength = 0;
    let previous;
    for (let i = 0; i <= 512; i++) {
        const angle = -arc / 2 + i / 512 * arc;
        const x = radius * Math.sin(angle);
        const z = depth * (1 - Math.cos(angle));
        if (previous) curveLength += Math.hypot(x - previous.x, z - previous.z);
        curve.push({ angle, distance: curveLength });
        previous = { x, z };
    }
}

function angleAtDistance(distance) {
    let low = 0;
    let high = curve.length - 1;
    while (high - low > 1) {
        const middle = (low + high) >> 1;
        if (curve[middle].distance <= distance) low = middle;
        else high = middle;
    }
    const start = curve[low];
    const end = curve[high];
    const fraction = (distance - start.distance) / (end.distance - start.distance);
    return start.angle + (end.angle - start.angle) * fraction;
}

function layout() {
    width = wall.clientWidth;
    // Sisakan ruang di sepanjang permukaan, termasuk saat foto berotasi.
    const fontSize = parseFloat(getComputedStyle(wall).fontSize);
    cardWidth = Math.max(10 * fontSize, Math.min(innerWidth * 0.18, 16 * fontSize));
    buildCurve();
    const count = Math.max(2, Math.floor(curveLength / (cardWidth + 18)));
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
        const spacing = curveLength / images.length;
        const brickOffset = rowIndex % 2 * spacing / 2;
        const phase = elapsed * direction * width * 0.035 + brickOffset;
        const y = (rowIndex - (rows.length - 1) / 2) * rowSpacing;

        images.forEach((img, index) => {
            const position = index * spacing + phase;
            const distance = ((position % curveLength) + curveLength) % curveLength;
            const angle = angleAtDistance(distance);
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
