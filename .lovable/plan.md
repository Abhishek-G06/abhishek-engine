

# SEO & Discoverability Improvements Plan

## What I Will Automate (4 items)

### 1. Create `public/sitemap.xml`
A static sitemap listing your main page URL so search engines know what to crawl.

### 2. Update `public/robots.txt`
Add a `Sitemap:` directive pointing to the sitemap so crawlers find it automatically.

### 3. Fix Open Graph & Twitter Tags in `index.html`
- Change `og:image` from a URL to an actual image (your hero avatar PNG)
- Add missing `og:url` tag
- Add `twitter:title` and `twitter:description`
- Fix empty `twitter:image`

### 4. Create an IndexNow Edge Function
A backend function that pings Bing/Yandex whenever you publish updates, so they index your site faster. I will also create a simple API key file at `public/<key>.txt` as required by the IndexNow protocol.

---

## What You Must Do Manually (with step-by-step guides)

### A. Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click "Add Property" and enter `https://abhishek-engine.lovable.app`
3. Choose "URL prefix" method
4. Select the "HTML tag" verification method -- Google will give you a meta tag like:
   `<meta name="google-site-verification" content="XXXX" />`
5. Come back here and paste that tag -- I will add it to your site
6. After publishing, click "Verify" in Google Search Console
7. Submit your sitemap URL: `https://abhishek-engine.lovable.app/sitemap.xml`

### B. Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in and add your site: `https://abhishek-engine.lovable.app`
3. Choose "HTML Meta Tag" verification -- Bing gives you a tag like:
   `<meta name="msvalidate.01" content="XXXX" />`
4. Come back here and paste that tag -- I will add it to your site
5. After publishing, click "Verify" in Bing Webmaster Tools
6. Submit your sitemap URL: `https://abhishek-engine.lovable.app/sitemap.xml`

---

## Technical Details

**Files to create:**
- `public/sitemap.xml` -- static XML sitemap
- `public/<indexnow-key>.txt` -- IndexNow verification key
- `supabase/functions/index-now/index.ts` -- Edge function to ping IndexNow API

**Files to modify:**
- `index.html` -- fix OG/Twitter meta tags, remove TODO comments
- `public/robots.txt` -- add Sitemap directive

**OG image approach:** I will use the hero avatar image hosted in the `src/assets/` folder by copying it to `public/og-image.png` so it is accessible at a static URL for social sharing previews.

