from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor

out = Path('assets/cv/cv-muhammad-ayyubi-tanfidz-ulya.pdf')
c = canvas.Canvas(str(out), pagesize=A4)
w, h = A4
c.setTitle('Curriculum Vitae - Muhammad Ayyubi Tanfidz Ulya - Draft')
c.setAuthor('Muhammad Ayyubi Tanfidz Ulya')
c.setFillColor(HexColor('#151515'))
c.rect(0, h-164, w, 164, fill=1, stroke=0)
c.setFillColor(HexColor('#b5b5b5'))
c.setFont('Helvetica', 10)
c.drawString(46, h-40, 'CURRICULUM VITAE / DRAFT')
c.setFillColor(HexColor('#ffffff'))
c.setFont('Helvetica-Bold', 25)
c.drawString(46, h-80, 'Muhammad Ayyubi')
c.drawString(46, h-111, 'Tanfidz Ulya')
c.setFont('Helvetica', 10)
c.drawString(46, h-140, '[Email]  |  [Nomor telepon]  |  [Domisili]')
y=h-205
sections = [
('PROFIL SINGKAT', ['[Tuliskan bidang yang Anda tekuni, minat, dan tujuan profesional.', 'Tambahkan ringkasan singkat yang relevan dengan posisi tujuan.]']),
('PENDIDIKAN', ['[Nama sekolah / universitas] - [Program studi]', '[Tahun masuk - tahun lulus]']),
('PENGALAMAN', ['[Posisi / peran] - [Organisasi / perusahaan]', '[Periode] | [Tanggung jawab dan pencapaian utama]']),
('PROYEK PILIHAN', ['[Nama proyek] - [Tautan proyek]', '[Masalah yang diselesaikan, kontribusi, dan teknologi yang digunakan.]']),
('KEAHLIAN', ['[Keahlian teknis]  |  [Perangkat / teknologi]  |  [Keahlian lainnya]']),
('BAHASA & SERTIFIKASI', ['[Bahasa dan tingkat penguasaan]', '[Nama sertifikasi, penerbit, dan tahun - jika ada]'])]
for title, lines in sections:
    c.setFillColor(HexColor('#222222'))
    c.setFont('Helvetica-Bold', 11)
    c.drawString(46,y,title)
    c.setStrokeColor(HexColor('#dddddd'))
    c.line(46,y-10,w-46,y-10)
    y-=30
    c.setFont('Helvetica',10)
    c.setFillColor(HexColor('#555555'))
    for line in lines:
        c.drawString(46,y,line)
        y-=16
    y-=23
c.setFont('Helvetica',9)
c.setFillColor(HexColor('#777777'))
c.drawString(46,36,'DRAFT - Semua bagian dalam tanda kurung siku perlu dilengkapi.')
c.save()
# Render untuk memeriksa tata letak PDF.
import pypdfium2 as pdfium
pdf = pdfium.PdfDocument(str(out))
page = pdf[0]
page.render(scale=1.2).to_pil().save('tmp/pdfs/cv-preview.png')
print(f'{out}: {len(pdf)} page')
