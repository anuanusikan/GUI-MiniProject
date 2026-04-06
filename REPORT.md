# AlloraCart - Project Report

## Features Implemented

### 1. **Authentication System**
- User registration (Sign Up)
- User login (Sign In)
- Sign out functionality
- Persistent authentication using localStorage
- Protected routes that require authentication
- Email-based user identification with name fallback
- Integration with cart and favorites on authentication events

### 2. **Shopping Cart**
- Add products to cart with quantity selection
- Remove items from cart
- Update product quantities (increment/decrement)
- Size selection for clothing and shoe products
- Real-time cart count display in navbar (hidden when not authenticated)
- Cart persistence across browser sessions
- Clear cart functionality
- Cart total calculation including discounts

### 3. **Favorites/Wishlist**
- Add/remove products from favorites
- Toggle favorite status with visual feedback
- Heart icon indicator for saved products
- Favorites count badge in navbar
- Dedicated favorites page
- Persistent storage of favorite products

### 4. **Product Discovery & Browsing**
- Display all products from DummyJSON API
- Product cards with images, titles, descriptions, ratings
- Browse products by category
- Advanced filtering capabilities
- Search functionality across products
- Category page with all available categories
- Detailed product information pages

### 5. **Product Details Page**
- Full product information display
- Multiple product images with thumbnail gallery
- Lightbox/modal viewer for images
- Image navigation with keyboard support (Arrow keys, Escape)
- Discount percentage calculation and display
- Original price calculation from discounted price
- Stock availability display with color-coded status
- Customer rating display
- Size selector for applicable products
- Quantity selector with min/max validation
- Add to cart functionality with authentication check
- Save to favorites button
- Back button navigation

### 6. **Checkout & Payment**
- Dedicated checkout page
- Payment method selection
- Billing/Shipping address management
- Order summary with itemized breakdown
- Final order confirmation
- Order total calculation
- Discount application to checkout

### 7. **Dark Mode Support**
- Light and dark theme toggle
- System preference detection
- Persistent theme preference storage
- Premium gradient designs for both themes
- Smooth transitions between themes
- Applied across all pages and components

### 8. **User Pages & Features**
- **Home Page**: Hero section with promotional content
- **Categories Page**: Browse products by category
- **Offers Page**: View special deals and promotions
- **About Page**: Company information
- **Contact Page**: Contact form for customer support
- **Messages Page**: Customer communication interface
- **Settings Page**: User preferences and settings
- **My Orders Page**: View order history and details

### 9. **UI/UX Features**
- Toast notifications for user feedback (success, error, info)
- Responsive navbar with mobile menu
- Category filter/expansion
- Promotional ticker/banner
- Professional hero section with imagery
- Footer with links and information
- Loading states
- Error handling and display
- Smooth animations and transitions
- Hover effects and interactive elements

### 10. **Currency Support**
- USD to LKR conversion with configurable exchange rate
- Locale-specific currency formatting
- Automatic formatting in product prices
- Applied across all product displays and checkout

### 11. **Technical Features**
- TypeScript for type safety
- Vue 3 Composition API
- Pinia state management
- Vue Router for navigation
- TailwindCSS for styling
- Responsive design (mobile, tablet, desktop)
- Component-based architecture
- Service layer for API calls
- Type definitions for data models

---

## Component Hierarchy & Architecture

