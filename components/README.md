# Komponen navbar dan footer

Lokasi template:
- `js/components/navbar.js`: nama situs dan menu.
- `js/components/footer.js`: teks dan tautan footer.
- `css/components/layout.css`: gaya bersama.

Untuk halaman di folder utama, tambahkan ke `<head>`:

```html
<link rel="stylesheet" href="css/components/layout.css">
<script src="js/components/navbar.js" defer></script>
<script src="js/components/footer.js" defer></script>
```

Untuk halaman di folder `tulisan`, awali ketiga lokasi dengan `../`.
JavaScript menghitung tautan navigasi dari lokasi file komponen.
Komponen dapat dipakai saat HTML dibuka langsung atau melalui server lokal; JavaScript harus aktif.
