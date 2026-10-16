# Navbar dan footer bersama

Edit `navbar.js` untuk nama situs dan daftar menu. Edit `footer.js` untuk teks, email, dan tautan footer. Gaya keduanya ada di `layout.css`.

Untuk halaman di folder utama, tambahkan ke `<head>`:

```html
<link rel="stylesheet" href="components/layout.css">
<script src="components/navbar.js" defer></script>
<script src="components/footer.js" defer></script>
```

Untuk halaman di folder seperti `tulisan`, gunakan `../components/` pada ketiga lokasi file. JavaScript menghitung tujuan navigasi dari lokasi komponen sehingga tautan beranda tetap benar.

Komponen dimuat melalui JavaScript tanpa fetch, sehingga dapat digunakan saat HTML dibuka langsung atau melalui server lokal. JavaScript harus aktif.
