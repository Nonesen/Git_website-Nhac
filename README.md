# 🎵 Sonify — Premium Music Experience

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel" />
</div>

<br/>

> Ứng dụng nghe nhạc trực tuyến cao cấp, được xây dựng với thiết kế glassmorphism và trải nghiệm người dùng hiện đại — không cần cài đặt, không cần local server.

## 🔗 Live Demo

**[▶ Mở Sonify trực tuyến](https://git-website-nh-c.vercel.app)**

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|---|---|
| 🎵 **Music Player** | Phát nhạc đầy đủ tính năng: play/pause, skip, shuffle, repeat |
| 🍔 **Collapsible Sidebar** | Sidebar có thể thu gọn (YouTube-style) để tối ưu không gian màn hình |
| 💊 **Floating Pill Header** | Header dạng "thanh trôi" bo tròn hiện đại với hiệu ứng Glassmorphism |
| 🌈 **Dynamic Background** | Nền web tự động đổi màu theo bìa album đang phát (như Apple Music) |
| ❤️ **Persistent Favorites** | Lưu bài hát yêu thích bền vào localStorage |
| 🌐 **Đa ngôn ngữ** | Hỗ trợ Tiếng Việt & English |
| 👤 **Hệ thống tài khoản** | Đăng nhập bằng MongoDB thực tế, bảo mật |
| 🔐 **Admin Panel** | Quản lý nhạc và người dùng trực quan |
| 📱 **Responsive** | Giao diện tương thích 100% với Web và Mobile |

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) + App Router
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud Database - Free Tier)
- **Deployment & Hosting:** [Vercel](https://vercel.com) (Frontend + Serverless Functions)
- **UI:** React 19 + TypeScript 5 + Vanilla CSS
- **State:** React Context API (Player, Auth, Theme, Language)
- **Security:** bcryptjs cho mã hóa mật khẩu

---

## 🚀 Cấu hình Môi trường (.env)

Để chạy dự án với cơ sở dữ liệu thực, bạn cần tạo file `.env.local` ở thư mục gốc:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/sonify
```

## 🌐 Triển khai lên Vercel

1. Truy cập vào Dashboard dự án trên **Vercel**.
2. Tìm phần **Settings** -> **Environment Variables**.
3. Thêm biến `MONGODB_URI` với giá trị là chuỗi kết nối từ **MongoDB Atlas** của bạn.
4. Bấm **Redeploy** để áp dụng thay đổi.

---

## 📁 Cấu trúc dự án

```
Sonify/
├── app/
│   ├── layout.tsx       # Root layout + Providers
│   ├── page.tsx         # Main page
│   └── globals.css      # Global styles
├── components/
│   ├── Header.tsx       # Thanh điều hướng + Settings
│   ├── Sidebar.tsx      # Menu điều hướng trái
│   ├── PlayerBar.tsx    # Thanh phát nhạc phía dưới
│   ├── QueuePanel.tsx   # Panel hàng chờ bài hát
│   ├── Background.tsx   # Dynamic background theo album
│   ├── SongCard.tsx     # Card từng bài hát
│   ├── SongGrid.tsx     # Grid danh sách nhạc
│   ├── Profile.tsx      # Trang hồ sơ người dùng
│   ├── AdminPanel.tsx   # Bảng quản trị
│   └── AuthModal.tsx    # Modal đăng nhập
├── context/
│   ├── PlayerContext.tsx   # State phát nhạc + Likes
│   ├── AuthContext.tsx     # State xác thực
│   ├── ThemeContext.tsx    # State giao diện
│   └── LanguageContext.tsx # State ngôn ngữ
└── data/
    └── constants.ts     # Dữ liệu bài hát + bản dịch
```
