# InvoicePro - Professional Invoice Management SaaS

A full-stack invoice management platform built with Next.js 15, featuring client management, invoice creation, payment tracking, and more.

![InvoicePro](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-black)

## 🌐 Live Demo

**GitHub:** [https://github.com/lokendarjangid/loky_invoicepro](https://github.com/lokendarjangid/loky_invoicepro)

**Live App:** Coming soon after deployment

## 🚀 Features

- **User Authentication** - Secure auth with Clerk
- **Invoice Management** - Create, edit, and track invoices
- **Client Portal** - Dedicated portal for clients to view invoices
- **Payment Integration** - Accept payments via Stripe
- **Dashboard Analytics** - Track revenue, pending payments, and more
- **PDF Export** - Download invoices as PDF
- **Email Notifications** - Automated invoice delivery
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Prisma ORM)
- **Authentication:** Clerk
- **Payments:** Stripe
- **UI Components:** Lucide React Icons
- **State Management:** Zustand
- **Notifications:** React Hot Toast

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/lokendarjangid/loky_invoicepro.git
cd loky_invoicepro
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Fill in your environment variables:
- `DATABASE_URL` - PostgreSQL connection string (use [Neon](https://neon.tech) for free hosting)
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY` - Get from [Clerk](https://clerk.com)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` & `STRIPE_SECRET_KEY` - Get from [Stripe](https://stripe.com)

4. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Database Setup (Neon)

1. Create free database at [Neon](https://neon.tech)
2. Copy connection string to `DATABASE_URL`
3. Run `npx prisma db push` to create tables

### Authentication Setup (Clerk)

1. Create account at [Clerk](https://clerk.com)
2. Create new application
3. Copy API keys to `.env`
4. Configure redirect URLs in Clerk dashboard

### Payment Setup (Stripe)

1. Create account at [Stripe](https://stripe.com)
2. Get API keys from dashboard
3. Add to `.env`
4. Configure webhooks for payment notifications

## 📝 Usage

1. **Sign Up** - Create your account
2. **Add Clients** - Add client information
3. **Create Invoice** - Build professional invoices with line items
4. **Send & Track** - Send invoices and track payment status
5. **Get Paid** - Receive payments via Stripe

## 💰 Monetization Ideas

- **Freemium Model** - Free tier (5 invoices/month), paid tiers for unlimited
- **Subscription Plans** - Monthly/yearly subscriptions ($19-$49/month)
- **Transaction Fees** - Small fee on Stripe payments (1-2%)
- **White Label** - Sell customized versions to agencies
- **Add-ons** - Premium features (multi-user, API access, advanced analytics)

## 🎯 Roadmap

- [ ] Recurring invoices
- [ ] Email templates customization
- [ ] Multi-currency support
- [ ] Expense tracking
- [ ] Time tracking integration
- [ ] Mobile app
- [ ] API for integrations
- [ ] Advanced reporting

## 📄 License

MIT License - feel free to use for personal or commercial projects!

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit PRs.

## 📧 Support

For questions or support, open an issue on GitHub.

---

Built with ❤️ by [Lokendar](https://github.com/lokendarjangid)