```
App.vue (Root Component)
│
├── Navbar.vue
│   ├── Logo.vue
│   ├── SearchBar (integrated)
│   ├── DarkModeToggle.vue
│   ├── ProfileMenu.vue
│   │   ├── Auth Links (SignIn/SignUp)
│   │   └── User Menu (Settings, Orders, SignOut)
│   └── Cart Icon Badge (shows only when authenticated)
│
├── Router Views (Pages)
│   │
│   ├── Home.vue
│   │   ├── HeroSection.vue
│   │   ├── OffersBanner.vue
│   │   ├── PromoTicker.vue
│   │   ├── CategoriesBar.vue
│   │   └── ProductGrid
│   │       └── ProductCard.vue (multiple)
│   │
│   ├── ProductDetailsPage.vue
│   │   ├── Image Gallery Section
│   │   │   ├── Main Image with Zoom
│   │   │   └── Thumbnail Gallery
│   │   ├── Product Info Section
│   │   │   ├── Category Badge
│   │   │   ├── Title
│   │   │   ├── Rating Display
│   │   │   ├── Stock Status
│   │   │   ├── Price Display
│   │   │   ├── Description
│   │   │   ├── Size Selector (conditional)
│   │   │   ├── Quantity Selector
│   │   │   ├── Add to Cart Button
│   │   │   └── Save to Favorites Button
│   │   ├── Extra Info Cards
│   │   └── Lightbox Modal (Teleported)
│   │
│   ├── CartPage.vue
│   │   ├── Cart Items List
│   │   │   └── CartItemCard (multiple)
│   │   ├── Cart Summary
│   │   ├── Checkout Button
│   │   └── Continue Shopping Button
│   │
│   ├── CheckoutPage.vue
│   │   ├── Shipping Address Form
│   │   ├── Billing Address Form
│   │   ├── Payment Methods
│   │   ├── Order Summary
│   │   └── Place Order Button
│   │
│   ├── FavoritesPage.vue
│   │   └── Favorite Items Grid
│   │       └── ProductCard (multiple)
│   │
│   ├── CategoriesPage.vue
│   │   └── Category Grid
│   │       └── CategoryCard (multiple)
│   │
│   ├── CategoryProducts.vue
│   │   └── Products by Category
│   │       └── ProductCard (multiple)
│   │
│   ├── OffersPage.vue
│   │   ├── Current Offers
│   │   ├── Promotional Banners
│   │   └── Special Deals Grid
│   │
│   ├── SignInPage.vue
│   │   └── AuthModal.vue
│   │       └── Sign In Form
│   │
│   ├── SignUpPage.vue
│   │   └── AuthModal.vue
│   │       └── Sign Up Form
│   │
│   ├── AboutPage.vue
│   ├── ContactPage.vue
│   ├── SettingsPage.vue
│   ├── MyOrdersPage.vue
│   └── MessagesPage.vue
│
├── ToastHost.vue
│   └── Toast Messages (Global)
│
└── Footer.vue
    ├── Company Info
    ├── Quick Links
    ├── Categories Links
    └── Social Links

```

### State Management (Pinia Stores)

```
stores/
├── authStore.ts
│   ├── user (ref)
│   ├── isAuthenticated (computed)
│   ├── signIn()
│   ├── signUp()
│   └── signOut()
│
├── cartStore.ts
│   ├── items (ref)
│   ├── totalItems (computed)
│   ├── totalPrice (computed)
│   ├── addToCart()
│   ├── removeFromCart()
│   ├── updateQuantity()
│   └── clearCart()
│
├── favoritesStore.ts
│   ├── items (ref)
│   ├── count (computed)
│   ├── has()
│   ├── toggle()
│   └── load()
│
├── darkModeStore.ts
│   ├── isDark (ref)
│   └── toggle()
│
├── checkoutStore.ts
│   ├── shippingAddress (ref)
│   ├── billingAddress (ref)
│   ├── paymentMethod (ref)
│   └── setters for each
│
├── filterStore.ts
│   ├── selectedCategory (ref)
│   ├── filters (ref)
│   └── filter operations
│
├── searchStore.ts
│   ├── query (ref)
│   └── search operations
│
├── toastStore.ts
│   ├── messages (ref)
│   ├── show()
│   └── remove()
│
└── uiStore.ts
    ├── UI state
    └── UI operations
```

### Data Flow

1. **Authentication Flow**
   - User signs in/up → authStore updates → Cart/Favorites load → Components react

2. **Product Browsing Flow**
   - ProductService fetches from DummyJSON → ProductCard/Details display
   - Filters applied via filterStore → Display updates

3. **Cart Flow**
   - Add to cart (auth check) → cartStore.addToCart() → Cart count updates
   - Only authenticated users see cart count badge

4. **Theme Flow**
   - User toggles dark mode → darkModeStore updates → All components apply theme

5. **Search Flow**
   - User types → searchStore.query updates → Components filter products

### Key Architectural Decisions

1. **Local Authentication**: Authentication is client-side only using localStorage for simplicity in a mini-project
2. **Protected Cart**: Cart additions require authentication, redirecting to sign-in page if needed
3. **DummyJSON API**: Uses free mock API for product catalog
4. **Component-Based**: Reusable components for product cards, modals, forms
5. **Pinia State**: Centralized state management for cart, auth, favorites, theme
6. **TypeScript**: Full type safety throughout the application
7. **Responsive Design**: Mobile-first approach with Tailwind CSS
8. **Service Layer**: Separate service file for API operations (productService.ts)

---

## Technologies Used

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript
- **Build Tool**: Vite
- **Package Manager**: npm
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **Styling**: TailwindCSS 3 + PostCSS
- **API**: DummyJSON (Mock REST API)
- **Storage**: LocalStorage

---

## Testing Notes

- Tested cart functionality with and without authentication
- Verified dark mode persistence
- Tested product filtering by category
- Verified favorite toggle functionality
- Tested responsive design on mobile/tablet/desktop
- Verified image lightbox navigation with keyboard support

---

## Future Enhancements

1. Backend authentication integration
2. Payment gateway integration (Stripe/PayPal)
3. User profile management
4. Order tracking system
5. Product reviews and ratings
6. Wishlist sharing
7. Real-time notifications
8. Admin dashboard
9. Product inventory management
10. Advanced search with filters

