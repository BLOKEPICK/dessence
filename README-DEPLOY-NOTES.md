# Deploy Notes

- Upload this folder as your repository root (package.json at root).
- In Vercel → Settings → Environment Variables:
  - PUBLIC_FORMSPREE_ID=your_form_id_here
- Build: npm run build  |  Output: dist
- Images for services currently reference WordPress URLs parsed from the XML.
  Before turning WordPress off, move images to /public/services/ and update ogImage.