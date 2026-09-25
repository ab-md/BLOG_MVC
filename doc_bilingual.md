# Blog MVC

A full-stack blog application built with Node.js, Express.js, MongoDB, Mongoose, and EJS.

## Features

- User registration and login
- JWT-based authentication
- JWT stored in HTTP-only cookies
- Role-based authorization
- User, Author, and Admin roles
- User profile management
- Post and category CRUD
- Comments and comment moderation
- Admin dashboard and user management
- Validation with Zod
- Flash messages
- Custom 404 and server error pages
- Server-side rendering with EJS
- MVC architecture

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- JWT
- Zod
- Express Session
- Connect Flash
- Cookie Parser
- Tailwind CSS
- Alpine.js
- Lucide Icons

## Installation

Install dependencies:

```bash
npm install
```

Create a `.env` file in the project root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

Start the development server:

```bash
npm run dev
```

Or:

```bash
npm start
```

## Admin Access

Newly registered users are created with the default `User` role.

To access the admin dashboard, first register an account normally. Then manually change that user's `role` field to `Admin` in the MongoDB `users` collection.

This grants access to the admin dashboard and administrative features.

### Example MongoDB Update

Using MongoDB Shell:

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "Admin" } }
)
```

Replace `your-email@example.com` with the email address of the account you registered.

If you are using MongoDB Compass, open the `users` collection, find your user document, and change:

```text
role: "User"
```

to:

```text
role: "Admin"
```

## User Roles

### User

Regular users can register, log in, manage their profile, view posts, and add comments.

### Author

Authors can manage posts according to their assigned permissions.

### Admin

Admins have access to administrative features such as the admin dashboard, user management, role changes, category management, post management, and comment moderation.

## Project Structure

```text
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validation/
├── utils/
├── views/
└── app.js
```

The request flow is:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
MongoDB
  ↓
Response
```

## Database

The application uses MongoDB with Mongoose.

Main entities:

- Users
- Posts
- Categories
- Comments

MongoDB references and Mongoose `populate()` are used where appropriate.

## Authentication

Authentication is implemented using JWT.

The JWT is stored in an HTTP-only cookie rather than being exposed directly to client-side JavaScript.

Authorization uses role-based access control with:

- User
- Author
- Admin

## Error Handling

The application includes:

- Custom 404 page
- Custom server error page
- Authentication and authorization error handling
- Validation error handling
- Flash messages

## Project Goal

The main goal of this project was to understand how the different parts of a backend application work together rather than simply implementing isolated CRUD operations.

## What I Learned

- Node.js backend development
- Express.js
- MVC architecture
- Routing and middleware
- Authentication and authorization
- JWT and HTTP-only cookies
- Role-based access control
- MongoDB and Mongoose
- CRUD operations
- Data validation with Zod
- Error handling
- EJS and server-side rendering
- Mongoose `populate()`
- Backend project structure
- Debugging and problem solving
- Using AI as a development assistant

## Future Improvements

- Access and refresh token architecture
- REST API for a React/Next.js frontend
- Swagger / OpenAPI documentation
- File upload and image storage
- More granular authorization
- Automated tests
- Rate limiting and additional security measures
- Pagination
- Search and filtering

## Project Status

Completed — Learning Project

This project was built for learning and portfolio purposes and is not intended to be considered production-ready software.

---

## 🇮🇷 مستندات فارسی

### معرفی

این پروژه یک وبلاگ فول‌استک است که با Node.js، Express.js، MongoDB، Mongoose و EJS ساخته شده است.

هدف اصلی پروژه، تمرین عملی مفاهیم Backend، احراز هویت و مجوزدهی، کار با دیتابیس، معماری MVC، اعتبارسنجی، Server-Side Rendering و ساختاردهی یک پروژه بک‌اند بوده است.

### قابلیت‌ها

- ثبت‌نام، ورود و خروج کاربران
- احراز هویت با JWT
- ذخیره JWT در HTTP-only Cookie
- مجوزدهی مبتنی بر نقش
- نقش‌های User، Author و Admin
- مدیریت پروفایل کاربر
- CRUD پست‌ها و دسته‌بندی‌ها
- سیستم کامنت و مدیریت تأیید، رد و حذف کامنت‌ها
- داشبورد مدیریت
- مدیریت کاربران و تغییر نقش آن‌ها
- اعتبارسنجی با Zod
- Flash Messages
- صفحات اختصاصی 404 و خطای سرور
- Server-Side Rendering با EJS
- معماری MVC

### تکنولوژی‌ها

- Node.js
- Express.js
- MongoDB
- Mongoose
- EJS
- JWT
- Zod
- Express Session
- Connect Flash
- Cookie Parser
- Tailwind CSS
- Alpine.js
- Lucide Icons

