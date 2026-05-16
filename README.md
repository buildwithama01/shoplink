# Kozura

Kozura is a high-performance, multi-tenant e-commerce platform designed to empower sellers to launch and scale their online presence effortlessly. Built with a modern tech stack, Kozura provides a seamless experience for both store owners and customers.

## 🚀 Key Features

- **Multi-Tenant Storefronts**: Unique, customizable storefronts for every seller with SEO-optimized slugs.
- **Advanced Seller Dashboard**: Comprehensive tools to manage inventory, categories, and order processing.
- **Admin Control Center**: Global management for users, store verification, and platform-wide settings.
- **WhatsApp Checkout**: Integrated workflow that connects buyers directly to sellers via WhatsApp for personalized order completion.
- **Automated Subscriptions**: Seamless plan management and automated billing powered by Paystack.
- **Global Store Search**: Discover stores across the platform directly from the landing page.
- **Responsive Design**: A premium, mobile-first UI built for a stunning first impression on any device.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Payments**: [Paystack](https://paystack.com/)
- **Email**: [Resend](https://resend.com/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🏁 Getting Started

### Prerequisites

- Node.js (Latest LTS)
- A Supabase account and project
- A Paystack account (for payment features)
- A Resend account (for email notifications)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kadixtechnologies/Kozura.git
   cd kozura
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   PAYSTACK_SECRET_KEY=your_paystack_secret
   RESEND_API_KEY=your_resend_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `actions/`: Server actions for business logic.
- `app/`: Next.js App Router pages and layouts.
- `components/`: Reusable UI components (Shared, Public, Admin, Shop).
- `lib/`: Utility functions and shared library configurations.
- `supabase/`: Database migrations and configuration.
- `public/`: Static assets including logos and icons.

## 📄 License

This project is proprietary and confidential.

---

Built with ❤️ by [Kadix Technologies](https://github.com/kadixtechnologies).
