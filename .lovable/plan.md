

# Add Google Search Console Verification Tag

## Change
Add the Google verification meta tag to `index.html` in the `<head>` section, right after the author meta tag.

## Technical Details

**File to modify:** `index.html`

Add this line after line 8 (`<meta name="author" ...>`):
```html
<meta name="google-site-verification" content="yWpBm2k21A7IxALpwgDNLoDVchKchFYX1tT9zFJbtns" />
```

## After Publishing

Once the change is live, go back to **Google Search Console** and:
1. Click **Verify** -- it should now find the tag and confirm ownership
2. Go to **Sitemaps** in the left menu
3. Enter `sitemap.xml` and click **Submit**
4. Google will start crawling and indexing your site

