# FI2 Student Committee Website

Official website for the Faculty of Information II Student Committee at Lebanese University.

## Features

- **Modern Design System**: Custom emerald & gold color palette with atmospheric backgrounds
- **Distinctive Typography**: Syne headings, DM Sans body text, IBM Plex Arabic support
- **Responsive Layout**: Mobile-first design with fixed sidebar (desktop) and hamburger menu (mobile)
- **Dynamic Pages**:
  - Home page with quick links and program showcase
  - Previous Exams with advanced filtering system (major, year, semester, exam type)
  - Entrance Exams archive with downloadable PDFs
  - About Us with president information
  - Contact form
  - Faculty Rules with accordion interface
  - Contract Sheets for all programs
  - News & Events grid

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Fonts**: Google Fonts (Syne, DM Sans, IBM Plex Sans Arabic)

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
fi2-website/
├── src/
│   ├── app/                    # Next.js pages and layouts
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Design system CSS
│   │   ├── about/
│   │   ├── rules/
│   │   ├── entrance-exams/
│   │   ├── previous-exams/     # Filterable exam archive
│   │   ├── contract-sheets/
│   │   ├── news/
│   │   └── contact/
│   │
│   ├── components/
│   │   ├── layout/             # Sidebar, MobileNav, Footer
│   │   ├── ui/                 # Reusable UI components
│   │   └── sections/           # Page-specific sections
│   │
│   ├── data/                   # Data files and constants
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript type definitions
│
├── public/                     # Static assets
│   ├── images/
│   └── documents/
│
├── tailwind.config.ts          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
└── package.json
```

## Design System

### Colors

- **Primary (Emerald)**: `#0D5C46` - Faculty brand color
- **Accent (Gold)**: `#D4A853` - Highlights and CTAs
- **Neutrals**: Warm gray tones for balanced aesthetics

### Typography

- **Headings**: Syne (600, 700, 800)
- **Body**: DM Sans (400, 500, 600, 700)
- **Arabic**: IBM Plex Sans Arabic (400, 500, 600, 700)

### Components

All components follow the design system and include:
- Consistent spacing (8px base scale)
- Smooth transitions and hover states
- Accessible keyboard navigation
- RTL support for Arabic content
- Mobile-optimized touch targets (44px+)

## Key Features

### Previous Exams Filter System

The priority feature allowing students to filter exams by:
- Major (Journalism, PR, Marketing, Info Management, Data Science, Common)
- Year Level (1, 2, 3, Master 1, Master 2)
- Semester (Fall, Spring)
- Academic Year
- Exam Type (Midterm, Final, Quiz)

Includes search functionality and responsive table/card views.

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators
- Color contrast compliance (4.5:1 minimum)
- Reduced motion support

## Deployment

### Vercel (Recommended)

```bash
vercel --prod
```

### Other Platforms

The project can be deployed to any platform supporting Next.js 14:
- Netlify
- AWS Amplify
- Azure Static Web Apps

## Content Management

To add or update content:

1. **Exams**: Edit `src/data/previousExams.ts` and `src/data/entranceExams.ts`
2. **Programs**: Update `src/data/majors.ts`
3. **Presidents**: Modify `src/data/presidents.ts`
4. **Navigation**: Edit `src/data/navigation.ts`
5. **PDFs**: Place files in `public/documents/` directory

## License

© 2024 FI2 Student Committee. All rights reserved.

## Support

For issues or questions, contact the FI2 Student Committee at committee@fi2.ul.edu.lb
