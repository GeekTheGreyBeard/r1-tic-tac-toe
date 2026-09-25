# Tic Tac Toe Extreme

A single-page, five-in-a-row game designed for Rabbit R1 portrait displays and tap interaction. Build a line of five X marks before R1 builds five O marks.

## Play locally

Open `index.html` in a browser, or run a static server from this folder:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Controls

- Tap/click an empty square to play X on the 10×10 board.
- Scroll the board viewport to reach every square on a portrait display.
- R1 plays O after a short pause.
- Choose **easy** for random R1 moves, **medium** for tactical wins and blocks, or **hard** for strategic line building and blocking.
- The score counts wins, draws, and losses across rounds; **new game** starts a fresh round without clearing it.
- **recent rounds** shows the latest five outcomes at a glance: win, draw, or loss (newest first).
- Toggle sound and light/dark themes from the game UI.

## Test

```sh
node test.mjs
```
