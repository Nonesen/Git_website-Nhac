# 🎵 Sonify — Premium Music Experience

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel" />
  <img src="https://img.shields.io/badge/Performance-Optimized-brightgreen?style=for-the-badge&logo=google-lighthouse" />
</div>

<br/>

> **Sonify** là ứng dụng nghe nhạc trực tuyến cao cấp, được thiết kế với phong cách **Glassmorphism** hiện đại và hiệu năng tối ưu. Dự án tập trung vào trải nghiệm mượt mà, tính cá nhân hóa cao và khả năng quản lý chuyên nghiệp.

## 🔗 Live Demo

**[▶ Trải nghiệm Sonify trực tuyến](https://git-website-nh-c.vercel.app)**

---

## ✨ Tính năng nổi bật

| Tính năng | Mô tả |
|---|---|
| 🎵 **Advanced Player** | Phát nhạc đầy đủ tính năng: play/pause, skip, shuffle, repeat với hiệu ứng chuyển tiếp mượt mà. |
| 💊 **Modern UI** | Sidebar thu gọn (YouTube-style) và Floating Pill Header với hiệu ứng Glassmorphism cực mạnh. |
| 🌈 **Dynamic Visuals** | Nền web tự động thay đổi màu sắc theo Cover Art của bài hát (Apple Music Style). |
| 📱 **Responsive Design** | Giao diện tương thích hoàn hảo trên mọi thiết bị: Desktop, Tablet và Mobile. |
| 🔐 **Account System** | Đăng ký/Đăng nhập bảo mật với MongoDB Atlas, hỗ trợ lưu trữ yêu thích bền vững. |
| 📊 **Admin Dashboard** | Quản lý nhạc, người dùng và theo dõi trạng thái **Online/Offline Heartbeat** thời gian thực. |
| 📟 **Session Tracking** | Hệ thống nhận diện và đánh số session đa thiết bị, hiển thị thời gian hoạt động cuối (`lastActive`). |
| 🚀 **LCP Optimized** | Tối ưu hóa hình ảnh bằng `next/image`, đảm bảo tốc độ tải trang cực nhanh. |

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Frontend Framework:** [Next.js 16](https://nextjs.org/) (App Router) - Tối ưu hóa Server-side Rendering.
- **UI Library:** [React 19](https://react.dev/) + TypeScript 5.
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud NoSQL).
- **Styling:** Vanilla CSS (Modern CSS Variables & Glassmorphism).
- **Authentication:** Mã hóa mật khẩu với `bcryptjs`.
- **State Management:** React Context API (Auth, Player, Theme, Language).
- **Deployment:** Tự động triển khai qua [Vercel](https://vercel.com).

---

## 📈 Cập nhật mới nhất (07/05/2026)

- **Performance Boost:** Thay thế toàn bộ tag `<img>` bằng `next/image` để tối ưu chỉ số LCP.
- **Enhanced Stability:** Khắc phục triệt để lỗi Hydration và các hook bị thiếu sau khi tối ưu ảnh.
- **Smart Tracking:** Thêm tính năng theo dõi nhịp tim (Heartbeat) để xác định trạng thái Online/Offline của người dùng.
- **UX Refinement:** 
    - Lưu trạng thái Tab hiện tại vào URL Hash để không bị mất khi reload trang.
    - Hiệu ứng chuyển Tab và tải trang siêu mượt.
    - Logo Home tự động reload toàn bộ trạng thái app.
- **Clean Architecture:** Loại bỏ hoàn toàn các file rác và migration cũ, đảm bảo codebase sạch sẽ 100%.

---

## 🚀 Cài đặt & Triển khai

### 1. Cấu hình Môi trường (.env)
Tạo file `.env.local` tại thư mục gốc và thêm chuỗi kết nối MongoDB:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/sonify
```

### 2. Triển khai lên Vercel
1. Đẩy code lên GitHub.
2. Kết nối repo với Vercel.
3. Thêm biến môi trường `MONGODB_URI` trong **Settings > Environment Variables**.
4. **Deploy!** 🚀

---

## 📁 Cấu trúc thư mục chính

```
Sonify/
├── app/                # Next.js App Router (Pages, Layouts, APIs)
├── components/         # Các thành phần UI (Header, Player, Sidebar, Modal...)
├── context/            # Quản lý State toàn cục (Auth, Music Player, UI Settings)
├── data/               # Dữ liệu tĩnh, bản dịch và constants
├── lib/                # Cấu hình Database và các utility functions
└── public/             # Assets tĩnh (Icons, Logo, Images)
```

---
**Phát triển bởi:** Antigravity AI & Nonesen
**Trạng thái:** Production Ready ✅
