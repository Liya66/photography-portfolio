# Liya Wang — Photography

Personal photography portfolio: a filterable masonry gallery (Animals, Landscape, Street, Portraits & Events)
with a lightbox, an About page, a contact form and a light/dark theme.

Built with HTML, [Tailwind CSS](https://tailwindcss.com), [Alpine.js](https://alpinejs.dev) and
[Fancybox](https://fancyapps.com/fancybox/). Based on
[photography-portfolio](https://github.com/JoaoFranco03/photography-portfolio) by João Franco.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. `npm run dev` rebuilds the CSS whenever you edit a page.

## Adding photos

Keep your originals in a folder with one subfolder per category: `Animals`, `City`, `Landscapes` and
`Portraits&Events`. Add new photos there, then run:

```bash
npm run import-photos -- "/Users/liya/Desktop/portfolio photos"
```

The script:

- compresses each photo to at most 2560px on the long edge, always under 3 MB, keeping its aspect ratio
- makes an 800px thumbnail for the gallery grid
- strips metadata, including GPS location
- skips exact duplicates
- updates [`photos/photos.js`](photos/photos.js)

Photos already imported are skipped, so reruns are quick. New photos are added at the end, mixed across categories.

In `photos.js` you can reorder lines and fill in `alt`, a short description for screen readers. You can also
add `"title": "..."` for a lightbox caption. Re-importing keeps your edits.
To remove a photo, delete its line and its two files: `photos/<category>/<name>.jpg` and `thumbs/<name>.jpg`.

## Personal details

Your name, tagline, bio, email, location, social links and gallery categories are all in
[`site.config.js`](site.config.js). Leave a field empty (`""`) to hide it. The About page portrait is `assets/avatar.jpg`.

## Deploying to Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub**, then pick this repo.
2. The build settings come from `netlify.toml` (`npm run build`, publish directory `.`), so just click **Deploy**.
3. Contact form submissions show up under **Forms** in the Netlify dashboard. You can turn on email
   notifications there.

## License

GPL-3.0, inherited from the original template. See [LICENSE](LICENSE).
