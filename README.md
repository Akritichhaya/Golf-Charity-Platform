# ⛳ GolfGives — Golf Charity Subscription Platform

A modern, emotion-driven subscription platform combining **golf performance tracking**, **monthly prize draws**, and **charitable giving**. Built as part of the Digital Heroes Full Stack Development Trainee Selection Process.

---

## 🌐 Live Demo

🔗 **Live Website:** [https://golf-charity-platform-beige.vercel.app](https://golf-charity-platform-beige.vercel.app)

💻 **GitHub Repository:** [https://github.com/Akritichhaya/golf-charity-platform](https://github.com/Akritichhaya/golf-charity-platform)

---

## 📸 All Pages

| Page | URL | Description |
|---|---|---|
| 🏠 Homepage | [/](https://golf-charity-platform-beige.vercel.app) | Landing page with pricing and features |
| 🔐 Login | [/login](https://golf-charity-platform-beige.vercel.app/login) | User authentication |
| 📝 Signup | [/signup](https://golf-charity-platform-beige.vercel.app/signup) | New user registration |
| 📊 Dashboard | [/dashboard](https://golf-charity-platform-beige.vercel.app/dashboard) | User control center |
| ⛳ Scores | [/scores](https://golf-charity-platform-beige.vercel.app/scores) | Golf score entry and history |
| ❤️ Charity | [/charity](https://golf-charity-platform-beige.vercel.app/charity) | Charity selection and donation % |
| 💳 Payment | [/payment](https://golf-charity-platform-beige.vercel.app/payment) | Subscription payment page |
| 🏆 Winner | [/winner](https://golf-charity-platform-beige.vercel.app/winner) | Winner verification and proof upload |
| 👨‍💼 Admin | [/admin](https://golf-charity-platform-beige.vercel.app/admin) | Full admin control panel |

---

## 🔑 Test Credentials

**User Login:**
```
Email: theakritichhaya@gmail.com
Password: Akriti123456
```

**Admin Panel:**
```
URL: https://golf-charity-platform-beige.vercel.app/admin
Email: theakritichhaya@gmail.com
Password: Akriti123456
```

---

## ✨ Features

### 👤 User Features
- ✅ Secure signup and login (Supabase Auth)
- ✅ Monthly ($9.99) and Yearly ($99) subscription plans
- ✅ Golf score entry in Stableford format (1–45)
- ✅ Last 5 scores retained automatically (oldest replaced)
- ✅ Charity selection from 6 major charities
- ✅ Adjustable donation percentage (10%–50%)
- ✅ User dashboard with subscription status
- ✅ Winner verification with proof upload
- ✅ Monthly draw participation tracking

### 👨‍💼 Admin Features
- ✅ View and manage all users
- ✅ Monthly draw engine (random number generation)
- ✅ Prize pool calculation (auto based on subscribers)
- ✅ View all scores submitted
- ✅ Charity management
- ✅ Winner verification and payout tracking
- ✅ Reports and analytics

### 🎰 Draw & Prize System
| Match Type | Prize Pool Share | Rollover |
|---|---|---|
| 5 Number Match | 40% (Jackpot) | Yes |
| 4 Number Match | 35% | No |
| 3 Number Match | 25% | No |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** | Frontend framework |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Supabase** | Database + Authentication |
| **Vercel** | Deployment |
| **PostgreSQL** | Database (via Supabase) |

---

## 🗄️ Database Schema

```sql
profiles (id, full_name, subscription_status, subscription_plan, renewal_date, charity_id, charity_percentage)
scores (id, user_id, score, score_date)
charities (id, name, description, image_url, featured)
draws (id, draw_month, numbers, status, jackpot_amount)
winners (id, user_id, draw_id, match_type, prize_amount, payment_status, proof_url)
subscriptions (id, user_id, plan, status, stripe_id)
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/Akritichhaya/golf-charity-platform.git
cd golf-charity-platform
npm install
npm run dev
```

---

## 📊 Previous Projects

### 1. Online Course Recommendation System
🔗 [github.com/Akritichhaya](https://github.com/Akritichhaya)
- Built using Python, Pandas, cosine similarity, and Streamlit
- Hybrid recommendation engine with collaborative filtering

### 2. Sales Analysis Dashboard (SQL + Power BI)
🔗 [github.com/Akritichhaya](https://github.com/Akritichhaya)
- End-to-end dashboard using SQL Server and Power BI
- Top-10 product and regional performance insights

---

## 👩‍💻 Developer

**Akriti Chhaya**
- 📧 [theakritichhaya@gmail.com](mailto:theakritichhaya@gmail.com)
- 📱 +91 9155647042
- 🔗 [LinkedIn](https://linkedin.com/in/akriti-chhaya)
- 💻 [GitHub](https://github.com/Akritichhaya)
- 🏆 [LeetCode](https://leetcode.com/Akritichhaya)

---

*Built with ❤️ by Akriti Chhaya in under 2 days!*
