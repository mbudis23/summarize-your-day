
# Summarize Your Day - Backend API

Backend API ini adalah bagian dari aplikasi "Summarize Your Day" yang memungkinkan pengguna untuk mencatat, memperbarui, dan menghapus laporan harian. API dibangun menggunakan **Node.js** dengan **Express** sebagai server framework, **Mongoose** untuk interaksi dengan MongoDB, dan **JWT** untuk autentikasi.

## Fitur

- **User Authentication**: Pengguna dapat login dengan token JWT.
- **CRUD Reports**: Menambahkan, memperbarui, menghapus, dan mengambil laporan harian.
- **Validasi Unik Tanggal**: Setiap laporan memiliki tanggal unik untuk menghindari duplikasi.

## Tech Stack

- **Node.js**
- **Express**
- **MongoDB** (Mongoose ODM)
- **JWT** (JSON Web Token)
- **cookie-parser**

## Instalasi

### Persyaratan

- **Node.js** versi 14 atau lebih baru
- **MongoDB** versi terbaru (disarankan menggunakan MongoDB Atlas untuk kemudahan)

### Langkah-langkah

1. **Clone repository** ini:

   ```bash
   git clone https://github.com/username/summarize-your-day-backend.git
   ```

2. **Install dependencies**:

   ```bash
   cd summarize-your-day-backend
   npm install
   ```

3. **Atur Environment Variables**:

   Buat file `.env` di root folder dan tambahkan variabel berikut:

   ```plaintext
   MONGO_URI=your_mongo_db_uri
   JWT_SECRET=your_secret_key
   PORT=5000
   ```

4. **Jalankan Server**:

   ```bash
   npm run dev
   ```

   Server akan berjalan di `http://localhost:5000` atau pada port yang Anda atur di `.env`.

## Endpoint API

### Authentication

#### Login User

- **URL**: `/api/users/login`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`
- **Body**:
  ```json
  {
      "_email": "user@example.com",
      "_password": "password123"
  }
  ```
- **Response**:
  - **Success**: `{ "token": "your_jwt_token" }`
  - **Error**: `{ "message": "Invalid password" }`

### Reports

#### Add Report

- **URL**: `/api/users/add-report`
- **Method**: `POST`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
      "_date": "2024-11-06T08:30:00.000Z",
      "_rate": 8,
      "_summarize": "Daily summary text"
  }
  ```
- **Response**:
  - **Success**: `{ "message": "Report added successfully", "reports": [...] }`
  - **Error**: `{ "message": "Report with this date already exists" }`

#### Get All Reports

- **URL**: `/api/users/reports`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **Success**: `{ "reports": [ { "_id": "reportId1", "_date": "...", "_rate": 8, "_summarize": "..." } ] }`

#### Get Report by ID

- **URL**: `/api/users/reports/:reportId`
- **Method**: `GET`
- **Headers**:
  - `Authorization: Bearer <token>`
- **Response**:
  - **Success**: `{ "report": { "_id": "reportId", "_date": "...", "_rate": 8, "_summarize": "..." } }`
  - **Error**: `{ "message": "Report not found" }`

#### Update Report by ID

- **URL**: `/api/users/reports/:reportId`
- **Method**: `PUT`
- **Headers**:
  - `Content-Type: application/json`
  - `Authorization: Bearer <token>`
- **Body**:
  ```json
  {
      "_date": "2024-11-07T10:00:00.000Z",
      "_rate": 9,
      "_summarize": "Updated summary"
  }
  ```
- **Response**:
  - **Success**: `{ "message": "Report updated successfully", "report": { ... } }`
  - **Error**: `{ "message": "Report not found" }`

#### Delete Report by ID

- **URL**: `/api/users/reports/:reportId`
- **Method**: `DELETE`
- **Headers**:
  - `Authorization`: `Bearer <token>`
- **Response**:
  - **Success**: `{ "message": "Report deleted successfully" }`
  - **Error**: `{ "message": "Report not found" }`

## Struktur Proyek

```
summarize-your-day-backend/
├── config/
│   └── db.js              # Konfigurasi database
├── controllers/
│   └── userController.js   # Logika kontrol untuk user dan reports
├── models/
│   └── userModel.js        # Skema untuk User dan Report
├── routes/
│   └── userRoutes.js       # Route untuk User dan Report endpoints
├── middleware/
│   └── authMiddleware.js   # Middleware autentikasi JWT
├── utils/
│   └── logger.js           # Utilitas logging
├── .env                    # Variabel lingkungan
├── app.js                  # Setup aplikasi
└── server.js               # Entry point
```

## Testing API

Gunakan **Postman** untuk menguji endpoint:

1. **Login** untuk mendapatkan token JWT.
2. **Tambahkan, ambil, dan hapus laporan** dengan header `Authorization: Bearer <token>` untuk setiap permintaan.
3. Pastikan bahwa laporan tidak dapat ditambahkan dua kali pada tanggal yang sama.

## Catatan Keamanan

- Pastikan **JWT_SECRET** adalah nilai yang aman dan tidak mudah ditebak.
- Simpan file `.env` di luar versi kontrol atau tambahkan ke `.gitignore`.

---