### نصب و اجرا

ابتدا وابستگی‌های پروژه را نصب کنید:

```bash
npm install
```

سپس در ریشه پروژه یک فایل `.env` ایجاد کنید:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
```

برای اجرای پروژه در حالت توسعه:

```bash
npm run dev
```

یا:

```bash
npm start
```

### دسترسی به پنل Admin

کاربرانی که به‌صورت عادی ثبت‌نام می‌کنند، به‌صورت پیش‌فرض نقش `User` دارند.

برای دسترسی به داشبورد Admin، ابتدا یک حساب کاربری بسازید. سپس مقدار فیلد `role` همان کاربر را در collection مربوط به `users` در MongoDB به `Admin` تغییر دهید.

با این کار دسترسی‌های مربوط به داشبورد و قابلیت‌های مدیریتی برای آن کاربر فعال می‌شود.

#### با MongoDB Shell

```javascript
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "Admin" } }
)
```

به‌جای `your-email@example.com` ایمیل حسابی که ثبت‌نام کرده‌اید را قرار دهید.

#### با MongoDB Compass

وارد collection مربوط به `users` شوید، کاربر موردنظر را پیدا کنید و مقدار:

```text
role: "User"
```

را به:

```text
role: "Admin"
```

تغییر دهید.

### نقش‌های کاربران

#### User

کاربران عادی می‌توانند ثبت‌نام و ورود کنند، پروفایل خود را مدیریت کنند، پست‌ها را مشاهده کنند و کامنت ثبت کنند.

#### Author

کاربران دارای نقش Author می‌توانند مطابق مجوزهای تعریف‌شده، پست‌ها را مدیریت کنند.

#### Admin

کاربران دارای نقش Admin به قابلیت‌های مدیریتی مانند داشبورد مدیریت، مدیریت کاربران، تغییر نقش کاربران، مدیریت دسته‌بندی‌ها، مدیریت پست‌ها و مدیریت کامنت‌ها دسترسی دارند.

### ساختار پروژه

```text
src/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── validation/
├── utils/
├── views/
└── app.js
```

جریان اصلی یک درخواست در پروژه:

```text
Route
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
MongoDB
  ↓
Response
```

### دیتابیس

پروژه از MongoDB و Mongoose استفاده می‌کند.

موجودیت‌های اصلی عبارت‌اند از:

- Users
- Posts
- Categories
- Comments

برای ارتباط بین اسناد MongoDB از Reference و در موارد لازم از `populate()` در Mongoose استفاده شده است.

### احراز هویت

احراز هویت با JWT پیاده‌سازی شده است.

JWT در یک HTTP-only Cookie ذخیره می‌شود تا مستقیماً در اختیار JavaScript سمت کاربر قرار نگیرد.

مجوزدهی نیز بر اساس نقش‌های User، Author و Admin انجام می‌شود.

### مدیریت خطا

پروژه شامل صفحه اختصاصی 404، صفحه خطای سرور، مدیریت خطاهای Authentication و Authorization، مدیریت خطاهای Validation و Flash Messages است.

### هدف پروژه

هدف اصلی این پروژه فقط پیاده‌سازی چند عملیات CRUD نبود؛ بلکه تلاش کردم درک کنم بخش‌های مختلف یک Backend چطور در کنار یکدیگر کار می‌کنند.

یکی از بخش‌های مهم یادگیری، درک چرخه یک Request بود:

```text
Request
  ↓
Route
  ↓
Middleware
  ↓
Controller
  ↓
Model
  ↓
Database
  ↓
Response
```

### چیزهایی که در این پروژه تمرین کردم

- توسعه Backend با Node.js
- Express.js
- معماری MVC
- Routing و Middleware
- Authentication و Authorization
- JWT و HTTP-only Cookie
- Role-Based Access Control
- MongoDB و Mongoose
- عملیات CRUD
- اعتبارسنجی با Zod
- مدیریت خطا
- EJS و Server-Side Rendering
- استفاده از `populate()` در Mongoose
- ساختاردهی پروژه Backend
- Debugging و حل مسئله
- استفاده از AI به‌عنوان دستیار توسعه

### بهبودهای احتمالی در آینده

- معماری Access Token و Refresh Token
- ساخت REST API برای React/Next.js
- مستندسازی با Swagger / OpenAPI
- آپلود و ذخیره تصاویر
- مجوزدهی جزئی‌تر
- تست‌های خودکار
- Rate Limiting و بهبودهای امنیتی
- Pagination
- Search و Filtering

### وضعیت پروژه

**تکمیل شده — پروژه آموزشی**

این پروژه با هدف یادگیری و استفاده در Portfolio ساخته شده و به‌عنوان یک نرم‌افزار Production-Ready در نظر گرفته نمی‌شود.
