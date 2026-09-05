# A Little Birthday World, Made Just for Yayul 💙

An interactive birthday website — part secret room, part scrapbook, part music
box, part bouquet, part cake, part mini game, part love letter (the
best-friend kind, not the romantic kind). No backend needed. Just static
files, ready for GitHub Pages.

## What's inside

```
birthday-website/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   ├── music.mp3          ← replace with your own song
│   │
│   ├── photos/
│   │   ├── photo1.jpg      ← replace these with your own photos
│   │   ├── photo2.jpg
│   │   ├── ... up to photo10.jpg
│   │
│   └── images/             ← empty, for anything extra you want to add
│
└── README.md
```

**The site works even before you add your own photos or music.** Missing
photos show a soft blue placeholder instead of a broken image, so you can
preview everything first and personalize at your own pace.

## 1. Replace these files with your own photos

Drop your own images into `assets/photos/`, using the same file names
(`photo1.jpg`, `photo2.jpg`, and so on). You are not limited to 10 — to add
more, open `script.js` and add a new line to the `photos` list near the top,
following the same pattern as the ones already there.

Add your own song at `assets/music.mp3` (any MP3 works — just keep that exact
file name, or update the `music` line in the config to match a different
name).

## 2. Personalize everything in one place

Open `script.js`. Right at the top, under the comment that says
`BIRTHDAY CUSTOMIZATION`, you'll find everything you're likely to want to
change:

- `name` — her name (already set to "Yayul")
- `age`, `birthday` — shown on the "today is your day" screen
- `pin` — the 4-digit secret code on the opening screen (default `1234`)
- `sender` — how the message is signed at the end
- `music` — the path to your song file
- `message` — the personal letter, typed out on the letter screen
- `finalPhoto` — the photo shown in the elegant frame at the very end
- `photos` — the list used in the scrapbook (add as many as you like)
- `memories` — the timeline "chapters"; add, remove, or edit freely

You do not need to touch anything below the line that says
`END OF CUSTOMIZATION`.

## 3. Put it on GitHub Pages

1. Create a new repository on GitHub (public works fine for a free site).
2. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the whole
   `assets` folder (with your photos and music inside it) into that
   repository.
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment," set the source to **Deploy from a branch**,
   choose your main branch and the `/ (root)` folder, then save.
5. Wait a minute or two, then GitHub will give you a link like
   `https://yourusername.github.io/your-repo-name/` — that's the finished
   website, ready to send.

No build tools, no npm install, no backend — just files.

## Notes

- Works great on phones (that's what it was designed for first) and scales
  up nicely on desktop too.
- Respects the "reduce motion" accessibility setting on the visitor's device
  by toning down animation.
- Everything is vanilla HTML/CSS/JS — no frameworks, nothing to install.

Happy birthday, Yayul. 💙
