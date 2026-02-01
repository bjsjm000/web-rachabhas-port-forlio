# 🚀 Portfolio Website - Rachabhas

A modern personal portfolio website built with Next.js 16, React 19, TypeScript, and Tailwind CSS, featuring smooth animations powered by Framer Motion.

## ✨ Key Features

- 🎨 **Modern UI** - Designed with Tailwind CSS and shadcn/ui components
- ⚡ **High Performance** - Built with Next.js 16 App Router and React Server Components
- 🎭 **Smooth Animations** - Framer Motion for page transitions and animations
- 🌙 **Dark/Light Mode** - Theme support with next-themes
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🔥 **React 19 Features** - Leverages the latest React features including React Compiler
- 📝 **TypeScript** - Type-safe development experience
- 🎯 **SEO Optimized** - Built with SEO best practices

## 🛠️ Tech Stack

### Core Technologies
- **Next.js 16.1.6** - React Framework
- **React 19.2.3** - UI Library
- **TypeScript 5** - Static Type Checking
- **Tailwind CSS 4.1.18** - Utility-first CSS Framework

### UI Components & Styling
- **shadcn/ui** - Re-usable components built with Radix UI
- **Framer Motion 12.29.2** - Animation library
- **Lucide React** - Icon library
- **next-themes** - Theme management
- **class-variance-authority** - Component variants
- **tailwind-merge** - Merge Tailwind classes

### Development Tools
- **ESLint** - Code linting
- **Autoprefixer** - CSS vendor prefixing
- **Babel React Compiler** - React 19 optimization

## 📁 Project Structure

```
├── public/               # Static assets
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (site)/      # Site routes
│   │   │   └── components/
│   │   │       ├── animated-link.tsx
│   │   │       ├── contact.tsx
│   │   │       ├── experience.tsx
│   │   │       ├── hero.tsx
│   │   │       ├── intro.tsx
│   │   │       ├── projects.tsx
│   │   │       ├── skills.tsx
│   │   │       └── route-transition.tsx
│   │   ├── layout.tsx   # Root layout
│   │   ├── page.tsx     # Home page
│   │   └── globals.css  # Global styles
│   ├── components/      # Reusable UI components
│   │   └── ui/          # shadcn/ui components
│   ├── data/            # Data files
│   │   └── resume.ts    # Resume/CV data
│   └── lib/             # Utility functions
│       └── utils.ts
├── components.json      # shadcn/ui configuration
├── next.config.ts       # Next.js configuration
├── tailwind.config.ts   # Tailwind configuration
└── tsconfig.json        # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Run Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
npm run build
npm run start
```

### Lint Code

```bash
npm run lint
```

## 📝 Customization

### Update Personal Information

Edit `src/data/resume.ts` to update:
- Personal information (name, title, etc.)
- Work experience
- Projects
- Skills
- Contact information

### Modify Components

Main components are located in `src/app/(site)/components/`:
- `hero.tsx` - Hero/Banner section
- `intro.tsx` - Introduction section
- `experience.tsx` - Work experience
- `projects.tsx` - Projects showcase
- `skills.tsx` - Skills section
- `contact.tsx` - Contact form

### Customize Theme and Styling

- **Global styles**: `src/app/globals.css`
- **Tailwind config**: `tailwind.config.ts`
- **Color scheme**: Modify CSS variables in `globals.css`

## 🎨 shadcn/ui Components

This project uses the following shadcn/ui components:
- Badge
- Button
- Input
- Textarea

Add new components with:

```bash
npx shadcn@latest add [component-name]
```

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy automatically

### Other Deployment Options

- **Netlify**: Supports Next.js deployments
- **Railway**: Supports Next.js applications
- **Cloudflare Pages**: Supports Next.js
- **Self-hosted**: Use `npm run build` and `npm run start`

## 📖 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://react.dev) - Learn React
- [Tailwind CSS](https://tailwindcss.com/docs) - Tailwind CSS documentation
- [Framer Motion](https://www.framer.com/motion/) - Animation library docs
- [shadcn/ui](https://ui.shadcn.com/) - Component library documentation

## 🤝 Contributing

If you find any issues or want to improve the project:
1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available for use.

## 👨‍💻 Developer

Developed by **Rachabhas**

---

⭐ If you like this project, don't forget to give it a star!
