# SBAL System

A comprehensive blockchain-based system built with React, Vite, and Web3 technologies. This application provides user management, transaction history tracking, and Web3 wallet integration.

## 🚀 Features

- **React 19** with Vite for fast development and optimized builds
- **Web3 Integration** using Wagmi, Viem, and Web3.js
- **Wallet Connection** via Reown AppKit for seamless blockchain interactions
- **Internationalization (i18n)** with multi-language support
- **User Management** with context-based state management
- **Transaction History** tracking and display
- **Responsive UI** built with TailwindCSS and Lucide icons
- **Backend API** integration with Axios and React Query
- **Dark/Light Theme** support with ThemeContext

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone 
cd bst-sbal-system
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Update `.env` with your configuration:
```
VITE_API_BASE_URL=<your-api-url>
VITE_API_BASE_URL_USER=<your-api-url>
```

## 📦 Available Scripts

- **`npm run dev`** - Start development server with Vite HMR
- **`npm run build`** - Build for production
- **`npm start`** - Start backend server
- **`npm run lint`** - Run ESLint checks
- **`npm run preview`** - Preview production build locally

## 🏗️ Project Structure

```
src/
├── components/        # Reusable React components
├── pages/            # Page components
├── services/         # API and external service integrations
├── hooks/            # Custom React hooks
├── abi/              # Smart contract ABIs
├── config/           # Configuration files
├── App.jsx           # Main App component
├── UserContext.jsx   # User state management
├── ThemeContext.jsx  # Theme state management
├── i18n.js          # Internationalization setup
└── main.jsx         # Application entry point

backend/             # Node.js backend server
public/              # Static assets
```

## 🔗 Web3 Integration

The application uses:
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **Reown AppKit** - Multi-chain wallet connection
- **Web3.js** - Web3 utilities

### Connecting a Wallet

Users can connect their Web3 wallet through the Reown AppKit integration, enabling blockchain interactions and transaction management.

## 🌐 Internationalization

The app supports multiple languages using i18n. Language detection is automatic based on browser settings, with fallback to English.

## 🎨 Styling

- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Icons** - Additional icon set
- **Framer Motion** - Animation library

## 📡 API Integration

The application communicates with a backend API using:
- **Axios** - HTTP client
- **React Query** - Data fetching and caching

## 🧪 Code Quality

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for pre-commit checks

## 🚀 Deployment

### Netlify
The project includes `netlify.toml` configuration for Netlify deployment.

### Render
The project includes `render.yaml` configuration for Render deployment.

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_API_BASE_URL` | Primary API base URL |
| `VITE_API_BASE_URL_USER` | User API endpoint (default: https://sbal-system.onrender.com/api) |

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check code quality
4. Commit your changes with Husky pre-commit hooks
5. Push and create a pull request

## 📄 License

This project is private and proprietary.

## 📞 Support

For issues or questions, please contact the development team.
