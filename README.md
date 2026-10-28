# Tic Tac Toe Extreme

A single-page, five-in-a-row game for the Rabbit R1's portrait screen and tap input. You play X. R1 plays O. Make a line of five before R1 does.

## How to play

The board is 10×10. Tap or click an empty square to place X. Five in a row counts across, down, or on a diagonal. R1 places O after a short pause. A full board with no line of five is a draw, and the winning squares are highlighted.

On a portrait display, scroll the board viewport to reach every square.

- **easy** — R1 plays a random empty square.
- **medium** — R1 takes a five-in-a-row win, blocks yours, and otherwise plays an open center square (or the first open square if the center is full). This is the level the page opens on.
- **hard** — R1 takes wins and blocks immediate threats, then builds its own lines and cuts yours off.

Changing the level starts a fresh round. Wins, draws, and losses add up while the page stays open. **new game** starts a fresh round and leaves that score alone. **recent rounds** shows the latest five results, newest first: win, draw, or loss.

Sound starts off. Turn it on for a short tone when you move and when a round ends. The sun or moon button in the top bar switches light and dark. Until you switch it, the page follows your browser's color scheme.

## Run it

From this folder, serve the files and open the page in a browser:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

The page loads `app.js` as a module, so a local server is the reliable way to play. On the R1, use the device browser. If the R1 is on the same network as the computer serving the folder, open `http://<that computer's address>:8000`.

## Test

```sh
node test.mjs
```
