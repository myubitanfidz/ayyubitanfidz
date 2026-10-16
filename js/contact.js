// Ganti alamat ini jika email tujuan berubah.
const contactRecipient = 'mayyubi496@gmail.com';
document.querySelector('#contact-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim();
    const email = String(data.get('email')).trim();
    const message = String(data.get('message')).trim();
    if (!name || !message) {
        document.querySelector('#contact-status').textContent = 'Isi nama dan pesan terlebih dahulu.';
        return;
    }
    const subject = encodeURIComponent(`Pesan website dari ${name}`);
    const body = encodeURIComponent(`Nama: ${name}\nEmail balasan: ${email}\n\n${message}`);
    window.location.href = `mailto:${contactRecipient}?subject=${subject}&body=${body}`;
    document.querySelector('#contact-status').textContent = 'Lanjutkan dengan menekan Kirim di aplikasi email Anda. Jika aplikasi tidak terbuka, hubungi ' + contactRecipient + ' secara langsung.';
});
