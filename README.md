# 🛍️ AlloraCart - E-Commerce Platform

A modern, feature-rich e-commerce platform built with Vue 3, TypeScript, and TailwindCSS. AlloraCart delivers a seamless shopping experience with product browsing, cart management, favorites, and secure checkout.

## ✨ Features

- **🔐 Authentication System**
  - User sign-up and sign-in
  - Persistent authentication with localStorage
  - Protected cart actions (sign-in required to add items)

- **🛒 Shopping Cart**
  - Add/remove products
  - Adjust quantities
  - Size selection for clothing and shoes
  - Real-time cart count in navbar
  - Cart persistence across sessions

- **❤️ Favorites/Wishlist**
  - Save favorite products
  - Quick access to wishlist
  - Persistent storage

- **🔍 Product Discovery**
  - Browse all products
  - Category filtering
  - Search functionality
  - Advanced product filtering
  - Detailed product pages with lightbox image viewer

- **🌙 Dark Mode**
  - Toggle between light and dark themes
  - Persistent theme preference
  - Premium gradient designs

- **💳 Checkout & Payments**
  - Secure checkout process
  - Multiple payment methods
  - Order management
  - Order history

- **💬 Communication**
  - Messages page for customer support
  - Contact form
  - Toast notifications for user feedback



- **📱 Responsive Design**
  - Desktop-first approach
  - Tablet and Mobile optimized
  - Touch-friendly interface

## 🛠️ Tech Stack

| Category | Technology |
|----------|--------------|
| **Frontend Framework** | Vue 3 (Composition API) |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **State Management** | Pinia |
| **Routing** | Vue Router |
| **Styling** | TailwindCSS + PostCSS |
| **UI Components** | Custom Vue components |

## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── AuthModal.vue
│   ├── Navbar.vue
│   ├── ProductCard.vue
│   ├── DarkModeToggle.vue
│   └── ...
├── pages/               # Page components
│   ├── Home.vue
│   ├── ProductDetailsPage.vue
│   ├── CartPage.vue
│   ├── CheckoutPage.vue
│   └── ...
├── stores/              # Pinia stores
│   ├── authStore.ts
│   ├── cartStore.ts
│   ├── favoritesStore.ts
│   ├── darkModeStore.ts
│   └── ...
├── router/              # Vue Router configuration
│   └── index.ts
├── services/            # API services
│   └── productService.ts
├── types/               # TypeScript types
│   └── product.ts
├── utils/               # Utility functions
│   └── currency.ts
├── App.vue              # Root component
└── main.ts              # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd GUI-MiniProject
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   - Navigate to `http://localhost:5173`

## 📦 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🔑 Key Features Explained

### Authentication System
- Users must sign in to add items to cart
- Authentication check on "Add to Cart" button redirects unsigned users to `/signin`
- User data persisted in localStorage with fallback email parsing

### Responsive Cart Management
- Cart count badge only displays when user is authenticated
- Size selection required for clothing and shoe products
- Real-time quantity adjustments with min/max validation

### Product Lightbox
- Click on product images to open fullscreen lightbox
- Keyboard navigation: `Escape` to close, `Arrow Keys` to navigate
- Image counter showing current position

### Currency Conversion
- Automatic USD to LKR conversion (default rate: 1 USD = 320 LKR)
- Locale-specific formatting for Sri Lankan currency
- Easily adjustable exchange rate in `ProductDetailsPage.vue`

### Dark Mode
- Automatically detects system preferences
- Toggle button in navbar for manual switching
- Premium gradient designs for both themes

## 📝 Environment Setup

1. Create a `.env` file in the root directory (optional)
2. Configure API endpoints if needed
3. Adjust currency conversion rate in `src/pages/ProductDetailsPage.vue` if required

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## 📄 License

This project is part of a GUI Mini Project.

## 👨‍💻 Support

For issues and questions, please open an issue in the repository.

---

**Happy Shopping! 🛍️**
