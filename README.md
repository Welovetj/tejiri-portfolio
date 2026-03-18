# Tejiri Portfolio

A static portfolio  with plain HTML, CSS, and JavaScript.

## Overview

The site is split into two primary pages:

- `index.html`: homepage with the intro screen, hero, about, interests, projects, and skills sections.
- `connect.html`: contact page with a configurable email form.

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript
- Lucide icons on the contact page

## Project Structure

- `index.html`, `index.css`, `index.js`: homepage markup, styles, and interactions.
- `connect.html`, `connect.css`, `connect.js`: contact page markup, styles, and form submission logic.
- `style.css`: shared layout, navigation, footer, and utility styles.
- `nav.js`: mobile navigation and reveal interactions.
- `slideshow.js`: slideshow behavior.
- `images/`: project and profile imagery.

## Running Locally

Because this is a static site, you can open `index.html` directly in a browser. For more reliable local testing, use a simple static server.

Examples:

- VS Code Live Server
- `npx serve .`
- `python -m http.server`

## Contact Form Setup

The contact form is wired for real network submission, but it requires a configured endpoint.

#