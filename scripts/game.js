import * as pkg from "./_imports.js";

let currentDiceValue = 0;

export function NewGame() {
    ResetGame();
    pkg.Index.EnabledButton();
    PickFirstPlayerTurn();
}

function ResetGame() {
    ResetPlayerTurn();
    ResetAllScores();
}

function ResetPlayerTurn() {
    let players = [pkg.Constants.PlayerMain, pkg.Constants.PlayerSecond];
    pkg.Utils.RemoveClassOnHtmlElements(players, 'player-turn');
}

function ResetAllScores() {
    pkg.Constants.PlayerMainGlobalScore.innerHTML = "0";
    pkg.Constants.PlayerMainCurrentScore.innerHTML = "0";
    pkg.Constants.PlayerSecondGlobalScore.innerHTML = "0";
    pkg.Constants.PlayerSecondCurrentScore.innerHTML = "0";
}

function PickFirstPlayerTurn() {
    let randomPlayer = pkg.Utils.GetRandomNumber(0, 1);
    let player = randomPlayer === 0 ? pkg.Constants.PlayerMain : pkg.Constants.PlayerSecond;
    pkg.Utils.AddClassOnHtmlElement(player, 'player-turn');
}


export function RollDice() {
    let diceValue = GetRandomDiceValue();
    SetDiceIcon(diceValue);
}

function GetRandomDiceValue() {
    const minDiceValue = 1;
    const maxDiceValue = 6;

    let diceValue = pkg.Utils.GetRandomNumber(minDiceValue, maxDiceValue);

    if (currentDiceValue === minDiceValue){
        while (diceValue === minDiceValue) {
            diceValue = pkg.Utils.GetRandomNumber(minDiceValue, maxDiceValue);
        }
    }

    currentDiceValue = diceValue;
    return diceValue;
}

function SetDiceIcon(diceValue) {
    pkg.Constants.DiceIcon.src = `img/dice/dice_${diceValue}.svg`;
}