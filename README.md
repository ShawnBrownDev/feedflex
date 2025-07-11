# FeedFlex - Modern Social Media Platform

A full-featured social media application built with Next.js, TypeScript, and React. FeedFlex demonstrates modern web development practices, responsive design, and sophisticated user interaction patterns.

## 🚀 Live Demo

- **Local Development**: `http://localhost:3000`
- **Production Ready**: Optimized for deployment on Vercel

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Performance Optimizations](#performance-optimizations)
- [Development Highlights](#development-highlights)

## ✨ Features

### Core Functionality
- **Post Creation & Management** - Create, delete, and interact with posts
- **Real-time Feed System** - Dynamic "For You" and "Following" feeds with separate content
- **Retweet System** - Twitter-like repost functionality with proper attribution
- **User Following** - Complete follow/unfollow system with real-time updates
- **Interactive UI** - Like, comment, bookmark, and share functionality
- **Responsive Design** - Mobile-first approach with seamless desktop experience

### Advanced Features
- **Dual Feed Architecture** - Separate content streams for discovery and following
- **Dynamic User Database** - Simulated backend with 10+ detailed user profiles
- **Image Optimization** - Custom image handling with Next.js optimization
- **Theme System** - Light/dark mode toggle with system preference detection
- **Local Storage Persistence** - Client-side data persistence across sessions
- **Real-time UI Updates** - Instant feedback for all user interactions

## 🛠 Tech Stack

### Frontend
- **Next.js 15.3.5** - React framework with SSR/SSG capabilities
- **TypeScript** - Type-safe development with strict typing
- **React 18** - Modern React with hooks and concurrent features
- **CSS Modules** - Scoped styling with CSS-in-JS patterns

### Development Tools
- **ESLint** - Code quality and consistency enforcement
- **Next.js Image Optimization** - Automatic image optimization and lazy loading
- **Custom Hooks** - Reusable logic with React hooks pattern
- **Component Architecture** - Modular, reusable component design

### Data Management
- **Local Storage API** - Client-side data persistence
- **TypeScript Interfaces** - Strict type definitions for all data structures
- **Simulated Backend** - Mock database with realistic user data

## 🏗 Architecture

### Component Structure
```
components/
├── Avatar.tsx          # Smart avatar component with external image handling
├── Navigation.tsx      # Responsive navigation with theme toggle
├── Post.tsx           # Complex post component with interactions
├── PostComposer.tsx   # Rich text composer with image upload
├── PostImage.tsx      # Optimized image component
├── Sidebar.tsx        # Dynamic sidebar with user suggestions
└── ThemeToggle.tsx    # Theme switching functionality
```

### Data Layer
```
data/
├── users.ts           # User database with 10+ profiles
├── post.ts            # Post data structures and initial content
├── followingPosts.ts  # Curated following feed content
├── following.ts       # Following relationship management
├── navigation.ts      # Navigation menu configuration
└── sidebar.ts         # Sidebar content and suggestions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/feedflex.git
   cd feedflex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
```

## 📁 Project Structure

```
feedflex/
├── components/          # Reusable UI components
├── data/               # Mock database and type definitions
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   ├── _app.tsx       # App wrapper with theme provider
│   ├── _document.tsx  # HTML document structure
│   └── index.tsx      # Main feed page
├── public/            # Static assets
├── styles/            # CSS modules and global styles
├── next.config.ts     # Next.js configuration
├── tsconfig.json      # TypeScript configuration
└── eslint.config.mjs  # ESLint configuration
```

## 🔧 Key Components

### Post Component (`components/Post.tsx`)
- **Complex State Management** - Handles likes, reposts, bookmarks
- **Repost Attribution** - Proper display of original vs. reposted content
- **Interactive Menu** - Context-aware actions (delete for own posts)
- **Image Modal** - Full-screen image viewing
- **Responsive Design** - Mobile-optimized interactions

### Following System (`data/following.ts`)
- **Relationship Management** - Follow/unfollow functionality
- **Real-time Updates** - Instant UI feedback
- **Persistent Storage** - Maintains relationships across sessions
- **Type Safety** - Full TypeScript interface definitions

### Feed Architecture (`pages/index.tsx`)
- **Dual Feed System** - Separate "For You" and "Following" content
- **Tab Management** - Smooth switching between feed types
- **Content Filtering** - Dynamic post filtering based on relationships
- **Performance Optimized** - Efficient rendering and updates

## ⚡ Performance Optimizations

### Image Optimization
- **Next.js Image Component** - Automatic optimization and lazy loading
- **Custom Image Handlers** - Smart handling of external vs. local images
- **Responsive Images** - Automatic sizing based on device
- **External Image Support** - Optimized handling of third-party images

### Code Optimization
- **TypeScript Strict Mode** - Compile-time error prevention
- **CSS Modules** - Scoped styling prevents conflicts
- **Component Memoization** - Optimized re-rendering
- **Lazy Loading** - Efficient resource loading

### Data Management
- **Local Storage Optimization** - Efficient client-side persistence
- **State Management** - Optimized React state updates
- **Memory Management** - Proper cleanup and garbage collection

## 💡 Development Highlights

### Technical Achievements
- **Zero ESLint Warnings** - Clean, maintainable codebase
- **Full TypeScript Coverage** - Type-safe development
- **Responsive Design** - Mobile-first approach
- **Performance Optimized** - Fast loading and smooth interactions
- **Accessibility** - ARIA labels and semantic HTML

### Problem-Solving Examples
- **Image Optimization Challenges** - Solved Next.js external image configuration
- **State Management** - Complex interaction state handling
- **Data Persistence** - Client-side storage implementation
- **Component Reusability** - Modular, extensible architecture

### Code Quality
- **Consistent Naming** - Clear, descriptive variable and function names
- **Component Composition** - Reusable, composable components
- **Error Handling** - Graceful error states and fallbacks
- **Documentation** - Well-commented code and clear structure

## 🔮 Future Enhancements

- **Backend Integration** - REST API or GraphQL implementation
- **Real-time Updates** - WebSocket integration for live updates
- **Advanced Search** - Full-text search and filtering
- **Media Upload** - Enhanced image and video upload capabilities
- **Push Notifications** - Real-time notification system
- **Analytics Dashboard** - User engagement metrics

## 👨‍💻 Developer

**Shawn Brown** - Full Stack Developer
- Specialized in React, Next.js, and TypeScript
- Focus on performance optimization and user experience
- Experienced in modern web development practices

---

*This project demonstrates proficiency in modern web development technologies, complex state management, responsive design, and performance optimization. The codebase showcases clean architecture, type safety, and production-ready development practices.*
