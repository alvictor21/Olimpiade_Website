import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import multer from "multer";
import path from "path";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const SECRET_KEY = "olimpiade_sains_2025" // ← bisa diganti string apapun

const app = express();
const PORT = 3000;

// ===========================
// MIDDLEWARE
// ===========================
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // akses file upload lewat URL

// ===========================
// KONEKSI DATABASE
// ===========================
const db = await mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // ganti dengan password MySQL kamu
  database: "olimpiade",
});

// ===========================
// KONFIGURASI UPLOAD FILE
// ===========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // file disimpan di folder uploads/
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, "bukti-" + unique + ext); // contoh: bukti-1234567890-123456789.jpg
  },
}); 

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // maksimal 5MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Format file tidak didukung. Gunakan JPG, PNG, atau PDF."));
    }
  },
});

// ===========================
// ENDPOINT: GET semua mapel
// untuk mengisi dropdown di form pendaftaran
// ===========================
app.get("/api/mapel", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM mapel ORDER BY nama ASC");
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: POST daftar peserta baru
// menerima data dari FormPendaftaran.jsx
// ===========================
app.post("/api/peserta", upload.single("bukti_bayar"), async (req, res) => {
  try {
    const { nama, email, no_hp,  nisn, sekolah, tgl_lahir, kelamin, mapel_id, metode_bayar } = req.body;
    const bukti_bayar = req.file ? req.file.filename : null;

    // validasi sederhana — pastikan semua field terisi
    if (!nama || !email || !no_hp || !nisn || !sekolah || !tgl_lahir || !kelamin || !mapel_id || !metode_bayar) {
      return res.status(400).json({ success: false, message: "Semua field wajib diisi." });
    }

    // cek NISN sudah terdaftar atau belum
    const [existing] = await db.query("SELECT id FROM peserta WHERE nisn = ?", [nisn]);
    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: "NISN sudah terdaftar." });
    }

    // simpan ke database
    const [result] = await db.query(
      `INSERT INTO peserta 
        (nama, email, no_hp, nisn, sekolah, tgl_lahir, kelamin, mapel_id, metode_bayar, bukti_bayar) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [nama, email, no_hp, nisn, sekolah, tgl_lahir, kelamin, mapel_id, metode_bayar, bukti_bayar]
    );

    res.status(201).json({
      success: true,
      message: "Pendaftaran berhasil!",
      data: { id: result.insertId },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: GET semua peserta
// untuk ditampilkan di tabel Peserta.jsx
// ===========================
app.get("/api/peserta", async (req, res) => {
  try {
    const { mapel_id } = req.query; // filter opsional: /api/peserta?mapel_id=1

    let query = `
      SELECT 
        p.id, p.nama, p.email, p.no_hp, p.nisn, p.sekolah,
        p.tgl_lahir, p.kelamin, p.mapel_id, p.metode_bayar,
        p.bukti_bayar, p.status_bayar, p.created_at,
        m.nama AS mapel
      FROM peserta p
      JOIN mapel m ON p.mapel_id = m.id
    `;

    const params = [];

    if (mapel_id) {
      query += " WHERE p.mapel_id = ?";
      params.push(mapel_id);
    }

    query += " ORDER BY p.created_at DESC";

    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: GET detail satu peserta
// ===========================
app.get("/api/peserta/:id", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT 
        p.*, m.nama AS mapel
       FROM peserta p
       JOIN mapel m ON p.mapel_id = m.id
       WHERE p.id = ?`,
      [req.params.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Peserta tidak ditemukan." });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: PUT edit peserta
// ===========================
app.put("/api/peserta/:id", async (req, res) => {
  try {
    const { nama, email, no_hp,  nisn, sekolah, tgl_lahir, kelamin, mapel_id, metode_bayar, status_bayar } = req.body;

    const [result] = await db.query(
      `UPDATE peserta SET
        nama = ?, email = ?, no_hp= ?, nisn = ?, sekolah = ?,
        tgl_lahir = ?, kelamin = ?, mapel_id = ?,
        metode_bayar = ?, status_bayar = ?
       WHERE id = ?`,
      [nama, email, no_hp, nisn, sekolah, tgl_lahir, kelamin, mapel_id, metode_bayar, status_bayar, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Peserta tidak ditemukan." });
    }

    res.json({ success: true, message: "Data peserta berhasil diperbarui." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: DELETE hapus peserta
// ===========================
app.delete("/api/peserta/:id", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM peserta WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Peserta tidak ditemukan." });
    }

    res.json({ success: true, message: "Peserta berhasil dihapus." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: GET statistik
// untuk StatCards.jsx di dashboard
// ===========================
app.get("/api/statistik", async (req, res) => {
  try {
    const [[{ total }]]        = await db.query("SELECT COUNT(*) AS total FROM peserta");
    const [[{ sudah_bayar }]]  = await db.query("SELECT COUNT(*) AS sudah_bayar FROM peserta WHERE status_bayar = 'lunas'");
    const [[{ belum_bayar }]]  = await db.query("SELECT COUNT(*) AS belum_bayar FROM peserta WHERE status_bayar = 'belum'");
    const [[{ total_uang }]]   = await db.query("SELECT COUNT(*) * 75000 AS total_uang FROM peserta WHERE status_bayar = 'lunas'");

    res.json({
      success: true,
      data: {
        total_pendaftar: total,
        sudah_bayar,
        belum_bayar,
        total_uang,
        daftar_ulang: 0, // belum hari H
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: GET data chart per mapel
// ===========================
app.get("/api/chart/mapel", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT m.nama, COUNT(p.id) AS jumlah
      FROM mapel m
      LEFT JOIN peserta p ON p.mapel_id = m.id
      GROUP BY m.id, m.nama
      ORDER BY m.nama ASC
    `);
    res.json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: GET data chart kelamin & pembayaran
// ===========================
app.get("/api/chart/demografi", async (req, res) => {
  try {
    const [[{ laki }]]      = await db.query("SELECT COUNT(*) AS laki FROM peserta WHERE kelamin = 'L'");
    const [[{ perempuan }]] = await db.query("SELECT COUNT(*) AS perempuan FROM peserta WHERE kelamin = 'P'");
    const [[{ lunas }]]     = await db.query("SELECT COUNT(*) AS lunas FROM peserta WHERE status_bayar = 'lunas'");
    const [[{ belum }]]     = await db.query("SELECT COUNT(*) AS belum FROM peserta WHERE status_bayar = 'belum'");

    res.json({
      success: true,
      data: { laki, perempuan, lunas, belum }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: GET statistik per mapel
// ===========================
app.get("/api/mapel/statistik", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        m.id,
        m.nama,
        COUNT(p.id) AS total_peserta,
        SUM(CASE WHEN p.status_bayar = 'lunas' THEN 1 ELSE 0 END) AS sudah_bayar,
        SUM(CASE WHEN p.status_bayar = 'belum' THEN 1 ELSE 0 END) AS belum_bayar,
        SUM(CASE WHEN p.status_bayar = 'lunas' THEN 75000 ELSE 0 END) AS total_uang
      FROM mapel m
      LEFT JOIN peserta p ON p.mapel_id = m.id
      GROUP BY m.id, m.nama
      ORDER BY m.nama ASC
    `);

    const [[{ total_semua }]] = await db.query("SELECT COUNT(*) AS total_semua FROM peserta");

    const data = rows.map(r => ({
      ...r,
      persen: total_semua > 0 ? ((r.total_peserta / total_semua) * 100).toFixed(1) : "0.0"
    }));

    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// ENDPOINT: POST login
// ===========================
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username dan password wajib diisi." });
    }

    // cari admin di database
    const [rows] = await db.query("SELECT * FROM admin WHERE username = ?", [username]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Username atau password salah." });
    }

    const admin = rows[0];

    // cek password — pakai plaintext dulu
    const cocok = password === admin.password;
    if (!cocok) {
      return res.status(401).json({ success: false, message: "Username atau password salah." });
    }

    // buat token
    const token = jwt.sign(
      { id: admin.id, username: admin.username, nama: admin.nama, role: admin.role },
      SECRET_KEY,
      { expiresIn: "8h" }
    );

    res.json({
      success: true,
      message: "Login berhasil!",
      token,
      admin: { id: admin.id, username: admin.username, nama: admin.nama, role: admin.role }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===========================
// JALANKAN SERVER
// ===========================
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});