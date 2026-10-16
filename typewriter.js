// EDIT DI SINI: urutan kata dan waktu (1000 ms = 1 detik).
const typewriterSettings = {
    words: ['Programmer', 'Sastrawan', 'Filsuf', 'Pelukis', 'Photographer'],
    typingDelay: 100,   // Jeda mengetik satu huruf; lebih kecil = lebih cepat.
    deletingDelay: 60,  // Jeda menghapus satu huruf.
    holdDelay: 3200,    // Lama menampilkan kata yang sudah lengkap.
    nextWordDelay: 300, // Jeda sebelum mengetik kata berikutnya.
};

const roleText = document.querySelector('#hero-role');
const typingMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let wordIndex = 0;
let letterCount = typewriterSettings.words[0].length;
let deleting = true;
let typingTimer;

function typeNextLetter() {
    const word = typewriterSettings.words[wordIndex];
    letterCount += deleting ? -1 : 1;
    roleText.textContent = word.slice(0, letterCount);

    let delay = deleting ? typewriterSettings.deletingDelay : typewriterSettings.typingDelay;
    if (deleting && letterCount === 0) {
        wordIndex = (wordIndex + 1) % typewriterSettings.words.length;
        deleting = false;
        delay = typewriterSettings.nextWordDelay;
    } else if (!deleting && letterCount === word.length) {
        deleting = true;
        delay = typewriterSettings.holdDelay;
    }
    typingTimer = setTimeout(typeNextLetter, delay);
}

function restartTypewriter() {
    clearTimeout(typingTimer);
    wordIndex = 0;
    letterCount = typewriterSettings.words[0].length;
    deleting = true;
    roleText.textContent = typewriterSettings.words[0];
    if (!typingMotion.matches) {
        typingTimer = setTimeout(typeNextLetter, typewriterSettings.holdDelay);
    }
}

typingMotion.addEventListener('change', restartTypewriter);
restartTypewriter();
