# Target-LIBCA Frontend (React App)

A modern, single-page React application built with Vite. This frontend powers the Target-LIBCA library management system and includes pages for books, students, issuing records, and administration.

---

## 🚀 Features

- **React 18** with functional components and hooks
- **Vite** for fast development and build times
- **Tailwind CSS** for utility-first styling
- **ESLint** with recommended rules
- Client-side routing with protected routes
- Admin login, dashboard, sidebar, and multiple management pages

---

## 🧱 Tech Stack

| Area          | Technology                    |
| ------------- | ----------------------------- |
| Framework     | React (via Vite)              |
| Styling       | Tailwind CSS                 |
| Linter        | ESLint + Prettier            |
| State         | Local component state / Context |
| Routing       | React Router                 |
| Build Tool    | Vite                         |

---

## 🏁 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 16
- npm (bundled with Node) or yarn

> Optional: `npx create-vite@latest` was used originally to scaffold this app.

### Installation

```bash
# clone the repo (if not already)
git clone <repository-url>
cd React-app

# install dependencies
npm install
# or
# yarn install
```

### Available Scripts

From the project root directory, run:

```bash
npm run dev        # start development server on http://localhost:5173
npm run build      # bundle the app for production (output to dist/)
npm run preview    # preview the production build locally
npm run lint       # run ESLint on src/ folder
```

Scripts are defined in `package.json` and use [Vite lifecycle commands](https://vitejs.dev/guide/commands.html).

---

## 📁 Folder Structure

```
React-app/
├── public/              # static assets
├── src/                 # application source code
│   ├── assets/          # images, icons, etc.
│   ├── components/      # reusable UI components
│   │   ├── Pages/        # route-specific page components
│   │   ├── Layout.jsx
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   ├── App.jsx           # root component
│   ├── main.jsx          # entry point
│   └── store.jsx         # global state / utilities
├── tailwind.config.cjs
├── vite.config.js
└── package.json
```

> See individual components under `src/components` for implementation details like `AdminNavbar.jsx`, `ProtectedRoute.jsx`, etc.

---

## 🔧 Configuration

No environment variables are required by default, but you may configure API base URLs or other constants inside `src/store.jsx` or create a `.env` file if extending.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

Please follow existing code style and ensure linting passes.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Generated and maintained by the Target-LIBCA development team.*
