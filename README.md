# 🏗️ TỔNG QUAN PROJECT: E-Commerce Microservices System

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 🎯 Mục tiêu

Xây dựng hệ thống thương mại điện tử gồm nhiều service giao tiếp với nhau qua API Gateway và Message Queue, có khả năng:

1. Đặt hàng (Order Service)

2. Thanh toán (Payment Service)

3. Quản lý tồn kho (Inventory Service)

4. Gửi thông báo (Notification Service)

5. Giao tiếp với bên ngoài (via Facade / Adapter)

6. Xử lý lỗi, retry, rollback logic (Saga, Circuit Breaker)

## 🧩 1. KIẾN TRÚC TỔNG QUAN

                 +-------------------+
                 |   API Gateway     | ← Facade Pattern
                 +--------+----------+
                          |
             +---------+--------+--------+---------+
             |         |        |        |         |
       +-----------+ +-----------+ +-----------+ +-----------+
       | Order Svc | | Payment Svc| | Inventory | | Notify Svc|
       +-----+-----+ +-----+-----+ +-----+-----+ +-----+-----+
             |             |             |             |
             |      Message Queue (Pub/Sub)    | ← Observer/Event Driven
             +---------------------------------+

## ⚙️ 2. CÁC DESIGN PATTERN ÁP DỤNG

| Loại Pattern  | Pattern                           | Ứng dụng trong Project                                                         |
| ------------- | --------------------------------- | ------------------------------------------------------------------------------ |
| Creational    | Factory Method / Abstract Factory | Khởi tạo các service client khác nhau cho từng môi trường (dev, staging, prod) |
| Creational    | Builder                           | Xây dựng cấu hình order phức tạp (nhiều item, coupon, shipping option)         |
| Structural    | Facade                            | API Gateway gom nhiều microservice thành 1 entry point                         |
| Structural    | Adapter                           | Kết nối đến cổng thanh toán bên ngoài (Stripe, PayPal, MoMo)                   |
| Structural    | Decorator                         | Logging & retry cho các service call                                           |
| Structural    | Proxy                             | Bảo vệ microservice qua caching layer                                          |
| Behavioral    | Observer (Pub/Sub)                | Khi order thành công → gửi event đến Inventory & Notification                  |
| Behavioral    | Chain of Responsibility           | Pipeline xử lý order: Validate → Check stock → Charge payment → Confirm        |
| Behavioral    | Strategy                          | Các phương thức thanh toán khác nhau (credit card, PayPal, MoMo)               |
| Behavioral    | Command                           | Thực hiện/rollback transaction trong Saga                                      |
| Architectural | Saga Pattern                      | Quản lý giao dịch phân tán giữa Order, Payment, Inventory                      |
| Architectural | Circuit Breaker / Retry           | Ngăn lỗi lan truyền khi Payment Service gặp sự cố                              |

## 🧱 3. CẤU TRÚC DỰ ÁN (Monorepo ví dụ với NestJS)

```bash
ecommerce/
│
├── apps/
│ ├── api-gateway/
│ │ ├── src/
│ │ └── main.ts
│ ├── order-service/
│ ├── payment-service/
│ ├── inventory-service/
│ └── notification-service/
│
├── libs/
│ ├── common/ # Shared DTO, interfaces
│ ├── factories/ # AbstractFactory, Builder
│ ├── patterns/ # Strategy, Decorator, Proxy, etc.
│ ├── saga/ # Saga orchestrator
│ └── messaging/ # Observer (Pub/Sub)
│
└── docker-compose.yml
```

## 💡 4. MỘT SỐ MODULE TIÊU BIỂU

### 🔹 OrderService — Chain of Responsibility + Saga + Observer

OrderHandler → ValidationHandler → InventoryCheckHandler → PaymentHandler

Mỗi handler là một bước nghiệp vụ.

Nếu lỗi → Saga rollback (gửi event ngược lại để hoàn tiền / phục hồi stock).

### 🔹 PaymentService — Strategy + Adapter + Factory

PaymentFactory sinh ra PaymentProcessor theo môi trường hoặc loại thanh toán.

Adapter giúp tích hợp Stripe, PayPal, MoMo.

Decorator thêm retry và logging.

### 🔹 API Gateway — Facade + Proxy + Decorator

Gom các service lại dưới 1 endpoint.

Caching tạm thời dữ liệu (Proxy).

Decorator thêm thống kê và tracing request.

### 🔹 InventoryService — Observer

Nghe event “OrderCreated”, “OrderCancelled”.

Cập nhật tồn kho tương ứng.

### 🔹 NotificationService — Observer + Strategy

Lắng nghe event → gửi mail, SMS, hoặc push notification theo chiến lược.

## 🧠 5. MỤC TIÊU THỰC HÀNH

Mức độ Mục tiêu

```
🧩 Level 1 Cài đặt cơ bản các service và kết nối qua message queue
🧩 Level 2 Áp dụng 3–5 pattern (Factory, Strategy, Facade, Observer, Chain)
🧩 Level 3 Mở rộng thành Saga pattern với rollback logic
🧩 Level 4 Thêm Decorator/Proxy để quản lý lỗi, log, retry
🧩 Level 5 Benchmark, tối ưu dependency, và áp dụng CI/CD
```

### 🚀 GỢI Ý LỘ TRÌNH TRIỂN KHAI

Bước 1: Tạo base project NestJS + Monorepo structure

Bước 2: Implement OrderService với Chain of Responsibility

Bước 3: Thêm PaymentService dùng Strategy + Factory

Bước 4: Tạo API Gateway dùng Facade

Bước 5: Thêm Messaging (Pub/Sub) để kết nối các service

Bước 6: Cài Saga Orchestrator điều phối toàn bộ giao dịch

Bước 7: Dùng Decorator + Proxy để thêm logging, retry, caching

Bước 8: Test toàn bộ luồng: Đặt hàng → Thanh toán → Cập nhật tồn → Thông báo

Bước 9: Viết unit test cho từng pattern
