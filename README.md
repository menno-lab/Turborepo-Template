# shadcn/ui monorepo template

This template is for creating a monorepo with shadcn/ui.

## Usage

```bash
pnpm dlx shadcn@latest init
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Tailwind

Your `tailwind.config.ts` and `globals.css` are already set up to use the components from the `ui` package.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@repo/ui/components/button";
```

// scx notes

- A CRM that focuses on giving the support agents the best experience
- while others companies are going full in on the AI hype, we are going to focus on the human experience
- Your customers want to talk to humans, not an ai bot.
- We only use AI to help the support agents, not to replace them.

# reddit saas post. The goal is to get users to try it out.

Title:

Support agent turned software engineer, I worked with most of the popular CRM's out there and they are all terrible.

I'm building a CRM that focuses on giving the support agents the best experience, because they are the ones that will use it the most.

## AI Rant

I don't like AI. All these large CRM companies are going full in on the AI hype, but they are missing the point. If you contact support, you want to talk to a human. Not an AI bot. No matter how good the AI is.

I'm still implementing some level of AI but only to help the support agents in their repetitive tasks.

## Free Plan

I'm giving away a free plan for 100 users. All I ask for in return is feedback.s
