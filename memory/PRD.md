# Suntex Traders - PRD

## Problem Statement
Build a modern, responsive website for Suntex Traders, a textile wholesale company specializing in net fabrics, cancan, organza, viscose, georgette, and satin. Dark luxury theme with champagne gold accents.

## Architecture
- **Frontend**: React SPA with Tailwind CSS, Shadcn UI, React Router
- **Backend**: FastAPI with MongoDB (contact form storage)
- **Theme**: Dark obsidian (#0A0A0C) + Champagne Gold (#D4AF37)
- **Fonts**: Cormorant Garamond (headings), Outfit (body)

## User Personas
- Fashion designers browsing wholesale fabrics
- Garment manufacturers looking for bulk suppliers
- Boutique owners seeking variety and quality

## Core Requirements
- 4-page SPA: Home, About, Products, Contact
- Flash card product display with hover animations
- Category filtering (6 categories, 13 products)
- Product detail modals
- Contact form with backend API
- Sticky glass nav, mobile hamburger menu
- Scroll animations, Google Maps embed

## What's Been Implemented (April 2026)
- Full 4-page React SPA with dark luxury theme
- 13 products across 6 categories with flash card display
- Product detail modals (Shadcn Dialog)
- Category filter on Products page
- Contact form with POST /api/contact (MongoDB storage)
- Sticky glassmorphism navbar with mobile Sheet drawer
- Scroll reveal animations (Intersection Observer)
- Google Maps embed on Contact page (Surat, Gujarat)
- Footer with quick links and contact info
- Company logo integrated in navbar and footer
- About page with real company content (50+ years, Surat, Kavish Chopra)
- WhatsApp floating button for instant enquiries
- Fabric-accurate product images (net mesh, cancan tulle, organza sheer, etc.)
- All tests passing (100% backend + frontend)

## Prioritized Backlog
### P0 - Done
- All core pages and features implemented

### P1 - Next
- Add product search functionality
- WhatsApp integration for quick enquiries
- Image gallery/lightbox for product detail view

### P2 - Future
- Admin panel for managing products and contact messages
- Product catalog PDF download
- Multi-language support (Hindi)
- SEO optimization with dynamic meta tags
