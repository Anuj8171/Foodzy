# [Live Demo → foodzy-henna.vercel.app](https://foodzy-henna.vercel.app)

## Basic Ecommerce

### Foodzy is a full-stack e-commerce web application built with **Next.js (TypeScript)** for the frontend and **Node.js (TypeScript)** for the backend.  
It allows users to view products, add to cart, verify orders using OTP, and place orders.  
Order confirmation emails are sent using **SendGrid**.

---

## Project Structure

### Frontend (Next.js + TypeScript)
- `component/` — Navbar, product cards, and checkout components  
- `checkout/` — Handles OTP verification and placing order  
- `product-[id]/` — Displays specific product details  
- `store/` — Zustand state management  
  - `emailStore.ts` — Send and verify OTP (stored in database)  
  - `cartStore.ts` — Add and remove products from cart (local)  
  - `orderStore.ts` — Place order, call backend API, send mail  
- `type/` — Shared types used by components  

---

### Backend (Node.js + TypeScript + Prisma + SQLite)
- `prisma/schema.prisma` — Database schema for **Product**, **Order**, **User**, and **OTP**

- `routes/`
  - `auth/` — Handles sending and verifying OTP  
  - `product/` — Get all products and product by ID  
  - `order/` — Place order and send mail  

- `controller/`
  - `sendOtp.ts` — Send OTP and save in DB  
  - `verifyOtp.ts` — Verify OTP from DB  
  - `order.ts` — Handle placing orders and sending mail  
  - `product.ts` — Fetch all products and product by ID  

---

## Tech Stack
- **Frontend:** Next.js, TypeScript, Tailwind CSS, Zustand  
- **Backend:** Node.js, TypeScript, Express, Prisma ORM, SQLite  
- **Mail Service:** SendGrid  

---

## Functionality
- Fetch all products from backend  
- View single product details  
- Add or remove items from cart  
- Send OTP for verification  
- Verify OTP before placing order  
- Save order in database and send confirmation email  

---

> **⚠️ Important:** Emails may appear in your spam folder.
