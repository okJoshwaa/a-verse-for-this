# A Verse For This

Tell it how you're feeling — type it in your own words or pick a mood — and it hands back a King James Version verse that meets you there.

## Try it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server
```

Then visit `http://localhost:8000`.

## How it works

Your text is matched against a set of feeling categories (anxious, sad, angry, lonely, guilty, tired, hopeless, uncertain, grateful, tempted, grieving, overwhelmed) each backed by a handful of KJV verses. Don't like the one you got? Hit **This isn't it — give me another**. Verses never repeat within a session — once you've seen every verse for a feeling, it pulls from the rest of the set instead of showing you the same one twice.

Nothing you type is saved, logged, or sent anywhere. It's plain JavaScript running in your browser.

## Stack

Vanilla HTML/CSS/JS. No build step, no dependencies, no framework. The verse set lives in `verses.js`.

## Text

King James Version — public domain text.

## License

MIT — see [LICENSE](LICENSE).
