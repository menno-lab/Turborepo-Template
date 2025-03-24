# Turborepo + Drizzle + tRPC + shadcn/ui + Better-Auth Template

A batteries-included template for building modern full-stack web applications with the latest technologies.

## 🚀 Features

- **[Turborepo](https://turbo.build/)** - High-performance build system for JavaScript/TypeScript monorepos
- **[Better-Auth](https://better-auth.com/)** - Secure, flexible authentication solution
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible React components built with Radix UI and Tailwind CSS
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[tRPC](https://trpc.io/)** - End-to-end typesafe APIs made easy
- **[Next.js 15](https://nextjs.org/)** - The React Framework for the Web with React 19
- **[Drizzle](https://orm.drizzle.team/)** - TypeScript ORM for PostgreSQL

## 🛠️ Getting Started

1. Use this template to create a new repository.

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your environment variables:

   ```bash
   cp apps/web/.env.example apps/web/.env.local
   ```

4. Start the database:

   ```bash
   docker compose up db -d
   ```

5. Run the migrations:

   ```bash
   pnpm db:push
   ```

6. Start the development server:

   ```bash
   pnpm dev
   ```

## 📦 Project Structure

├── apps
│ └── web # Next.js application
├── packages
│ ├── api # tRPC API routes
│ ├── db # Database schemas and utilities
│ └── ui # Shared UI components
├── tooling
│ ├── eslint-config # ESLint configuration
│ ├── typescript-config # TypeScript configuration
└── package.json

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Better-Auth Documentation](https://www.better-auth.com/docs/)
- [Turborepo Handbook](https://turbo.build/repo/docs)
- [tRPC Documentation](https://trpc.io/docs)
- [Drizzle Documentation](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
