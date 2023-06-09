<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="description" content="RandomDiceDash is a 2 players game. Each player can throw a dice as many time as they want for to score maximum point. But beware ! if the player fall on 1 with dice, he score 0 point at this round and pass he turn. The first player to reach 100 points win this game.">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="sass/main.css">
    <script defer type="module" src="scripts/script.js"></script>
    <link rel="icon" type="image/svg+xml" href="img/dice/dice_6.svg">
    <title>RandomDiceDash</title>
</head>
<body>

<header>
    <h1><img src="img/logo.svg" alt="RandomDiceDash logo"></h1>
</header>

<main class="grid-container">
    <section class="grid-player grid-player-main">
        <h2 id="player-main" class="player-global-score player-main-global-score-title">PLAYER 1</h2>
        <p id="player-main-global-score-value" class="player-main-global-score-value">_</p>
    </section>

    <section class="grid-player grid-player-second">
        <h2 id="player-second" class="player-global-score player-second-global-score-title">PLAYER 2 :</h2>
        <p id="player-second-global-score-value" class="player-second-global-score-value">_</p>
    </section>

    <section class="grid-dice">
        <button id="btn-dice" class="btn btn-dice animate-once">
            <img id="btn-dice-icon" src="img/dice/dice_6.svg" alt="Dice"  class="btn-dice-icon">
        </button>
    </section>

<!--    Grid game-->
    <div class="player-current-score player-main-current-score">
        <h3 class="player-main-current-score-title">Current</h3>
        <p id="player-main-current-score-value" class="player-main-current-score-value">_</p>
    </div>

    <div class="player-btn-actions">
        <button id="btn-roll-dice" class="btn btn-action btn-roll-dice">
            <img src="img/ui/roll.svg" alt="Roll dice"  class="btn-icon btn-roll-dice-icon">
            <span class="btn-span btn-roll-dice-span">ROLL DICE</span>
        </button>

        <button id="btn-hold" class="btn btn-action btn-hold">
            <img src="img/ui/hold.svg" alt="Hold"  class="btn-icon btn-hold-icon">
            <span class="btn-span btn-hold-span">HOLD</span>
        </button>
    </div>

    <div class="player-current-score player-second-current-score">
        <h3 class="player-second-current-score-title">Current</h3>
        <p id="player-second-current-score-value" class="player-second-current-score-value">_</p>
    </div>
<!--   /Grid game-->


    <section class="grid-new-game">
        <button id="btn-new-game" class="btn btn-action btn-new-game">
        <img src="img/ui/plus.svg" alt="New Game"  class="btn-icon btn-new-game-icon">
        <span class="btn-span btn-new-game-span">NEW GAME</span>
    </button>
    </section>
</main>

</body>
</html>