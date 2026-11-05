# PetCare Hanoi

Ứng dụng di động quản lý và chăm sóc thú cưng tại Hà Nội, được xây dựng bằng React Native, Expo và TypeScript.

## Nội dung dự án

Ứng dụng minh họa các luồng chính dành cho người nuôi thú cưng:

- Đăng nhập, đăng ký và quên mật khẩu.
- Xem phòng khám, dịch vụ chăm sóc và thông tin chi tiết.
- Quản lý hồ sơ thú cưng và lịch sử sức khỏe.
- Đặt lịch dịch vụ, xem lịch sử và trạng thái lịch hẹn.
- Xem sản phẩm, chi tiết sản phẩm và giỏ hàng.
- Xem và chỉnh sửa thông tin tài khoản.

Hiện tại ứng dụng sử dụng dữ liệu mẫu trong `src/assets/mockData.ts`; các thao tác lưu thú cưng và đặt lịch được mô phỏng trong `src/services/api.ts`. Dự án chưa kết nối backend hoặc cổng thanh toán thật.

## Công nghệ

- React Native 0.74, Expo SDK 51 và TypeScript.
- React Navigation (native stack và bottom tabs).
- AsyncStorage và Expo Vector Icons.

## Yêu cầu

- Node.js và npm.
- Android Studio với Android SDK và một Android Virtual Device (AVD), hoặc thiết bị Android đã bật USB debugging.
- Expo Go trên thiết bị thật nếu chạy bằng Expo Go.

## Cài đặt và chạy

Tại thư mục dự án, cài các gói phụ thuộc:

```bash
npm install
```

Khởi động máy ảo Android từ Android Studio (Device Manager), sau đó chạy:

```bash
npm run android
```

Lệnh này khởi động Expo và mở ứng dụng trên máy ảo đang chạy. Có thể khởi động Expo riêng bằng:

```bash
npm start
```

Trong cửa sổ Expo, nhấn `a` để mở ứng dụng trên Android. Để chạy trên thiết bị thật, cài Expo Go, kết nối máy tính và điện thoại cùng mạng, quét mã QR hiển thị trong Expo.

Các lệnh khác:

```bash
npm run ios      # Chạy trên iOS (cần macOS và Xcode)
npm run web      # Chạy bản web
npm run typecheck
```

## Cấu trúc chính

```text
App.tsx                  # Khởi tạo providers và điều hướng
src/assets/mockData.ts   # Dữ liệu mẫu
src/components/          # Thành phần giao diện dùng chung
src/context/             # Trạng thái đăng nhập, thú cưng, lịch hẹn, giỏ hàng
src/navigation/           # Điều hướng xác thực và các tab chính
src/screens/              # Các màn hình theo chức năng
src/services/             # Các hàm dịch vụ mô phỏng
src/types/                # Kiểu dữ liệu TypeScript
src/utils/                # Hàm tiện ích
```
