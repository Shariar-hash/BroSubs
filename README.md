# BroSubs - AI Tools Marketplace 🚀

A modern e-commerce platform for selling AI tool subscriptions like ChatGPT Pro, Claude, Gemini, and more. Built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL (NeonDB).

## ✨ Features

### User Features
- 🏠 **Modern Homepage** with hero section and smooth animations
- 🔍 **Search Functionality** to find AI tools
- 🛍️ **Product Catalog** with hover animations and smooth transitions
- 📱 **Responsive Design** works on all devices
- 💳 **Easy Checkout** with Bkash/Nagad payment integration
- ⚡ **Fast Delivery** - Access within 2 hours
- 📧 **Order Tracking** via email

### Admin Features
- 📊 **Dashboard Overview** with stats (total orders, pending, completed)
- ➕ **Product Management** - Add, Edit, Delete products
- 📦 **Order Management** - View and verify orders
- ✅ **Order Verification** - Approve/Reject orders
- 📝 **Transaction Tracking** - Match transaction IDs

### Technical Features
- ⚡ **Next.js 14** with App Router
- 🎨 **Framer Motion** for smooth animations
- 🎯 **TypeScript** for type safety
- 💾 **PostgreSQL** with Prisma ORM
- 🔐 **Secure** API routes
- 📱 **Fully Responsive** UI

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: PostgreSQL (NeonDB)
- **ORM**: Prisma
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (NeonDB recommended)
- Git

### Step 1: Clone the Repository
\`\`\`bash
git clone <your-repo-url>
cd BroSubs
\`\`\`

### Step 2: Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Step 3: Set Up Environment Variables
Create a \`.env\` file in the root directory:

\`\`\`env
# Database (Get this from NeonDB dashboard)
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

# Admin Credentials
ADMIN_EMAIL="admin@brosubs.com"
ADMIN_PASSWORD="your-secure-password"

# Payment Information
PAYMENT_NUMBER="+8801311130356"
\`\`\`

### Step 4: Set Up Database

1. **Create a NeonDB Database**:
   - Go to [NeonDB](https://neon.tech)
   - Create a new project
   - Copy the connection string
   - Paste it in your \`.env\` file as \`DATABASE_URL\`

2. **Run Prisma Migrations**:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

3. **Optional: Seed Sample Data**:
\`\`\`bash
# You can manually add products via the admin dashboard
# Or create a seed script
\`\`\`

### Step 5: Run the Development Server
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Usage

### For Users

1. **Browse Products**: Visit the homepage to see all available AI tools
2. **Search**: Use the search bar to find specific tools
3. **View Details**: Click on any product to see full details and features
4. **Purchase**: 
   - Click "Buy Now"
   - Fill in your information
   - Make payment via Bkash/Nagad to the provided number
   - Enter transaction ID
   - Submit the form
5. **Wait for Approval**: Admin will verify and activate within 2 hours

### For Admin

1. **Access Dashboard**: Go to `/admin`
2. **View Stats**: See overview of orders and products
3. **Manage Products**:
   - Click "Products" tab
   - Add new products with the "Add New Product" button
   - Edit existing products
   - Delete products
4. **Manage Orders**:
   - Click "Orders" tab
   - View all customer orders
   - Verify transaction IDs
   - Approve or reject orders
   - Add internal notes

## 📁 Project Structure

\`\`\`
BroSubs/
├── app/
│   ├── admin/
│   │   ├── products/
│   │   │   ├── new/page.tsx          # Add product page
│   │   │   └── edit/[id]/page.tsx    # Edit product page
│   │   └── page.tsx                   # Admin dashboard
│   ├── api/
│   │   ├── products/
│   │   │   ├── route.ts               # Products API
│   │   │   └── [id]/route.ts         # Single product API
│   │   ├── orders/
│   │   │   ├── route.ts               # Orders API
│   │   │   └── [id]/route.ts         # Single order API
│   │   └── admin/
│   │       └── stats/route.ts         # Admin stats API
│   ├── product/
│   │   └── [id]/page.tsx              # Product details page
│   ├── layout.tsx                      # Root layout
│   ├── page.tsx                        # Homepage
│   └── globals.css                     # Global styles
├── components/
│   ├── Navbar.tsx                      # Navigation bar
│   ├── ProductCard.tsx                 # Product card component
│   └── PurchaseForm.tsx                # Purchase form modal
├── lib/
│   └── prisma.ts                       # Prisma client
├── prisma/
│   └── schema.prisma                   # Database schema
├── .env.example                        # Environment variables template
├── package.json                        # Dependencies
└── README.md                           # This file
\`\`\`

## 🗄️ Database Schema

### Product
- id (String, Primary Key)
- name (String)
- description (String)
- features (String[])
- price (Float)
- image (String, Optional)
- category (String)
- status (String - active/coming_soon)
- createdAt, updatedAt

### Order
- id (String, Primary Key)
- productId (String, Foreign Key)
- fullName (String)
- phone (String)
- email (String)
- password (String, Optional)
- paymentMethod (String - bkash/nagad)
- transactionId (String)
- screenshot (String, Optional)
- status (String - pending/completed/rejected)
- adminNotes (String, Optional)
- createdAt, updatedAt

### Admin
- id (String, Primary Key)
- email (String, Unique)
- password (String)
- createdAt

## 🎨 Customization

### Colors
Edit \`tailwind.config.ts\`:
\`\`\`typescript
colors: {
  primary: '#6366f1',    // Indigo
  secondary: '#8b5cf6',  // Purple
  accent: '#ec4899',     // Pink
}
\`\`\`

### Payment Number
Update in \`.env\`:
\`\`\`env
PAYMENT_NUMBER="+8801311130356"
\`\`\`

### Add More Products
Use the admin dashboard at `/admin` or directly via API.

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy!

### Deploy Database

Your NeonDB database is already cloud-hosted and ready for production.

## 📝 API Endpoints

### Products
- \`GET /api/products\` - Get all products
- \`GET /api/products/[id]\` - Get single product
- \`POST /api/products\` - Create product (admin)
- \`PUT /api/products/[id]\` - Update product (admin)
- \`DELETE /api/products/[id]\` - Delete product (admin)

### Orders
- \`GET /api/orders\` - Get all orders (admin)
- \`GET /api/orders/[id]\` - Get single order
- \`POST /api/orders\` - Create order
- \`PUT /api/orders/[id]\` - Update order status (admin)

### Admin
- \`GET /api/admin/stats\` - Get dashboard statistics

## 🔒 Security Notes

⚠️ **Important for Production**:

1. **Add Authentication**: Currently, admin routes are public. Add authentication before deploying.
2. **Hash Passwords**: Implement password hashing (bcrypt)
3. **Add API Rate Limiting**: Prevent abuse
4. **Validate Inputs**: Add proper validation
5. **Use HTTPS**: Always use secure connections
6. **Environment Variables**: Never commit \`.env\` file

## 🤝 Contributing

This is a private project, but you can:
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📧 Support

For support, email: support@brosubs.com

## 📄 License

This project is private and proprietary.

---

**Built with ❤️ for BroSubs**
