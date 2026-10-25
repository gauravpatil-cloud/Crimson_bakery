# Crimson Bakers — Premium Website Demo

A premium, responsive React + Vite frontend concept for Crimson Bakers in Jalgaon. The design direction uses deep crimson/burgundy, warm cream, and champagne-gold accents, with editorial typography and cake photography.

## Features
- Responsive luxury-style landing page and mobile navigation
- Hero section, specialities, brand story, signature cakes, custom cake callout, portfolio, testimonial design, contact and footer
- Product category filters and search
- Wishlist / saved cakes
- Shopping bag with quantity controls and estimated total
- WhatsApp order and custom-cake enquiry links
- Instagram and Google Maps links
- Fresh remote stock photography from Unsplash (internet required for images)

## Run locally
Use Node.js 20 or 22.

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, normally `http://localhost:5173`.

## Production build
```bash
npm run build
npm run preview
```
Upload the `dist` folder to any static hosting provider. For Render Static Site, use build command `npm install && npm run build` and publish directory `dist`.

## Important before client launch
- This is a **frontend demo**, not a complete ecommerce backend.
- Product list and prices are demo content in `src/main.jsx`; edit the `products` array to change them.
- WhatsApp number and shop address are set near the top of `src/main.jsx`; verify these with the business owner before launch.
- Testimonial cards are illustrative layout examples and must be replaced with genuine, approved customer reviews.
- There is no admin dashboard or database in this frontend-only version. Admin cake uploads require a backend/API and image storage service.
- Product images load from Unsplash URLs, so an internet connection is needed for those photos. Replace with licensed/owner-approved images before production.
- A shopping bag creates an order enquiry in WhatsApp; it does not accept online payments or deduct inventory.

## Suggested AI image prompts
Use these prompts to generate original, consistent brand photography and replace the remote image URLs:
1. **Hero:** “Ultra-premium editorial food photograph of a glossy dark chocolate ganache celebration cake with fresh raspberries and blueberries on a brushed champagne-gold stand, deep oxblood burgundy studio backdrop, dramatic warm side lighting, elegant negative space on left for website headline, luxury patisserie campaign, photorealistic, no text, no watermark, landscape 16:9.”
2. **Signature cake collection:** “High-end bakery catalogue photography, elegant red velvet layer cake with neat cream layers and fresh berries, warm ivory background, soft natural window light, fine-dining styling, photorealistic, no text, no watermark, portrait 4:5.”
3. **Bakery interior:** “Boutique premium bakery interior with warm brass lighting, dark burgundy signage, cream marble counters, glass pastry displays, sophisticated contemporary Indian patisserie, inviting golden-hour ambience, photorealistic architectural photography, no readable text, no watermark, landscape 16:9.”
4. **Custom celebration cake:** “Elegant bespoke white buttercream celebration cake with delicate edible flowers and seasonal berries, satin blush fabric and warm cream backdrop, luxury wedding editorial, photorealistic food photography, no text, no watermark, landscape 16:9.”
