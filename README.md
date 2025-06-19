# Eminence Hair Co. - Professional Wig Services

A beautiful, modern website for Eminence Hair Co., featuring premium wig installation and customization services.

## 🌟 Features

- **Beautiful Homepage** with hero slideshow and CEO introduction
- **Service Booking System** with multi-step appointment scheduling
- **Customer Dashboard** for managing appointments, orders, and wishlist
- **Hair Collection Gallery** with product showcase and filtering
- **Interactive Chatbot** for customer support
- **Responsive Design** optimized for all devices
- **Professional Contact Pages** with business information

## 🚀 Deployment

### Deploy to Vercel

1. **Connect to Vercel:**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

2. **Set Environment Variables in Vercel:**
   - Go to your Vercel dashboard
   - Navigate to your project settings
   - Add these environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Environment Variables Required

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel
- **Build Tool:** Vite

## 🎨 Design Features

- Apple-level design aesthetics
- Smooth animations and micro-interactions
- Professional color scheme with warm tones
- Mobile-first responsive design
- Accessible and user-friendly interface

## 📊 Database Schema

The application uses Supabase with the following main tables:
- `customers` - Customer profiles and loyalty data
- `appointments` - Service bookings and scheduling
- `orders` - Purchase history and tracking
- `order_items` - Individual order line items
- `wishlist_items` - Customer saved products

## 🔐 Security

- Row Level Security (RLS) enabled on all tables
- User authentication with Supabase Auth
- Secure API endpoints with proper authorization
- Environment variables for sensitive data

## 📞 Contact

For support or questions about this application:
- Email: eihu335@gmail.com
- Phone: (204) 825-8526
- Instagram: @eminencehairco

---

Built with ❤️ for beautiful hair transformations.