// EDIT DI SINI: urutan kata dan waktu (1000 ms = 1 detik).
const typewriterSettings = {
    words: ['Programmer', 'Sastrawan', 'Filsuf', 'Pelukis', 'Photographer','Hafiz', 'Penyair', 'Penulis', 'Penyanyi', 'Musisi', 'Pemain Musik', 'Pemain Gitar', 'Pemain Piano', 'Pemain Drum', 'Pemain Biola', 'Pemain Saxophone', 'Pemain Bass', 'Pemain Keyboard', 'Pemain Terompet', 'Pemain Klarinet', 'Pemain Flute'],
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

// EDIT SAPAAN BIOGRAFI DI SINI. Waktu dalam milidetik.
const greetingSettings = {
    phrases: [
        { text: "Hello, I'm", lang: 'en' },
        { text: 'Halo, saya', lang: 'id' },
        { text: 'Bonjour, je suis', lang: 'fr' },
        { text: '你好，我是', lang: 'zh-CN' },
    ],
    typingDelay: 110,
    deletingDelay: 65,
    holdDelay: 2400,
    nextWordDelay: 350,
};

const greetingText = document.querySelector('#biography-greeting');
let greetingIndex = 0;
let greetingLetters = [];
let greetingLength = 0;
let greetingDeleting = true;
let greetingTimer;

function typeGreeting() {
    greetingLength += greetingDeleting ? -1 : 1;
    greetingText.textContent = greetingLetters.slice(0, greetingLength).join('');
    let delay = greetingDeleting ? greetingSettings.deletingDelay : greetingSettings.typingDelay;
    if (greetingDeleting && greetingLength === 0) {
        greetingIndex = (greetingIndex + 1) % greetingSettings.phrases.length;
        const phrase = greetingSettings.phrases[greetingIndex];
        greetingLetters = Array.from(phrase.text);
        greetingText.lang = phrase.lang;
        greetingDeleting = false;
        delay = greetingSettings.nextWordDelay;
    } else if (!greetingDeleting && greetingLength === greetingLetters.length) {
        greetingDeleting = true;
        delay = greetingSettings.holdDelay;
    }
    greetingTimer = setTimeout(typeGreeting, delay);
}

function restartGreeting() {
    clearTimeout(greetingTimer);
    greetingIndex = 0;
    const phrase = greetingSettings.phrases[0];
    greetingLetters = Array.from(phrase.text);
    greetingLength = greetingLetters.length;
    greetingDeleting = true;
    greetingText.textContent = phrase.text;
    greetingText.lang = phrase.lang;
    if (!typingMotion.matches) greetingTimer = setTimeout(typeGreeting, greetingSettings.holdDelay);
}

typingMotion.addEventListener('change', restartGreeting);
restartGreeting();
