# Dia Assist - Project Flow & Architecture Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Concepts & Architecture](#core-concepts--architecture)
5. [File-by-File Explanation](#file-by-file-explanation)
6. [Data Flow](#data-flow)
7. [User Journey](#user-journey)

---

## Project Overview

**Dia Assist** is a modern web application designed to help users predict and manage diabetes risk through an interactive, secure, and responsive interface. The application combines machine learning predictions with personalized health tracking, diet recommendations, and educational chatbot assistance.

### Key Features
- ✅ **User Authentication** - Secure login/register with JWT tokens
- ✅ **Diabetes Risk Prediction** - ML-based prediction with explanations
- ✅ **Health Dashboard** - Visual graphs of checkup history
- ✅ **Diet Planning** - Personalized diet recommendations
- ✅ **Prediction History** - Track all past predictions
- ✅ **AI Chatbot** - Real-time health advice and Q&A
- ✅ **Mobile Responsive** - Hamburger menu, optimized for all devices
- ✅ **Data Persistence** - localStorage for offline support

### Target Users
- Individuals concerned about diabetes risk
- Healthcare enthusiasts wanting to monitor their health
- Patients under medical supervision seeking diet guidance

---

## Technology Stack

### Frontend Framework
- **React 18** - Component-based UI with hooks
- **TypeScript** - Type-safe JavaScript for larger projects
- **React Router v6** - Client-side routing and navigation

### State Management
- **Context API** - Global authentication state (replaces Redux for simplicity)
- **useState/useEffect** - Local component state management

### HTTP & APIs
- **Axios** - HTTP client with interceptors for centralized error handling
- **JWT Authentication** - Token-based auth with localStorage persistence

### UI & Visualization
- **Recharts** - Interactive line charts for health metrics
- **Lucide React** - Icon library for UI elements
- **Bootstrap 5** - Utility classes for responsive grid layout
- **CSS3** - Custom responsive design with media queries

### Build Tools
- **Vite** - Lightning-fast build tool and dev server
- **ESLint** - Code quality and consistency
- **TypeScript Compiler** - Type checking

### Backend Integration
- **Django REST API** - Backend server handling predictions, auth, data storage
- **Docker** - Container for running backend services

---

## Project Structure

```
frontend-Dia-assist/
├── public/                          # Static assets (favicons, etc.)
├── src/
│   ├── api/                         # HTTP client & API configuration
│   │   ├── authApi.ts               # Auth endpoints (login, register)
│   │   └── axiosConfig.ts           # Axios instance with interceptors
│   ├── auth/                        # Authentication logic
│   │   ├── AuthContext.tsx          # Global auth state (Context API)
│   │   └── ProtectedRoute.tsx       # Route protection wrapper
│   ├── global/                      # Globally used components
│   │   └── components/
│   │       ├── Modal.tsx            # Reusable modal component
│   │       ├── header/
│   │       │   ├── Header.tsx       # Navigation bar with auth
│   │       │   └── Header.css       # Header responsive styles
│   │       └── Chat bot/
│   │           ├── Chatbot.tsx      # Floating chatbot UI
│   │           ├── Chatbot.css      # Chatbot styles
│   │           └── types.ts         # Chatbot TypeScript types
│   ├── lib/                         # Utility libraries
│   │   └── mockDietPlans.ts         # Mock diet data for development
│   ├── pages/                       # Page components (routed)
│   │   ├── Footer.tsx               # Global footer
│   │   ├── auth/
│   │   │   ├── Login.tsx            # Login form with validation
│   │   │   ├── Register.tsx         # Registration form
│   │   │   └── auth.css             # Auth page styles
│   │   ├── dashboard/
│   │   │   ├── index.tsx            # Dashboard main page
│   │   │   └── components/
│   │   │       ├── Dashboard.tsx    # Dashboard layout
│   │   │       ├── Dashboard.css    # Dashboard responsive styles
│   │   │       ├── StatsCard.tsx    # Stat card component
│   │   │       ├── WeeklyChart.tsx  # Graph visualization component
│   │   │       └── types/           # TypeScript interfaces for dashboard
│   │   ├── diet/
│   │   │   ├── index.tsx            # Diet page main
│   │   │   └── components/
│   │   │       ├── Diet.tsx         # Diet layout
│   │   │       ├── DietPlanCard.tsx # Individual diet card
│   │   │       ├── Diet.css         # Diet styles
│   │   │       └── DietPlanCard.css # Diet card styles
│   │   ├── history/
│   │   │   ├── index.tsx            # History page main
│   │   │   └── components/
│   │   │       ├── History.tsx      # Prediction history table
│   │   │       └── History.css      # History table styles
│   │   ├── home/
│   │   │   ├── index.tsx            # Home page main
│   │   │   └── components/
│   │   │       ├── HeroSection.tsx  # Hero banner with CTA
│   │   │       ├── HeroSection.css  # Hero styles
│   │   │       ├── Works.tsx        # How it works section
│   │   │       └── Works.css        # Works section styles
│   │   ├── predict/
│   │   │   ├── index.tsx            # Predict page main
│   │   │   └── components/
│   │   │       ├── predictform.tsx  # Prediction form component
│   │   │       └── predictform.css  # Form styles
│   │   └── signup/                  # Legacy signup (optional)
│   ├── routes/
│   │   └── AppRoutes.tsx            # Route definitions (React Router)
│   ├── util/
│   │   └── mapDietPlan.tsx          # Diet data mapping utility
│   ├── App.tsx                      # Root component
│   ├── App.css                      # Global app styles
│   ├── index.css                    # Global CSS resets
│   └── main.tsx                     # React DOM render entry point
├── eslint.config.js                 # ESLint rules for code quality
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & npm scripts
├── tsconfig.json                    # TypeScript configuration
├── tsconfig.app.json                # App-specific TypeScript config
├── tsconfig.node.json               # Node-specific TypeScript config
├── vite.config.ts                   # Vite build configuration
└── README.md                        # Project documentation
```

---

## Core Concepts & Architecture

### 1. **Context API Pattern (State Management)**

**What it is:** A React feature for passing data through component tree without prop drilling.

**Why it's used:** 
- Centralized authentication state (user, token, isAuthenticated)
- Avoids passing props through 10+ levels of components
- Single source of truth for auth state across app

**Where it's used:** `AuthContext.tsx`

**Example:**
```tsx
// Create context at top level
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider wraps entire app in App.tsx
<AuthContext.Provider value={{ user, isAuthenticated, logout, ... }}>
  {children}
</AuthContext.Provider>

// Any component can access it
const { isAuthenticated, user } = useContext(AuthContext);
```

---

### 2. **Protected Routes Pattern**

**What it is:** Routes that require authentication to access.

**Why it's used:**
- Prevent unauthorized access to sensitive pages (dashboard, predict, diet)
- Redirect unauthenticated users to login
- Show loading spinner while checking auth status

**Where it's used:** `ProtectedRoute.tsx`

**Example:**
```tsx
<Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} path="/dashboard" />
```

**Flow:**
1. User tries to access `/dashboard`
2. ProtectedRoute checks AuthContext
3. If not authenticated → redirect to "/"
4. If authenticated → render Dashboard
5. While checking → show loading spinner

---

### 3. **JWT Authentication & Token Management**

**What it is:** JSON Web Tokens for stateless authentication.

**Why it's used:**
- Secure token-based auth (not session-based)
- Backend can verify token without database lookup
- Tokens contain user info (id, email) without separate request

**How it works:**
1. User logs in with email/password
2. Backend returns: `{ user: { id, email, name }, token }`
3. Frontend stores token in localStorage
4. Every API request includes: `Authorization: Bearer {token}`
5. Token expires after 24 hours

**Token Expiry Tracking:**
```tsx
// Store expiry time on login
const tokenExpiry = new Date();
tokenExpiry.setHours(tokenExpiry.getHours() + 24);
localStorage.setItem("tokenExpiry", tokenExpiry.toISOString());

// Check on app load
const expiry = new Date(localStorage.getItem("tokenExpiry"));
if (new Date() > expiry) {
  logout(); // Token expired
}
```

---

### 4. **Axios Interceptors (HTTP Error Handling)**

**What it is:** Middleware that automatically processes every HTTP request/response.

**Why it's used:**
- Centralized error handling (401, 403, 429, timeout)
- Auto-inject Bearer token in every request
- Auto-logout on 401 (token expired)
- Rate limiting detection (429)
- User-friendly error messages

**Where it's used:** `axiosConfig.ts`

**Request Interceptor Flow:**
```
Request → Add Authorization header → Send to backend
```

**Response Interceptor Flow:**
```
Response → Check status code:
  - 401? → Logout & redirect
  - 403? → Permission denied message
  - 429? → Rate limit message
  - 5xx? → Server error message
  - Success? → Return data
```

---

### 5. **Component Composition Pattern**

**What it is:** Breaking UI into small, reusable components.

**Why it's used:**
- Easier to test and debug
- Reuse across pages (StatsCard, Modal, Header)
- Cleaner code structure
- Faster development

**Example Component Hierarchy:**
```
App (Root)
├── Header (Global)
├── Routes
│   ├── Home
│   │   ├── HeroSection
│   │   └── Works
│   ├── Dashboard
│   │   ├── StatsCard
│   │   └── WeeklyChart
│   └── Predict
│       └── PredictForm
├── Chatbot (Global)
└── Footer (Global)
```

---

### 6. **Responsive Design with Media Queries**

**Why it's used:**
- Mobile-first approach
- Same codebase for desktop, tablet, mobile
- Hamburger menu on mobile (instead of full nav)

**Breakpoints:**
- **Desktop:** >1024px - Full navbar with all links
- **Tablet:** 768px-1024px - Adjusted spacing
- **Mobile:** <768px - Hamburger menu, stacked layout
- **Small Mobile:** <480px - Minimal spacing

---

### 7. **localStorage for Data Persistence**

**What it is:** Browser storage API for saving data locally.

**Why it's used:**
- Persist auth tokens across page refreshes
- Keep prediction data when navigating away
- Offline support (data still available)
- Fast data retrieval (no API call needed)

**What's stored:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 12, "name": "John", "email": "john@example.com" },
  "tokenExpiry": "2025-12-22T10:30:00Z",
  "predictionData": { "result": "Non-Diabetic", "message": "..." }
}
```

---

### 8. **Custom Event System**

**What it is:** Browser's native event system for cross-component communication.

**Why it's used:**
- Allow Chatbot to open Login Modal from HeroSection
- Avoids complex prop drilling

**Example:**
```tsx
// Chatbot (on home page, unauthenticated)
window.dispatchEvent(new Event("openLoginModal"));

// HeroSection listens
useEffect(() => {
  window.addEventListener("openLoginModal", handleOpenLoginModal);
}, []);
```

---

## File-by-File Explanation

### **API Layer**

#### `src/api/axiosConfig.ts`
**Purpose:** Configure HTTP client with automatic error handling

**Key Features:**
- Creates axios instance with base URL
- Request interceptor: Adds Bearer token to all requests
- Response interceptor: Handles errors (401, 429, timeout, etc.)
- 10-second timeout for all requests

**Why TypeScript:** Type-safe HTTP responses, better IDE autocomplete

---

#### `src/api/authApi.ts`
**Purpose:** API functions for login and register

**Functions:**
- `loginUser(email, password)` → POST `/auth/login`
- `registerUser(name, email, password)` → POST `/auth/register`

**Why separate file:** Keeps API calls organized, reusable across components

---

### **Authentication**

#### `src/auth/AuthContext.tsx`
**Purpose:** Global auth state management

**Provides:**
- `isAuthenticated` - Boolean if user logged in
- `user` - User object (id, name, email)
- `loading` - Loading state during auth check
- `error` - Error message if auth failed
- `logout()` - Clear auth state
- `setUser()` - Update user data
- `clearError()` - Clear error message

**Why Context API:** Better than Redux for this simple use case (one auth state)

**localStorage Hydration:**
- On app load, restores token & user from localStorage
- Checks if token expired
- Auto-logout if expired

---

#### `src/auth/ProtectedRoute.tsx`
**Purpose:** Wrapper component for protected routes

**Logic:**
1. Check if user is authenticated
2. If loading → show spinner
3. If not authenticated → redirect to "/"
4. If authenticated → render child component

**Why TypeScript `ReactNode`:** Accept any React component as child

---

### **Global Components**

#### `src/global/components/Modal.tsx`
**Purpose:** Reusable modal dialog

**Props:**
- `isOpen` - Show/hide modal
- `onClose` - Callback when closing
- `children` - Modal content

**Why separate component:** Used for login, register, and future modals

**Features:**
- Overlay backdrop for clicking outside to close
- Z-index layering to appear above everything
- Smooth fade animation

---

#### `src/global/components/header/Header.tsx`
**Purpose:** Navigation bar with authentication

**Components:**
- Logo with home navigation
- Nav links (Home, Dashboard, Predict, Diet, History)
- Hamburger menu (mobile only)
- Auth buttons (Sign In/Sign Out)
- Profile dropdown with user info

**Authentication Logic:**
- Protected navigation: If not logged in, open login modal
- Profile dropdown shows user name/email
- Logout button clears auth state

**Mobile Features:**
- Hamburger button appears at <768px
- Menu slides in from left with animation
- Closes automatically after navigation
- Closes when clicking outside

---

#### `src/global/components/Chat bot/Chatbot.tsx`
**Purpose:** Floating AI chatbot visible on all pages

**Behavior:**
- Toggles between collapsed and open states
- Shows chat history
- Has input field for user messages
- On home (unauthenticated): Dispatches "openLoginModal" event
- On protected pages (unauthenticated): Redirects to home

**API:** POST `/api/chat` with message and userId

**Why floating:** Always accessible, doesn't block content

---

### **Pages & Components**

#### `src/pages/home/components/HeroSection.tsx`
**Purpose:** Marketing banner at top of home page

**Features:**
- Hero image/banner
- Call-to-action buttons (Predict, Dashboard)
- Listens for "openLoginModal" custom event
- Protected navigation with login redirect

**Why separate component:** Cleaner home page, easier to update marketing copy

---

#### `src/pages/home/components/Works.tsx`
**Purpose:** "How it works" educational section

**Content:**
- Step-by-step guide to using app
- Images/icons explaining process
- Benefits of using Dia Assist

**Educational Value:** Helps new users understand features

---

#### `src/pages/auth/Login.tsx`
**Purpose:** User login form

**Features:**
- Email validation (RFC 5322 regex)
- Password input with show/hide toggle
- Field-level error messages
- HTTP error handling (401 invalid creds, 429 rate limit, timeout)
- Auto-error clear after 5 seconds
- localStorage persistence of token & user
- 24-hour token expiry calculation

**Validation:**
```tsx
// Email regex: matches valid email formats
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password shown as dots
<input type="password" />
```

**Backend Response Format:**
```json
{
  "user": {
    "id": 12,
    "email": "user@example.com",
    "name": "John Doe"
  },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

---

#### `src/pages/auth/Register.tsx`
**Purpose:** User registration form

**Fields:**
- Name (2-50 characters)
- Email (must be valid format)
- Password (min 8 chars, uppercase, number, special char)
- Confirm Password (must match)

**Success Flow:**
- Show confirmation screen
- Auto-redirect to home after 2.5 seconds

**Why validation:** Prevent weak accounts, improve UX

---

#### `src/pages/dashboard/components/Dashboard.tsx`
**Purpose:** User dashboard showing health overview

**Components:**
- Header with date
- StatsCard for key metrics (Age, BMI, etc.)
- WeeklyChart for checkup history visualization

**Why separate component:** Cleaner index.tsx, easier to test

---

#### `src/pages/dashboard/components/StatsCard.tsx`
**Purpose:** Display individual metric in card format

**Props:**
- `icon` - Icon component
- `title` - Metric name
- `value` - Metric value
- `unit` - Unit of measurement

**Why component:** Reusable for multiple metrics

---

#### `src/pages/dashboard/components/WeeklyChart.tsx`
**Purpose:** Visualize user's health checkup history

**Features:**
- Fetches data from `/graph/last-checks/{userId}`
- Auto-detects all numeric columns in response
- Creates line for each metric with different colors
- X-axis: checkup dates
- Y-axis: metric values
- Error handling for 403, 404, 500, network errors

**Why Recharts:**
- Beautiful responsive charts
- Interactive tooltips on hover
- Smooth animations
- Multiple line support

**Data Flow:**
1. Component mounts
2. Gets userId from AuthContext
3. Calls API with userId
4. Transforms response data
5. Renders chart with all numeric metrics

---

#### `src/pages/predict/components/predictform.tsx`
**Purpose:** ML prediction form for diabetes risk

**Fields:**
- Age (1-120)
- Glucose level
- Blood Pressure
- Insulin level
- BMI
- Pregnancy count
- Diabetes Pedigree Function

**Features:**
- Form validation (all required, age in range)
- Calls API: POST `/prediction`
- Stores response in localStorage
- Displays result: "Diabetic" or "Non-Diabetic"
- Shows `why_this_result` explanation from backend

**Why localStorage:**
- Data persists if user navigates away
- Can show same result when returning to page
- Offline access to last prediction

**Validation Pattern:**
```tsx
if (!email || !email.match(emailRegex)) {
  setErrors({ ...errors, email: "Invalid email" });
  return;
}
```

---

#### `src/pages/diet/components/Diet.tsx`
**Purpose:** Display personalized diet recommendations

**Features:**
- Cards for each diet plan
- Each card has name, description, benefits
- Call-to-action to follow plan

**Data Source:** `mockDietPlans.ts` (can be replaced with API call)

**Why component-based:** Easy to add, remove, or reorder plans

---

#### `src/pages/diet/components/DietPlanCard.tsx`
**Purpose:** Individual diet plan card

**Props:**
- `id` - Unique identifier
- `name` - Diet name
- `description` - What it is
- `benefits` - List of benefits
- `meals` - Sample meal suggestions

**Why separate component:** Reusable, easier to style

---

#### `src/pages/history/components/History.tsx`
**Purpose:** Show all past predictions

**Features:**
- Table with Date, Result, Glucose, BMI, HbA1c
- Badge colors for risk levels (Low/Medium/High)
- Fetches from `/prediction/history`
- Proper spacing to avoid header overlap

**Why table format:** Easy to scan many predictions at once

**Risk Level Badges:**
- Low risk: Green
- Medium risk: Yellow
- High risk: Red

---

### **Routes**

#### `src/routes/AppRoutes.tsx`
**Purpose:** Define all app routes using React Router v6

**Pattern:** Nested routes with layout

```tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route element={<ProtectedRoute><Dashboard /></ProtectedRoute>} path="/dashboard" />
</Routes>
```

**Why React Router:** 
- Handles URL-based navigation
- Browser history management
- Lazy loading with Suspense (optional)

---

### **Utilities**

#### `src/lib/mockDietPlans.ts`
**Purpose:** Mock diet data for development/demo

**Format:**
```tsx
[
  {
    id: 1,
    name: "Mediterranean Diet",
    description: "...",
    benefits: ["Heart healthy", "Low carb"],
    meals: ["Salad", "Fish", ...]
  }
]
```

**Why mock data:** 
- Develop without backend
- Demo to stakeholders
- Easy to swap with API call later

---

#### `src/util/mapDietPlan.tsx`
**Purpose:** Transform diet data from API format to component format

**Example:**
```tsx
// Before
{ id: 1, planName: "Med Diet", pros: ["..."], }

// After
{ id: 1, name: "Med Diet", benefits: ["..."], }
```

**Why utility function:** Keep components clean, reuse transformation logic

---

### **Styling**

#### CSS Architecture
**Pattern:** One CSS file per component + global styles

**Files:**
- `index.css` - Global resets (margins, fonts, colors)
- `App.css` - App-level styles
- Component `.css` - Page-specific styles

**Responsive Approach:**
```css
/* Desktop first */
.navbar { display: flex; gap: 35px; }

/* Tablet (1024px and below) */
@media (max-width: 1024px) {
  .navbar { padding: 15px 25px; }
}

/* Mobile (768px and below) */
@media (max-width: 768px) {
  .navbar { padding: 12px 15px; }
  .nav-links { display: none; }
}
```

**Z-index Layering:**
- 1: Base content
- 10: Logo
- 999: Mobile menu
- 1000: Header, Profile dropdown
- 1001: Hamburger button
- 3001: Auth modal (above everything)

---

## Data Flow

### **Authentication Flow**

```
User Input (Email/Password)
           ↓
    Validate Locally
           ↓
   POST /auth/login
           ↓
Backend Validates Credentials
           ↓
Return { user, token }
           ↓
Store in localStorage
           ↓
Update AuthContext
           ↓
Redirect to Dashboard
```

### **Protected Route Flow**

```
User navigates to /dashboard
           ↓
     ProtectedRoute checks AuthContext
           ↓
  Is authenticated? → Yes → Render Dashboard
           ↓ No
    Redirect to /
```

### **Prediction Flow**

```
User fills form
           ↓
     Validate inputs
           ↓
 POST /prediction with data
           ↓
 Backend runs ML model
           ↓
Return { result, message, why_this_result }
           ↓
Store in localStorage
           ↓
Display result with explanation
```

### **Dashboard Graph Flow**

```
User opens /dashboard
           ↓
   WeeklyChart mounts
           ↓
Get userId from AuthContext
           ↓
GET /graph/last-checks/{userId}
           ↓
Backend returns checkup array
           ↓
Auto-detect numeric columns
           ↓
Create line for each metric
           ↓
Render Recharts graph
```

### **Mobile Menu Flow**

```
User clicks hamburger button
           ↓
Toggle showMobileMenu state
           ↓
Nav links slide in with animation
           ↓
User clicks nav link
           ↓
Navigate & setShowMobileMenu(false)
           ↓
Menu slides out
```

---

## User Journey

### **Onboarding (New User)**

1. **Landing Page (`/`)**
   - View HeroSection with marketing copy
   - See Works section explaining features
   - Visit Chatbot for quick questions

2. **Sign Up (`/register`)**
   - Fill name, email, password
   - Backend validates & creates account
   - Show confirmation screen
   - Auto-redirect to home

3. **Log In (`/login`)**
   - Enter email & password
   - Get token + user data back
   - Store in localStorage
   - Redirect to dashboard

### **Active Usage**

4. **Dashboard (`/dashboard`)**
   - View previous checkup history
   - See stats cards
   - View graph of metrics over time

5. **Prediction (`/predict`)**
   - Fill health metrics form
   - Submit & get result
   - See explanation ("why_this_result")
   - Data persists in localStorage

6. **Diet Plans (`/diet`)**
   - Browse available diets
   - See benefits & meal suggestions
   - Follow personalized recommendations

7. **History (`/history`)**
   - View all past predictions
   - See trend of predictions
   - Check risk progression

### **Support**

8. **Chatbot (All pages)**
   - Ask health questions
   - Get AI responses
   - On home without auth: Opens login
   - On protected pages without auth: Redirects to home

### **Logout**

9. **Profile Dropdown**
   - Click avatar → Show profile info
   - Click "Sign Out" → Clear localStorage
   - Redirect to home
   - All protected routes blocked

---

## Key Design Decisions

### **Why Context API instead of Redux?**
- Smaller project scope (one auth state)
- Redux overhead not needed
- Built-in React feature (fewer dependencies)
- Easy to learn for team

### **Why TypeScript?**
- Catch errors at compile time, not runtime
- Better IDE autocomplete & refactoring
- Easier to onboard new developers
- Self-documenting code (interfaces)

### **Why localStorage over Sessions?**
- No backend session management needed
- Works offline
- Simpler architecture
- Sufficient for this use case

### **Why Axios over Fetch API?**
- Interceptors for automatic error handling
- Shorter syntax
- Better timeout handling
- Request/response transformation

### **Why Recharts over other libraries?**
- Beautiful default styling
- Responsive & mobile-friendly
- Good documentation
- Easy multi-line support

### **Why Hamburger menu on mobile?**
- Saves screen space
- Industry standard pattern
- Better mobile UX
- Smooth animations

---

## API Endpoints Summary

| Method | Endpoint | Purpose | Auth Required |
|--------|----------|---------|----------------|
| POST | `/auth/login` | User login | ❌ |
| POST | `/auth/register` | User signup | ❌ |
| POST | `/prediction` | Get diabetes prediction | ✅ |
| GET | `/graph/last-checks/{userId}` | Get checkup history | ✅ |
| GET | `/prediction/history` | Get all predictions | ✅ |
| GET | `/diet` | Get diet plans | ❌ |
| POST | `/api/chat` | Chatbot message | ✅ |

---

## Performance Optimizations

1. **Code Splitting** - Vite automatically splits chunks
2. **localStorage Caching** - Avoid repeated API calls
3. **useCallback** - Prevent unnecessary re-renders
4. **Image Optimization** - Use external CDN URLs
5. **CSS Minification** - Vite minifies in production

---

## Security Measures

1. **JWT Tokens** - Secure, stateless authentication
2. **HTTPS** - Encrypted data transmission (on production)
3. **24-hour expiry** - Automatic logout after 24 hours
4. **Axios Interceptors** - Auto-logout on 401 (invalid token)
5. **Protected Routes** - Prevent unauthorized page access
6. **Email Validation** - Prevent invalid accounts
7. **Password Requirements** - Enforce strong passwords
8. **localStorage Encryption** - Consider for production

---

## Future Enhancement Opportunities

1. **Push Notifications** - Remind users to check health metrics
2. **Data Export** - Download prediction history as PDF
3. **Social Sharing** - Share diet plans with friends
4. **Offline Mode** - Full PWA support
5. **Multi-language** - i18n for internationalization
6. **Dark Mode** - Toggle between light/dark theme
7. **WebSocket Chat** - Real-time chatbot updates
8. **Advanced Analytics** - Charts.js for more visualizations
9. **Email Notifications** - Send predictions via email
10. **2FA** - Two-factor authentication for security

---

## Project Statistics

- **Total Components:** 20+
- **Total Routes:** 7
- **API Endpoints:** 7
- **Responsive Breakpoints:** 3 (1024px, 768px, 480px)
- **Lines of Code:** ~3000+ (TypeScript + CSS)
- **External Dependencies:** ~15 (React, Router, Axios, etc.)

---

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview
```bash
npm run preview
```

---

## Conclusion

**Dia Assist** is a well-architected, scalable web application that demonstrates modern React development practices including:
- State management with Context API
- Protected routes with authentication
- Responsive mobile design
- Comprehensive error handling
- TypeScript for type safety
- Modular component architecture

The codebase is production-ready with proper separation of concerns, making it easy to maintain, test, and extend in the future.

---

*Last Updated: December 21, 2025*
*Project: Dia Assist - Diabetes Risk Prediction & Management*
