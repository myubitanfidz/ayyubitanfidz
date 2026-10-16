// Versi lokal. Database dan autentikasi diperlukan untuk guestbook publik.
const guestbookKey = 'ayyubi-guestbook-v1';
const guestbookForm = document.querySelector('#guestbook-form');
const messageList = document.querySelector('#guestbook-messages');
const moreMessages = document.querySelector('#guestbook-more');
const guestbookStatus = document.querySelector('#guestbook-status');
let messages = [];
let visibleCount = 10; // Jumlah pesan yang ditampilkan pertama kali.
let replyingTo = null;
try {
    const saved = JSON.parse(localStorage.getItem(guestbookKey) || '[]');
    if (Array.isArray(saved)) messages = saved.filter(item =>
        item && typeof item.id === 'string' && typeof item.name === 'string' &&
        typeof item.message === 'string' && Number.isFinite(item.createdAt)
    ).slice(-200);
} catch {
    guestbookStatus.textContent = 'Penyimpanan browser tidak tersedia; pesan baru hanya tampil selama halaman ini terbuka.';
}

function cancelReply() {
    replyingTo = null;
    document.querySelector('#guestbook-reply').hidden = true;
}

function renderMessages() {
    messageList.replaceChildren();
    const shown = messages.slice(-visibleCount);
    if (!shown.length) {
        const empty = document.createElement('p');
        empty.className = 'guestbook__empty';
        empty.textContent = 'Belum ada pesan. Jadilah yang pertama menyapa!';
        messageList.append(empty);
    }
    shown.forEach(item => {
        const article = document.createElement('article');
        article.className = 'guestbook-message';
        const avatar = document.createElement('span');
        avatar.className = 'guestbook-message__avatar';
        avatar.textContent = Array.from(item.name.trim())[0]?.toUpperCase() || '?';
        avatar.setAttribute('aria-hidden', 'true');
        const content = document.createElement('div');
        content.className = 'guestbook-message__content';
        const header = document.createElement('div');
        header.className = 'guestbook-message__header';
        const name = document.createElement('strong');
        name.textContent = item.name;
        const time = document.createElement('time');
        time.dateTime = new Date(item.createdAt).toISOString();
        time.textContent = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(item.createdAt);
        header.append(name, time);
        content.append(header);
        const parent = messages.find(message => message.id === item.replyTo);
        if (parent) {
            const quote = document.createElement('blockquote');
            quote.textContent = `@${parent.name}: ${parent.message.slice(0, 100)}`;
            content.append(quote);
        }
        const bubble = document.createElement('p');
        bubble.className = 'guestbook-message__bubble';
        // textContent menjaga pesan pengguna tampil sebagai teks, bukan HTML.
        bubble.textContent = item.message;
        const reply = document.createElement('button');
        reply.className = 'guestbook-message__reply';
        reply.type = 'button';
        reply.textContent = 'Balas';
        reply.setAttribute('aria-label', `Balas pesan ${item.name}`);
        reply.addEventListener('click', () => {
            replyingTo = item.id;
            document.querySelector('#guestbook-reply-text').textContent = `Membalas ${item.name}: ${item.message.slice(0, 100)}`;
            document.querySelector('#guestbook-reply').hidden = false;
            document.querySelector('#guestbook-message').focus();
        });
        content.append(bubble, reply);
        article.append(avatar, content);
        messageList.append(article);
    });
    moreMessages.hidden = visibleCount >= messages.length;
}

guestbookForm.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(guestbookForm);
    const name = String(data.get('name')).trim();
    const message = String(data.get('message')).trim();
    if (!name || !message) {
        guestbookStatus.textContent = 'Isi nama dan pesan terlebih dahulu.';
        return;
    }
    messages.push({ id: crypto.randomUUID(), name: name.slice(0, 50), message: message.slice(0, 500), createdAt: Date.now(), replyTo: replyingTo });
    messages = messages.slice(-200);
    try {
        localStorage.setItem(guestbookKey, JSON.stringify(messages));
        guestbookStatus.textContent = 'Pesan disimpan di browser ini.';
    } catch {
        guestbookStatus.textContent = 'Pesan tampil sementara; penyimpanan browser tidak tersedia.';
    }
    document.querySelector('#guestbook-message').value = '';
    cancelReply();
    renderMessages();
});
moreMessages.addEventListener('click', () => { visibleCount += 10; renderMessages(); });
document.querySelector('#guestbook-cancel-reply').addEventListener('click', cancelReply);
renderMessages();
