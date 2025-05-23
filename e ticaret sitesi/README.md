# E-Commerce Website

Modern bir e-ticaret web sitesi. MERN stack (MongoDB, Express.js, React.js, Node.js) kullanılarak geliştirilmiştir.

## Özellikler

- Kullanıcı kaydı ve girişi
- Ürün listeleme ve detay görüntüleme
- Alışveriş sepeti işlemleri
- Güvenli ödeme sistemi
- Responsive tasarım
- Material-UI ile modern arayüz

## Teknolojiler

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Mongoose

### Frontend
- React.js
- Redux Toolkit
- Material-UI
- React Router
- Axios

## Kurulum

1. Repoyu klonlayın
```bash
git clone [repo-url]
```

2. Backend kurulumu
```bash
cd backend
npm install
```

3. Frontend kurulumu
```bash
cd frontend
npm install
```

4. Çevre değişkenlerini ayarlayın
Backend klasöründe `.env` dosyası oluşturun:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

5. Uygulamayı çalıştırın

Backend için:
```bash
cd backend
npm run dev
```

Frontend için:
```bash
cd frontend
npm start
```

## Kullanım

- `/` - Ana sayfa
- `/products` - Ürün listesi
- `/product/:id` - Ürün detayları
- `/cart` - Alışveriş sepeti
- `/login` - Giriş sayfası
- `/register` - Kayıt sayfası

## Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun 