🚀 React + TypeScript + Vite Starter
A modern React starter template powered by Vite, TypeScript, and ESLint with fast development experience, Hot Module Replacement (HMR), and scalable project structure.
✨ Features
⚡ Lightning-fast development with Vite
⚛️ React + TypeScript support
🔥 Hot Module Replacement (HMR)
🧹 ESLint configuration included
📦 Optimized build setup
🛠️ Easy to extend for production-grade apps
📦 Official React Plugins
This template supports the following official Vite React plugins:
1. @vitejs/plugin-react
Uses Babel (or oxc with rolldown-vite) for Fast Refresh.
npm install @vitejs/plugin-react
2. @vitejs/plugin-react-swc
Uses SWC for faster compilation and Fast Refresh.
npm install @vitejs/plugin-react-swc
🧠 React Compiler
The React Compiler is not enabled by default because it may affect development and build performance.
You can enable it later based on your project requirements.
🚀 Getting Started
Install Dependencies
npm install
Start Development Server
npm run dev
Build for Production
npm run build
Preview Production Build
npm run preview
📁 Project Structure
src/
 ├── assets/        # Images, icons, static files
 ├── components/    # Reusable UI components
 ├── pages/         # Application pages
 ├── App.tsx        # Main App component
 ├── main.tsx       # Entry point
 └── styles/        # Global styles
🧹 ESLint Configuration
For production applications, it is recommended to enable type-aware lint rules.
Update your eslint.config.js:
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      tseslint.configs.recommendedTypeChecked,

      // Optional stricter rules
      tseslint.configs.strictTypeChecked,

      // Optional stylistic rules
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
⚛️ React-Specific ESLint Rules
Install additional React linting plugins:
npm install eslint-plugin-react-x eslint-plugin-react-dom --save-dev
Update eslint.config.js:
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      reactX.configs['recommended-typescript'],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
])
🛠️ Recommended Extensions
ESLint
Prettier
Error Lens
Tailwind CSS IntelliSense (if using Tailwind)
📚 Tech Stack
React
TypeScript
Vite
ESLint
📄 License
This project is open-source and available under the MIT License.
