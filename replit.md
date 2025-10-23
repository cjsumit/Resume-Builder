# ResumeCraft - ATS-Friendly Resume Generator

## Overview
ResumeCraft is a modern, full-featured resume builder application that helps users create professional, ATS (Applicant Tracking System) compatible resumes. The application features a beautiful, responsive UI with real-time preview, multiple templates, smooth animations, and instant PDF download capability.

## Current State
The application is a comprehensive resume generator MVP with:
- Beautiful hero landing page with call-to-action
- Multi-step form builder with 6 sections (Personal Info, Experience, Education, Skills, Projects, Template)
- Real-time resume preview that updates as users type
- Two professional resume templates (Modern and Classic)
- PDF generation and download functionality
- Dark/Light theme support
- Fully responsive design (mobile, tablet, desktop)
- Auto-save to localStorage to prevent data loss
- Smooth scroll animations and transitions throughout
- ATS-optimized resume formatting

## Recent Changes (October 23, 2025)
- Implemented complete schema for resume data with TypeScript types
- Built all frontend components with exceptional UI/UX design:
  - Hero section with gradient background and feature highlights
  - Personal information form with icons and validation
  - Work experience form with dynamic add/edit/delete
  - Education form with GPA and description fields
  - Skills manager with tag-based interface
  - Projects form with technology tags
  - Template selector with preview cards
  - Resume preview component with two templates
- Configured design tokens in index.css (accent color: success green)
- Added custom scroll animations and transitions
- Integrated jsPDF and html2canvas for PDF generation
- Implemented theme toggle with localStorage persistence
- Created comprehensive responsive layouts

## User Preferences
- Clean, modern design with professional aesthetics
- ATS-compatible resume formatting (plain text, proper structure, no tables/graphics)
- Real-time preview for instant feedback
- Smooth animations and transitions for polished feel
- Mobile-first responsive design

## Project Architecture

### Frontend Structure
```
client/src/
├── components/
│   ├── theme-provider.tsx      # Dark/light mode context
│   ├── theme-toggle.tsx        # Theme switcher button
│   ├── hero-section.tsx        # Landing page hero
│   ├── personal-info-form.tsx  # Contact details form
│   ├── work-experience-form.tsx # Job history manager
│   ├── education-form.tsx      # Education history
│   ├── skills-form.tsx         # Skills tag manager
│   ├── projects-form.tsx       # Project portfolio
│   ├── template-selector.tsx   # Template chooser
│   └── resume-preview.tsx      # Live resume preview
├── hooks/
│   └── useResumeStore.ts       # Resume data state + localStorage
├── pages/
│   └── home.tsx                # Main application page
└── shared/
    └── schema.ts               # TypeScript types and Zod schemas
```

### Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI
- **Routing**: Wouter
- **Forms**: React Hook Form + Zod validation
- **PDF Generation**: jsPDF + html2canvas
- **State Management**: Custom hooks + localStorage
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React

### Key Features
1. **Multi-Step Form Builder**
   - 6 tabbed sections for organized data entry
   - Next/Previous navigation between sections
   - Real-time validation with helpful error messages
   - Auto-save to localStorage on every change

2. **Resume Templates**
   - Modern: Clean with accent colors and icons
   - Classic: Traditional centered layout
   - All templates are ATS-compatible (no graphics, proper text hierarchy)

3. **Dynamic Content Management**
   - Add/edit/delete multiple work experiences
   - Add/edit/delete multiple education entries
   - Tag-based skills management
   - Project portfolio with technology tags

4. **PDF Export**
   - High-quality PDF generation using html2canvas + jsPDF
   - Automatic filename based on user's name
   - Preserves formatting and layout

5. **Responsive Design**
   - Mobile: Single column with toggle for preview
   - Tablet: Optimized spacing and touch targets
   - Desktop: Side-by-side form and preview

6. **Theme Support**
   - Light and dark modes
   - Smooth transitions between themes
   - Persists preference to localStorage
   - Resume preview adapts to theme

### Data Model
Resume data includes:
- Personal Info: name, email, phone, location, website, LinkedIn, GitHub
- Professional Summary: brief career overview
- Work Experience: company, position, dates, location, description
- Education: institution, degree, field, dates, GPA, details
- Skills: array of skill strings
- Projects: name, description, technologies, URL, dates

### Storage Strategy
- Uses in-memory storage (localStorage) for data persistence
- Auto-saves on every form change
- No backend required for MVP
- Data persists across sessions

## Dependencies
- Core: react, react-dom, typescript, vite
- UI: @radix-ui/*, tailwindcss, lucide-react
- Forms: react-hook-form, @hookform/resolvers, zod
- PDF: jspdf, html2canvas
- Utils: nanoid (for unique IDs)

## Running the Project
The application runs with `npm run dev` which starts:
- Vite dev server on port 5000 (frontend)
- Express server (backend, minimal for this MVP)

## Next Phase Features (Future)
- User authentication and cloud storage
- Multiple resume template options
- AI-powered content suggestions
- Resume sharing via unique links
- Export to DOCX format
- Resume analytics and optimization tips
