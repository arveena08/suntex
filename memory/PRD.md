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
- Full 4-page React SPA with soft cream/teal theme
- 13 products across 6 categories with flash card display (API-driven from MongoDB)
- Product detail modals + Image lightbox with zoom for fabric textures
- Category filtering on Products page
- Contact form with POST /api/contact (MongoDB storage + mailto)
- Sticky glassmorphism navbar with mobile Sheet drawer
- Scroll reveal animations, Google Maps embed (Surat)
- Company logo, WhatsApp button (+91 93747 39016)
- About page with real company content (50+ years, Surat, Kavish Chopra)
- Decorative teal/gold border frame around viewport
- **Admin Dashboard** (login: admin@suntextraders.com / janvi123):
  - Contact message management (view, mark read/unread, delete, search)
  - Product management (add, edit, delete, search)
  - Stats overview (messages, products, categories)
- JWT authentication for admin routes
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
