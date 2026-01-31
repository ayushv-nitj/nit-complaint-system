# NIT Jamshedpur - Real-Time Complaint Management System

🏆 **Hackathon Project** | Built with Next.js 14, TypeScript, and Pusher

A production-ready, real-time complaint management system for NIT Jamshedpur that ensures transparency, accountability, and timely resolution of student issues.

## 🌐 Live Demo

**Deployment:** https://nit-complaint-system.vercel.app/

**Demo Credentials:**
- **Student:** student1@nitjsr.ac.in / Password123!
- **Admin:** admin@nitjsr.ac.in / Password123!
- **Super Admin:** superadmin@nitjsr.ac.in / Password123!

## ✨ Features Implemented

### Core Requirements (100% Complete)

#### 🎓 Student Portal
- ✅ Submit complaints with 6 categories
- ✅ Track complaint status in real-time
- ✅ View complete activity history
- ✅ Receive live updates without refresh
- ✅ Cannot submit new complaint while one is "IN_PROGRESS"

#### 👨‍💼 Admin Portal
- ✅ View unclaimed complaints
- ✅ Claim responsibility (exclusive ownership)
- ✅ Update status with mandatory remarks
- ✅ Cannot modify complaints claimed by others
- ✅ Real-time dashboard updates

#### 👑 Super Admin Portal
- ✅ System-wide analytics dashboard
- ✅ View all complaints with filters
- ✅ Monitor escalated complaints
- ✅ Category-wise breakdown
- ✅ Recent complaints feed

### Advanced Features

#### ⚡ Real-Time System
- ✅ Instant updates using Pusher
- ✅ No manual refresh required
- ✅ Live notification system
- ✅ Automatic dashboard sync

#### ⏰ Time-Based Intelligence
- ✅ Auto-priority increase after 30 minutes
- ✅ Auto-escalation after 24 hours
- ✅ Automated cron jobs (Vercel)
- ✅ Smart notification routing

#### 🔒 Security & Validation
- ✅ Role-based access control (RBAC)
- ✅ Secure authentication (NextAuth.js)
- ✅ Input validation (Zod)
- ✅ Protected API routes
- ✅ Bcrypt password hashing

#### 📊 Data Management
- ✅ Complete activity logging
- ✅ Full audit trail
- ✅ Complaint history tracking
- ✅ Status transition management

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (Vercel Postgres)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Real-Time:** Pusher
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Forms:** React Hook Form + Zod
- **Deployment:** Vercel

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Pusher account (free tier)

### Installation Steps

1. **Clone the repository**
```bash
   git clone https://github.com/yourusername/nit-complaint-system.git
   cd nit-complaint-system
```

2. **Install dependencies**
```bash
   npm install
```

3. **Setup environment variables**
```bash
   cp .env.example .env
```
   
   Fill in your `.env`:
```env
   DATABASE_URL="postgresql://..."
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   NEXTAUTH_URL="http://localhost:3000"
   NEXT_PUBLIC_PUSHER_KEY="your-key"
   NEXT_PUBLIC_PUSHER_CLUSTER="your-cluster"
   PUSHER_APP_ID="your-app-id"
   PUSHER_SECRET="your-secret"
   CRON_SECRET="your-random-secret"
```

4. **Setup database**
```bash
   npx prisma migrate dev
   npx prisma db seed
```

5. **Run development server**
```bash
   npm run dev
```

6. **Open browser**
   Navigate to http://localhost:3000

## 📁 Project Structure

nit-complaint-system/
├── app/
│   ├── (auth)/               # Authentication pages
│   ├── (dashboard)/          # Protected dashboards
│   └── api/                  # API routes
├── components/
│   ├── ui/                   # shadcn components
│   ├── common/               # Shared components
│   ├── complaints/           # Complaint components
│   └── admin/                # Admin components
├── lib/                      # Utilities & configs
├── hooks/                    # Custom React hooks
├── services/                 # Business logic
├── prisma/                   # Database schema
└── types/                    # TypeScript types

## 🎯 Key Features Alignment with Problem Statement

| Requirement | Implementation | Status |
|------------|----------------|--------|
| 3 User Roles | Student, Admin, Super Admin | ✅ |
| 6 Categories | All categories implemented | ✅ |
| Real-time updates | Pusher integration | ✅ |
| Exclusive claim | One admin per complaint | ✅ |
| Activity history | Complete audit trail | ✅ |
| 30-min priority | Automated cron job | ✅ |
| 24-hr escalation | Automated cron job | ✅ |
| Concurrent prevention | IN_PROGRESS check | ✅ |

## 🏗️ Architecture Decisions

### Why Next.js?
- Full-stack in one framework
- Server-side rendering for better SEO
- Built-in API routes
- Excellent deployment on Vercel

### Why Prisma?
- Type-safe database queries
- Auto-generated types
- Easy migrations
- Great developer experience

### Why Pusher?
- Managed real-time infrastructure
- Free tier sufficient for project
- Easy WebSocket abstraction
- Reliable delivery

## 🔐 Security Features

- Bcrypt password hashing (10 rounds)
- JWT-based sessions
- Role-based middleware protection
- Input validation on all forms
- SQL injection prevention (Prisma)
- XSS protection
- CSRF tokens (NextAuth)

## 📊 Database Schema

Key entities:
- **Users** - Students, Admins, Super Admins
- **Complaints** - Issue tracking with full lifecycle
- **Activities** - Complete audit trail
- **Notifications** - Real-time user notifications

See `prisma/schema.prisma` for complete schema.

## 🧪 Testing

### Test All Features
```bash
# Student Flow
1. Register → Login → Submit Complaint → View Details

# Admin Flow
2. Login → View Unclaimed → Claim → Update Status

# Super Admin Flow
3. Login → View Analytics → Check Escalated

# Real-time
4. Open 2 windows → Student & Admin → Submit → See live update

# Time-based
5. Wait 30 min (or modify code to 1 min) → Priority increases
```

## 🚢 Deployment

Deployed on Vercel with:
- Automatic deployments from `main` branch
- Environment variables configured
- Cron jobs for time-based logic
- Production database (Vercel Postgres)


## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack Next.js development
- Real-time web applications
- Database design and migrations
- Authentication and authorization
- Automated background jobs
- Production deployment
- Clean code architecture

## 🙏 Acknowledgments

- NIT Jamshedpur for the opportunity
- shadcn for UI components
- Vercel for seamless hosting
- Pusher for real-time infrastructure

## 👨‍💻 Author

**Ayush Verma**
- GitHub: [@ayushv-nitj](https://github.com/ayushv-nitj)
- Email: ayushverma9d12@gmail.com

## 📄 License

MIT License - feel free to use for learning!

---

**Built with ❤️ for NIT Jamshedpur Hackathon**