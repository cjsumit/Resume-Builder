# ATS-Friendly Resume Generator - Design Guidelines

## Design Approach

**Selected Framework:** Hybrid approach inspired by Canva, Notion, and Linear
- **Canva**: Clean interface for content creation with visual hierarchy
- **Notion**: Intuitive form handling and content organization
- **Linear**: Modern typography and purposeful micro-interactions
- **Justification**: Resume generators need professional credibility while remaining approachable and easy to use. The interface should feel powerful yet simple.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 224 71% 15% (Deep Navy Blue - professional, trustworthy)
- Background: 0 0% 100% (Pure White)
- Surface: 220 14% 96% (Light Gray - for cards/sections)
- Text Primary: 222 47% 11% (Dark Charcoal)
- Text Secondary: 215 16% 47% (Muted Gray)
- Accent: 142 71% 45% (Success Green - for download/complete actions)
- Border: 220 13% 91% (Subtle borders)

**Dark Mode:**
- Primary: 224 71% 45% (Vibrant Blue)
- Background: 222 47% 11% (Deep Charcoal)
- Surface: 217 33% 17% (Elevated Dark Gray)
- Text Primary: 210 40% 98% (Off-White)
- Text Secondary: 215 20% 65% (Muted Light Gray)
- Accent: 142 71% 55% (Bright Success Green)
- Border: 217 33% 24% (Subtle dark borders)

### B. Typography

**Font Families:**
- Primary: 'Inter' from Google Fonts (body text, forms, UI elements)
- Headings: 'Space Grotesk' from Google Fonts (section titles, headings)
- Resume Preview: 'Roboto' from Google Fonts (professional resume rendering)

**Scale:**
- Hero Title: text-5xl md:text-6xl font-bold
- Section Headers: text-3xl md:text-4xl font-bold
- Subsection Titles: text-xl md:text-2xl font-semibold
- Body: text-base leading-relaxed
- Small Print: text-sm

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16, 20 (p-4, m-6, gap-8, py-12, etc.)

**Container Strategy:**
- Maximum width: max-w-7xl for main content
- Form sections: max-w-4xl for optimal readability
- Resume preview: max-w-2xl (8.5x11 aspect ratio simulation)
- Padding: px-4 md:px-8 lg:px-12

**Grid System:**
- Desktop: Two-column layout (form left, live preview right)
- Tablet: Stacked with preview collapsible
- Mobile: Single column, preview accessible via toggle

### D. Component Library

**Navigation:**
- Fixed header with logo, navigation links, theme toggle
- Sticky progress indicator showing completion percentage
- Breadcrumb for multi-step form navigation

**Hero Section:**
- Full-width hero with gradient overlay (h-[70vh])
- Bold headline showcasing value proposition
- Subheadline explaining ATS-compatibility
- Primary CTA button "Create Resume" with subtle shadow
- Trust indicators (e.g., "100% ATS-Compatible", "Free Download")
- Background: Abstract geometric pattern or professional workspace image

**Form Components:**
- Sectioned accordion-style forms (Personal Info, Experience, Education, Skills)
- Clean input fields with floating labels
- Helper text for ATS optimization tips
- Real-time character count for summary sections
- Add/Remove buttons for dynamic entries (jobs, education)
- Template selector cards with preview thumbnails

**Resume Preview:**
- Real-time updating preview pane
- Professional template rendering
- Zoom controls (fit-to-screen, 100%, 125%)
- Download format selector (PDF, DOCX)
- Download button with icon (prominent, accent color)
- Print preview option

**Action Buttons:**
- Primary: Solid accent color with white text
- Secondary: Outline with primary color
- Download: Accent green with download icon
- Disabled states: Reduced opacity with cursor-not-allowed

**Cards:**
- Template cards: Rounded corners (rounded-xl), subtle shadow, hover lift effect
- Section cards: Background surface color, padding p-6, border subtle

### E. Animations & Transitions

**Page Load:**
- Hero content: Fade-in with slight upward motion (duration-700)
- Staggered appearance of form sections (delay-100, delay-200, etc.)

**Scroll Animations:**
- Sections fade in as they enter viewport (intersection observer)
- Progress bar fills smoothly based on form completion
- Resume preview updates with smooth transition (transition-all duration-300)

**Interactions:**
- Button hover: Scale 1.02, slight shadow increase (hover:scale-102 hover:shadow-lg)
- Input focus: Border color shift, subtle glow (ring-2 ring-primary)
- Template selection: Border highlight, scale effect
- Accordion expand/collapse: Smooth height transition (transition-all duration-300)
- Download button: Pulse animation on completion, confetti effect (optional celebration)

**Refresh/State Changes:**
- Form auto-save indicator: Gentle pulse animation
- Theme toggle: Smooth color transition (transition-colors duration-500)
- Template switch: Cross-fade effect (fade-out/fade-in)

## Images

**Hero Section:**
- Large background image (required): Professional workspace setup showing laptop with resume on screen, or abstract geometric pattern in primary colors
- Image treatment: Subtle gradient overlay (from primary color at 40% opacity) for text readability
- Position: Background, full-width, fixed or parallax scroll effect

**Template Previews:**
- Thumbnail images of each resume template (Classic, Modern, Minimal, Professional)
- Clean white backgrounds with actual resume preview
- Consistent sizing: aspect-w-8 aspect-h-11

**Trust/Social Proof:**
- Optional: Small icons for file format compatibility (PDF, DOCX icons)
- Checkmark icons for feature highlights (ATS-compatible, Free, Easy-to-use)

## Accessibility & Quality Standards

- Maintain WCAG AA contrast ratios (4.5:1 for text)
- Dark mode consistent across all form inputs and preview
- Keyboard navigation fully supported
- Screen reader labels for all interactive elements
- Focus indicators clearly visible
- Loading states for download generation
- Error states with helpful messaging

## Page Structure

1. **Navigation Bar** - Sticky header with branding and theme toggle
2. **Hero Section** - Compelling headline, CTA, background image
3. **Resume Builder Interface** - Split-screen: Form (left) + Live Preview (right)
4. **Template Selector** - Card grid showcasing available templates
5. **Features Section** - Three-column grid highlighting ATS compatibility, ease of use, free download
6. **Download Section** - Prominent download interface with format options
7. **Footer** - Links, social proof, copyright

This design delivers a professional, conversion-focused experience that guides users seamlessly from landing to downloading their ATS-optimized resume.