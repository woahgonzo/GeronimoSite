# Geronimo Records — geronimorecords.net

---

## Stack

Plain HTML / CSS / JS — Open any `.html` file in a browser to preview locally.

| Layer       | Service                         |
|-------------|----------------------------------|
| Hosting     | Netlify (free) via GitHub repo   |
| Ticketing   | Ticket Tailor                    |
| Merch Store | Shopify Buy Button               |
| Contact Form| Formspree → USER EMAIL           |
| Domain      | geronimorecords.net              |

---

## File Structure

```
geronimo-records/
├── index.html          → Homepage
├── events.html         → Upcoming events + Ticket Tailor embeds
├── archive.html        → Past shows gallery
├── merch.html          → Merch store + Shopify Buy Button embed
├── collective.html     → Team + community
├── contact.html        → Contact form (Formspree)
├── css/
│   └── style.css       → All styles + design tokens
├── js/
│   └── main.js         → Nav, scroll, animations, form submit
└── assets/
    └── images/         → Drop event photos and product images here
```

---

## Setup Checklist


### 1. Netlify Hosting (Free)
- [ ] Go to [netlify.com](https://netlify.com) → "Add new site" → "Import from GitHub"
- [ ] Select the repo, leave build settings blank, click Deploy
- [ ] In Netlify: Site Settings → Domain → Add custom domain → `geronimorecords.net`
- [ ] Update your domain's DNS nameservers to Netlify's (they give you the values)
- [ ] Every push to GitHub auto-deploys to geronimorecords.net in ~30 seconds

### 2. Formspree (Contact Form)
- [ ] Go to [formspree.io](https://formspree.io) → Create free account
- [ ] Create new form → "Geronimo Records Contact" → set email to `Email it should go to`
- [ ] Copy your form ID (8 characters, e.g. `xyzabcde`)
- [ ] In `contact.html`, replace `YOUR_FORMSPREE_ID` with your actual ID

### 3. Ticket Tailor (Events)
- [ ] Go to [tickettailor.com](https://tickettailor.com) → Create account
- [ ] Create each event (New Beginnings, Phantom Frequencies, Fashion Show, etc)
- [ ] For each event: Dashboard → Embed → Buy Button → copy `<script>` tag
- [ ] In `events.html`, find the matching `<!-- PASTE TICKET TAILOR EMBED -->` comment and replace it

### 4. Shopify Buy Button (Merch)
- [ ] Go to [shopify.com](https://shopify.com) → Start free trial
- [ ] Add your products with photos, prices, variants
- [ ] In Shopify Admin: Sales Channels → Buy Button Channel
- [ ] Create a "Collection" button → customize colors (gold `#c9a84c`, dark bg `#1a1a1a`)
- [ ] Copy the embed `<script>` tag
- [ ] In `merch.html`, replace the `<!-- PLACEHOLDER -->` block with the script
- [ ] Once live, delete the preview `.merch-grid` below the embed

### 5. Add Real Photos
- [ ] Drop event/product photos into `assets/images/`
- [ ] In `archive.html`, replace `<div class="archive-card-bg bg-X">` with:
  ```html
  <div class="archive-card-bg">
    <img src="assets/images/your-photo.jpg" alt="Event name" />
  </div>
  ```
- [ ] In `merch.html`, replace `.merch-img-bg` placeholder divs with actual product images

### 7. Update Content
- [ ] `collective.html` → Fill in real team names, roles, bios
- [ ] `collective.html` → Fill in partner/community names
- [ ] All pages → Update social links in the contact info and footer
- [ ] All pages → Update email addresses once `@geronimorecords.net` email is set up

---

## Design Tokens (css/style.css)

To update the color scheme or fonts globally, edit the `:root` block at the top of `css/style.css`:

```css
:root {
  --gold:       #c9a84c;   /* Primary accent */
  --gold-light: #e0c97a;   /* Hover state */
  --black:      #080808;   /* Page background */
  --white:      #f5f5f0;   /* Body text */
  ...
}
```
