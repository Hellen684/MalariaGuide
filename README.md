# Malaria Guide 🦟

> **Predict. Prevent. Educate.** > A real-time malaria monitoring, forecasting, and regional outbreak management dashboard prototype.

This repository features a decoupled architecture containing a lightweight **Express.js backend API** providing mock security/metric feeds, and a **Next.js (React) frontend app** styled with Tailwind CSS.

---

## 📂 Project Structure

```text
malaria-guide/
├── .gitignore             # Git exclusion rules
├── README.md              # Setup instructions & API Reference
├── backend/
│   ├── routes/
│   │   ├── auth.js        # Mock sign-in security endpoint
│   │   └── dashboard.js   # Real-time outbreak metric feeds
│   ├── package.json       # Express dependencies
│   └── server.js          # Application entry point & gateway
└── frontend/
    ├── components/
    │   ├── BottomNavbar.jsx
    │   ├── ForecastChart.jsx
    │   ├── OutbreakList.jsx
    │   ├── QuickActions.jsx
    │   └── StatsCard.jsx
    ├── pages/
    │   ├── _app.jsx
    │   ├── index.jsx      # Login page
    │   └── dashboard.jsx  # Main application screen
    ├── styles/
    │   └── globals.css
    ├── postcss.config.js
    ├── tailwind.config.js
    └── package.json

```
git clone [https://github.com/Hellen684/MalariaGuide.git](https://github.com/Hellen684/MalariaGuide.git)
cd MalariaGuide

cd backend
npm install
npm start

cd frontend
npm install
npm run dev