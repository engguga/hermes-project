# ⚡ Hermes Swiftech Engine

Named after the messenger of the gods, **Hermes** is a high-performance URL shortener and analytics engine. This project demonstrates a modern Full Stack architecture with high scalability and internationalization (i18n).

![Hermes Swiftech Dashboard](https://i.postimg.cc/yd7yNhhQ/Captura-de-tela-de-2026-01-04-16-57-43.png)

## 🌐 Live Demo
[View Project Live](https://seu-link-da-vercel.app)

## 🛠️ Tech Stack

- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate.
- **Frontend:** React, TypeScript, Vite, Tailwind CSS v4, i18next.
- **Database:** PostgreSQL (Neon.tech).
- **Icons:** Lucide React.

## 🚀 Key Engineering Features

- **Base62 Custom Encoding:** Advanced algorithm to transform database IDs into unique, compact short codes.
- **Root-Level Redirection:** Optimized URL structure for the shortest possible paths (e.g., `host/b`).
- **Global Reach (i18n):** Full support for English, Portuguese, and Spanish with automatic language detection.
- **Live Analytics:** Real-time click tracking and "Most Traveled Paths" dashboard.
- **Resilient UI:** Custom error handling and 404 "Path Lost" redirection for non-existent codes.

## 📂 Architecture

The system follows a clean separation of concerns:
1. **API Layer:** REST Controllers handling HTTP requests and redirections.
2. **Service Layer:** Business logic and encoding algorithms.
3. **Data Layer:** PostgreSQL persistence with optimized JPA queries.
4. **Client Layer:** Reactive UI with state management and context-aware translations.

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone [https://github.com/engguga/hermes-project.git](https://github.com/engguga/hermes-project.git)

## Developed with ⚡ by Gustavo Viana
