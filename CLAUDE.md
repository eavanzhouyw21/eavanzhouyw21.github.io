# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

This is a static HTML portfolio website with no build process. To develop locally:

```bash
# Start local development server
python3 -m http.server 3000
# or alternatively:
python -m http.server 3000

# Visit http://localhost:3000 to view the site
```

## Site Architecture

### Core Structure
- **Static HTML site** with 8 pages total
- **Single CSS file** (`styles.css`) - mobile-first responsive design
- **Single JavaScript file** (`script.js`) - vanilla JS for interactive features
- **No build process** - direct file editing and browser refresh

### Page Structure
- `index.html` - Homepage with hero carousel and featured projects
- `projects.html` - Project gallery overview page  
- `about.html` - Personal bio and contact information
- `hardspace-shipbreaker.html` - Project detail page
- `mad-surgeons.html` - Project detail page
- `together-be-different.html` - Project detail page
- `eldritch-afflictions.html` - Project detail page
- `goose-game.html` - Project detail page

### Asset Organization
```
assets/
├── images/
│   ├── carousel/ - Hero carousel images (5 images)
│   ├── eldritch/ - Eldritch Afflictions game assets
│   ├── goose-game/ - Goose Game sprites and UI
│   ├── hardspace/ - Hardspace board game components
│   ├── mad-surgeons/ - Mad Surgeons card designs
│   ├── tbd/ - Together Be Different materials
│   └── *-preview.* - Project preview images for cards
├── documents/ - PDF rulebooks and design documents (7 files)
└── videos/ - Gameplay and presentation videos (1 file, 2 deleted)
```

## Interactive Features

### JavaScript Components (`script.js`)
- **Mobile Navigation**: Hamburger menu with animated bars
- **Hero Carousel**: Auto-advancing image carousel with manual controls
- **Image Galleries**: Lightbox system for project detail pages
- **Smooth Scrolling**: Anchor link navigation

### Carousel System
- 5 slides featuring actual game projects
- Auto-advances every 5 seconds
- Pauses on hover and tab visibility
- Navigation: arrows, dots, keyboard, touch/swipe
- Located on homepage hero section

### Navigation Pattern
All pages share identical navigation structure:
- Fixed header with backdrop blur effect
- Mobile hamburger menu with animated bars
- Active page highlighting in navigation

## Content Management

### Adding New Projects
1. Create new HTML file following existing project page template
2. Add project preview image to `assets/images/`
3. Add project assets to appropriate subfolder in `assets/images/`
4. Update navigation links in all HTML files
5. Add project card to `index.html` and `projects.html`

### Image Requirements
- **Preview images**: 300x200px for project cards
- **Hero carousel**: 800x400px landscape format
- **Gallery images**: Variable sizes, optimized for web

### Project Page Template Structure
Each project detail page follows this pattern:
- Project hero section with gradient background
- Project metadata (type, duration, tools)
- Detailed description sections
- Image galleries with lightbox functionality
- PDF/video download links
- Project navigation (previous/next)

## Technical Notes

### CSS Architecture
- Mobile-first responsive design
- CSS Grid for project layouts
- Flexbox for navigation and components
- CSS custom properties for consistent theming
- Backdrop filters for modern glass effects

### Browser Compatibility
- Modern browsers with CSS Grid support
- Backdrop filter support recommended
- Touch events for mobile carousel interaction
- Intersection Observer API for animations

### Performance Considerations
- Images should be optimized for web (PNG/JPG)
- Videos are referenced but may be large files
- Static assets are cached by browser
- No external dependencies or frameworks