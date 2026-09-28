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

1. Export the photo at about **2000px on the long edge** (JPEG or WebP, ~80% quality) so the site stays fast.
2. Put it in the folder for its category: `photos/animals/`, `photos/landscape/`, `photos/street/` or `photos/portraits-events/`.
3. Add one line to [`photos/photos.js`](photos/photos.js):

   ```js
   { src: "photos/animals/fox.jpg", alt: "A red fox in the snow", category: "animals", title: "Winter fox" },
   ```

   `alt` describes the photo for screen readers. `title` is optional and shows as the lightbox caption.
   Photos appear in the order listed.

Delete the Unsplash placeholder lines once you have your own photos.

## Personal details

Your name, tagline, bio, email, location, social links and gallery categories are all in
[`site.config.js`](site.config.js). Leave a field empty (`""`) to hide it. Replace `assets/Avatar.png`
with your own portrait (square works best).

## Deploying to Netlify

1. In Netlify: **Add new site → Import an existing project → GitHub**, then pick this repo.
2. The build settings come from `netlify.toml` (`npm run build`, publish directory `.`), so just click **Deploy**.
3. Contact form submissions show up under **Forms** in the Netlify dashboard. You can turn on email
   notifications there.

## License

GPL-3.0, inherited from the original template. See [LICENSE](LICENSE).
