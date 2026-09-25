# three in a row

A single-page Tic-Tac-Toe game designed for the Rabbit R1's portrait display and simple tap interaction. It also runs in any modern browser.

## Play locally

Open `index.html` in a browser, or run a static server from this folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Controls

- Tap/click an empty square to play X.
- R1 plays O after a short pause.
- Use **new game** to reset.
- Toggle sound and light/dark themes from the game UI.

## Test

```sh
node test.mjs
```
