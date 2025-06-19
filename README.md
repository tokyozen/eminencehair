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
     - `VITE_FIREBASE_API_KEY`: Your Firebase API key
     - `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase auth domain
     - `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
     - `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
     - `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
     - `VITE_FIREBASE_APP_ID`: Your Firebase app ID

3. **Deploy:**
   ```bash
   vercel --prod
   ```

## 🔥 Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Follow the setup wizard
4. Enable Authentication and Firestore Database

### 2. Configure Authentication

1. In Firebase Console, go to Authentication > Sign-in method
2. Enable "Email/Password" provider
3. Configure authorized domains (add your Vercel domain)

### 3. Configure Firestore Database

1. Go to Firestore Database
2. Create database in production mode
3. Set up security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own customer data
    match /customers/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Users can read/write their own appointments
    match /appointments/{appointmentId} {
      allow read, write: if request.auth != null && 
        resource.data.customer_id == request.auth.uid;
    }
    
    // Users can read/write their own orders
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        resource.data.customer_id == request.auth.uid;
    }
    
    // Users can read/write their own order items
    match /order_items/{itemId} {
      allow read, write: if request.auth != null;
    }
    
    // Users can read/write their own wishlist
    match /wishlist_items/{itemId} {
      allow read, write: if request.auth != null && 
        resource.data.customer_id == request.auth.uid;
    }
  }
}
```

### 4. Get Firebase Configuration

1. Go to Project Settings > General
2. Scroll down to "Your apps"
3. Click "Web app" icon to create a web app
4. Copy the configuration object
5. Add the values to your environment variables

## 📱 Environment Variables

Create a `.env` file in your project root:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
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
- **Database:** Firebase Firestore
- **Authentication:** Firebase Auth
- **Deployment:** Vercel
- **Build Tool:** Vite

## 🎨 Design Features

- Apple-level design aesthetics
- Smooth animations and micro-interactions
- Professional color scheme with warm tones
- Mobile-first responsive design
- Accessible and user-friendly interface

## 📊 Database Collections

The application uses Firebase Firestore with the following collections:
- `customers` - Customer profiles and loyalty data
- `appointments` - Service bookings and scheduling
- `orders` - Purchase history and tracking
- `order_items` - Individual order line items
- `wishlist_items` - Customer saved products

## 🔐 Security

- Firebase Authentication with email/password
- Firestore security rules for data protection
- User-specific data access controls
- Environment variables for sensitive configuration

## 📞 Contact

For support or questions about this application:
- Email: eihu335@gmail.com
- Phone: (204) 825-8526
- Instagram: @eminencehairco

---

Built with ❤️ for beautiful hair transformations.