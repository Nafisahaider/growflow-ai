# 🚀 GrowFlow AI — WhatsApp Marketing SaaS

> Turn WhatsApp into your #1 sales machine. GrowFlow AI is a complete, production-ready SaaS platform with AI-powered campaign automation, shared inbox, smart CRM, and chatbot flow builder.

![GrowFlow AI](https://img.shields.io/badge/Next.js-14-black?logo=next.js) ![Prisma](https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v3-38bdf8?logo=tailwindcss) ![NextAuth](https://img.shields.io/badge/NextAuth-v4-purple)

---

## ✨ Features

- **🤖 AI Chatbot Builder** — Visual drag-and-drop flow canvas powered by ReactFlow
- **📣 Campaign Engine** — Multi-step broadcast wizard with AI message generation
- **👥 Smart CRM** — Contact management with tags, AI lead scoring, and CSV import
- **📥 Shared Inbox** — Team-accessible WhatsApp inbox with agent assignment
- **📊 Analytics Dashboard** — Real-time Recharts graphs for all campaign metrics
- **⚙️ Settings** — Billing, team members, API keys, webhooks

---

## 🛠 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | Next.js 14, Tailwind CSS, ShadCN UI, Framer Motion |
| Backend | Next.js API Routes |
| Database | Prisma ORM + SQLite (local) / PostgreSQL (production) |
| Auth | NextAuth.js v4 |
| Charts | Recharts |
| Flow Builder | ReactFlow |
| AI | OpenAI GPT-4 (configurable) |
| Payments | Stripe |

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Nafisahaider/growflow-ai.git
cd growflow-ai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
cp .env.example .env
# Fill in your values in .env
```

### 4. Set up the database
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
nafisa/
├── src/
│   ├── app/
│   │   ├── api/              # Backend API routes
│   │   ├── dashboard/        # Authenticated app pages
│   │   ├── onboarding/       # User onboarding flow
│   │   ├── pricing/          # Public pricing page
│   │   ├── signin/signup/    # Auth pages
│   │   └── page.tsx          # Marketing landing page
│   ├── components/
│   │   └── marketing/        # Landing page sections
│   ├── lib/
│   │   ├── auth.ts           # NextAuth configuration
│   │   └── prisma.ts         # Prisma client singleton
│   └── types/                # TypeScript declarations
├── prisma/
│   └── schema.prisma         # Database schema
└── .env.example              # Environment variable template
```

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Nafisahaider/growflow-ai)

1. Click the button above
2. Set your environment variables in Vercel dashboard
3. Switch `DATABASE_URL` to a PostgreSQL connection string (e.g., from [Neon](https://neon.tech))

---

## 📄 License

MIT © Nafisa Haider
