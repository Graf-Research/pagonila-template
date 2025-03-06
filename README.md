# Pagonila Code Template

## Preparation

Ubah script `generate` pada file **package.json**

```json
{
  ...,
  "scripts": {
    ...,
    "generate": "npx @pagonila/codegen <slug-project> <kode-project>"
  }
}
```

ganti `<slug-project>` dan `<kode-project>` menggunakan URL ADF di popup pengaturan Pagonila. Misal URL ADF sbb:

```text
https://desain.pagonila.id/toko-online5.adf?kode=0c6aab5e-4609-41cb-a5e6-102e01eb777
```

maka slug = `toko-online5` dan kode = `0c6aab5e-4609-41cb-a5e6-102e01eb777`

menjadi 

```json
"generate": "npx @pagonila/codegen toko-online5 0c6aab5e-4609-41cb-a5e6-102e01eb777
```

## Install

1. Install dependensi

```bash
npm install
```

2. Generate kode dari Pagonila

```bash
npm run generate
```

3. Jalankan program

```bash
npm run dev
```

*Note: program ini tidak menggunakan nodemon, sehingga ketika ada perubahan server harus di-start ulang agar perubahan ter-apply*
