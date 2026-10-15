# Archilles Vivero Portfolio

A responsive, editorial-style portfolio website built with plain HTML, CSS, and JavaScript. There is no build step, framework, package manager, or installation required.

## Quick start

1. Open `content.js` and update your brand, copy, email, social links, hero images, and projects.
2. Put project and hero assets in `assets/images/`.
3. Open `index.html` directly in a browser, or deploy the `portfolio-website` folder to any static host.

## Project structure

```text
portfolio-website/
├── index.html
├── style.css
├── script.js
├── content.js
├── README.md
└── assets/
    └── images/
        ├── hero-detail.jpeg
        ├── hero-detail.svg
        ├── hero-portrait.jpeg
        ├── hero-portrait.svg
        ├── hero-portrait-2.jpeg
        ├── hero-portrait-2.svg
        ├── project-01.svg
        ├── project-02.svg
        ├── project-03.svg
        └── project-04.svg
```

There is intentionally no résumé/PDF dependency in the current version.

## Editing content

Most content lives in `content.js`.

### Hero images

`heroImages` accepts up to three image paths. The first image is loaded with high priority; the other hero images load normally.

```js
heroImages: [
  "assets/images/hero-portrait.jpeg",
  "assets/images/hero-portrait-2.jpeg",
  "assets/images/hero-detail.jpeg"
]
```

### Projects

Projects now support multiple images, an array of services, and an optional case-study URL.

```js
{
  title: "Project Title",
  category: "Branding",
  description: "Short project summary.",
  images: [
    "assets/images/project-01.svg",
    "assets/images/project-01-detail.svg"
  ],
  client: "Client Name",
  services: ["Strategy", "Branding", "Art Direction"],
  caseStudy: "https://example.com/case-study"
}
```

`caseStudy` can be an empty string when no external case study exists. A legacy single `image` property is also supported by `script.js`, but new projects should use `images`.

## Selected Work carousel

The Selected Work section is a horizontal, scroll-snapping carousel. It supports:

- Previous/next buttons
- Mouse dragging
- Touch/swipe gestures
- Trackpad horizontal scrolling
- Left/right keyboard arrows
- Home/End keyboard navigation
- Responsive card sizing for desktop and mobile
- Accessible carousel and slide semantics

## Project modal

Opening a project displays an accessible dialog with:

- Proper dialog semantics and labels
- Escape-to-close
- Click-outside-to-close
- Focus return to the project card
- Keyboard focus trapping
- Left/right image navigation
- Optional case-study link
- Multiple project images

## Performance and accessibility

- Project images use native lazy loading and async decoding.
- Hero imagery uses appropriate fetch priority.
- Images include useful dimensions to reduce layout shift.
- Interactive elements have visible focus states.
- `prefers-reduced-motion` is respected.
- Mobile touch targets are sized for easier interaction.

## Typography

Typography is consolidated into CSS variables at the top of `style.css`:

```css
--font-body: "DM Sans", Arial, sans-serif;
--font-display: "Inter", Arial, sans-serif;
```

The intro headline uses the display font and can be changed independently through `--font-display` or `.intro-title`.

## SEO

`index.html` includes:

- Descriptive title and meta description
- Author and robots metadata
- Open Graph metadata
- Twitter Card metadata
- Theme color
- Basic Schema.org structured data

If you have a live domain, add your canonical URL and replace the placeholder structured-data `url` with the real portfolio URL.

## Deployment

The site can be deployed as-is to GitHub Pages, Netlify, Vercel, or standard static hosting. Upload the entire `portfolio-website` folder and make sure `index.html` remains at the site root.

## Optional project videos

Copy your MP4 into `assets/videos/`, then add `video: "assets/videos/filename.mp4"` to the project in `content.js`. Keep the existing `image` or `images` field: the first image remains the carousel thumbnail. The modal shows the video first, followed by all project images. Videos have native controls, inline playback, metadata-only preload, and no autoplay. Moving to another gallery item or closing the modal pauses and resets the player. Arrow keys navigate the gallery; when the player has focus they control the player instead.

The Oats Overnight MP4 is included at `assets/videos/oats-overnight-claymation-ad.mp4`. Its playback index is placed first for faster loading; audio and video quality are unchanged. If playback fails, the modal offers a direct link to the clip.


## Portfolio sections

Creatives uses the existing `projects` list and keeps the carousel and video gallery. Case Studies / Research uses the separate `caseStudies` list in `content.js`. An empty list shows a coming-soon message. Add entries with `title`, `category`, and `description`; optional `image` adds a cover, and optional `url` adds a Read more link to an article, page, or PDF. Local paths are relative to `index.html`; include linked documents in the website folder. Both sections have links in the header and footer.

## The 6am Problem interactive case study

Open the case study from Case Studies / Research. The page includes the full film, three-act seeking controls (no autoplay), rollout choices, expandable strategy notes and a proposed measurement plan. The closing Watch video in Creatives link opens the first project dialog using `index.html?project=0#work`. If you reorder projects, update that index to match the Oats Overnight project. The source PDF is intentionally excluded, and there is no PDF download link. Visible authorship credits do not prevent copying or screenshots of public web content.
