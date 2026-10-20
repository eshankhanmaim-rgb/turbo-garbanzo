# 420 Services – static clone

A static, offline copy of https://420-services.net/ (Next.js/Turbopack build output), reorganized.

## Structure
```
index.html                 Homepage
*.html                     Top-level pages (shop, free, status, faq, about, contact, blog, guide, ...)
product/*.html             Product pages
product-category/*.html    Category pages
assets/css/                Stylesheets (beautified)
assets/js/                 Next.js/Turbopack chunks (original minified, unmodified except path rewrites)
assets/fonts/              Web fonts (woff2)
assets/images/             Images (root images, marken/, chars/, flags/, payments/, reviews/, anticheats/, base/)
assets/images/products/    Product images (from /api/product-images)
```

## Run
Asset URLs are root-absolute (`/assets/...`), so serve from this folder:
```
python3 -m http.server 8000
```
Then open http://localhost:8000/ . Opening files directly via file:// will not load assets.

## Notes
- Login, cart, checkout, forms and live data (status, stock, reviews API) are non-functional; no backends included.
- Discord/Telegram/YouTube links point to the external URLs.
- Images are served unoptimized (Next image optimizer disabled in the JS config).
