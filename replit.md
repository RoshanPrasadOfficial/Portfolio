# Roshan Kumar Portfolio

## Overview

This is a personal portfolio website for Roshan Kumar, a web developer. The site showcases projects, skills, and provides contact information. It's built as a static website served through a minimal Flask backend, featuring a dark/light theme toggle and responsive design.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static HTML/CSS/JavaScript Site**
- Single-page application pattern with section-based navigation
- Bootstrap framework (dark theme variant) for responsive grid and components
- Custom CSS with CSS variables for theming support
- Vanilla JavaScript for interactivity (no frontend framework)

**Key Frontend Features:**
- Dark/light mode toggle with localStorage persistence
- Smooth scrolling navigation
- Font Awesome icons for visual elements
- Google Fonts (Inter) for typography

### Backend Architecture

**Minimal Flask Server**
- Purpose: Serves static files only, no API endpoints
- Routes: Root path serves index.html, all other paths serve static assets
- Running on port 5000

**Design Decision Rationale:**
- Chose Flask over a pure static file server to allow future expansion (contact forms, dynamic content)
- Minimal footprint with just file serving keeps the application simple

### File Structure

```
/
├── index.html          # Main HTML file
├── main.py             # Flask server
├── css/styles.css      # Custom styles
├── js/main.js          # Client-side JavaScript
└── assets/             # Static assets (resume, images)
```

## External Dependencies

### CDN Resources
- **Bootstrap** (Dark Theme): `cdn.replit.com/agent/bootstrap-agent-dark-theme.min.css` - UI framework
- **Font Awesome 6.4.0**: Icon library via cdnjs
- **Google Fonts**: Inter font family

### Backend Dependencies
- **Flask**: Python web framework for serving static files

### Browser APIs Used
- localStorage: Theme preference persistence
- Smooth scroll behavior