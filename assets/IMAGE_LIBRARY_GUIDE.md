# RG Tempo Traveller — Image Library Guide

## Where to add destination and trip photos

- `assets/images/destinations/` — shared city/destination photos, named like `coorg-01.jpg`, `munnar-02.jpg`, `wayanad-01.jpg`. Trip detail pages and destination detail pages now use these real JPG files when a matching JPG exists, rather than decorative SVG placeholder artwork.
- `assets/images/trips/<trip-folder>/` — optional trip-specific gallery photos. Keep the existing filenames such as `hero-01.jpg`, `hero-02.jpg`, `place-01.jpg`, and `place-02.jpg` for trip pages that already use this folder.
- `assets/images/site/` — shared homepage and Tamil Nadu destination photos.
- `assets/images/vehicles/<seat-capacity>/` — vehicle photos.

## How to replace a destination image

1. Open `assets/images/destinations/`.
2. Replace the relevant JPG while keeping the exact filename, for example `munnar-01.jpg` or `coorg-01.jpg`.
3. Keep image extensions as `.jpg` when replacing these destination photos.
4. Open the site and press `Ctrl + F5` to refresh cached images.

## How to add more photos

For a destination that has four image slots, use the matching numbered files, for example `hampi-01.jpg` through `hampi-04.jpg`. The page must reference the same exact filenames. If you add a new city, add its JPGs to `assets/images/destinations/` and update the corresponding page's image `src` paths to those names.
