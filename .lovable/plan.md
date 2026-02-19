

# Add Bing Webmaster Tools Verification Tag

## Change
Add the Bing verification meta tag to `index.html` in the `<head>` section, right after the Google verification tag.

## Technical Details

**File to modify:** `index.html`

Add this line after line 9 (the Google verification tag):
```html
<meta name="msvalidate.01" content="6FAF5E883F95309F114A5FE0F9FA0A7A" />
```

## After Publishing

Once the change is live, go back to **Bing Webmaster Tools** and:
1. Click **Verify** -- it should now find the tag and confirm ownership
2. Go to **Sitemaps** in the left menu
3. Submit `https://abhishek-engine.lovable.app/sitemap.xml`
4. Bing will start crawling and indexing your site

