# Wyze Bundle Builder

A premium, interactive web application built with **React / Next.js**, **TypeScript**, and **Tailwind CSS v4** that allows customers to configure their home security systems dynamically.

---

## 🚀 Quick Start / Run Instructions

Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### 3. Build & Run Locally (Production Mode)
```bash
npm run build
npm run start
```

---

## ☁️ Deployment on Vercel

Since this is a Next.js application with dynamic backend Route Handlers (`app/api/bundle/route.ts`), it is best deployed on **Vercel** which supports Next.js features out-of-the-box:

1. Push your repository to GitHub.
2. Go to [Vercel](https://vercel.com/) and log in with your GitHub account.
3. Click **Add New...** -> **Project**.
4. Import your repository `Frontend-Take-Home-Bundle-Builder-`.
5. Click **Deploy**. Vercel will automatically build the project and assign a free live URL (e.g. `your-project-name.vercel.app`).

---

## 🏗️ Architecture & Core Decisions

### 1. Central State Management (`BundleContext`)
Rather than passing props down multiple layers (Prop Drilling), the state is managed centrally using **React Context API** inside `context/BundleContext.tsx`. This provider exposes:
- **`selectedQuantities`**: Keeps track of counts for selected items.
- **`selectedOptions`**: Keeps track of the currently selected variant/color chip on the product card.
- **Helper functions**: Handles increments, decrements, variant selection, and local persistence.

### 2. Variant-Aware Counter (Multi-Variant Logic)
- Product quantities are tracked using a compound key: `${productId}_${selectedOption}` (e.g., `cam_v4_Black` or `cam_battery_pro_Grey`).
- Switching color options on a card updates the active counter to reflect that color's specific count, rather than a global card count.
- The active card border (`border-[#4E2FD2B2]`) highlights if *any* color variant of that product has a quantity greater than zero.
- Every color variant selected displays as a separate, distinct line item in the Review Panel (e.g., "Wyze Cam v4 (Color: Black) x2" and "Wyze Cam v4 (Color: White) x1").

### 3. LocalStorage Persistence
- Clicking **"Save my system for later"** stores the current state (`selectedQuantities`, `selectedOptions`, and `activeStep`) in the browser's local storage.
- On page load, the context reads this data to fully restore the user's progress.
- Prevents server-side rendering (SSR) hydration issues in Next.js using defensive `typeof window !== 'undefined'` checks.

---

## 🛠️ Responsive Design System

The application is highly optimized for screens of all sizes:
- **Desktop (1200px+):** Layout splits into a left-side Accordion section and a right-side sticky Summary Card with a gap under 29px.
- **Tablet (1024px to 1199px):** To prevent labels and prices from overlapping inside the compact 5-column product grid, prices and counter controls stack vertically.
- **Stacked Layout (< 1000px):** Below 1000px, the layout transitions to a vertical stack, making the Summary Card stack underneath the Accordion for optimal readability.
- **Horizontal Cards:** On desktop (`xl`), product cards transition to a clean horizontal row structure where the images dynamically scale to match the height of the details column.
