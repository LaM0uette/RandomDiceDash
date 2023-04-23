import * as pkg from "./_imports.js";

const Player = {
    PlayerMain: "player-main",
    PlayerSecond: "player-second",
};
let currentPlayer = Player.PlayerMain;
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
    currentPlayer = randomPlayer === 0 ? Player.PlayerMain : Player.PlayerSecond;
    SetPlayerTurn();
}

function SwitchPlayerTurn() {
    ResetPlayerTurn();

    currentPlayer = currentPlayer === Player.PlayerMain ?
        Player.PlayerSecond :
        Player.PlayerMain;

    SetPlayerTurn();
}

function SetPlayerTurn() {
    let playerHtmlElement = currentPlayer === Player.PlayerMain ?
        pkg.Constants.PlayerMain :
        pkg.Constants.PlayerSecond;

    pkg.Utils.AddClassOnHtmlElement(playerHtmlElement, 'player-turn');
}

function GetPlayerCurrentScore() {
    return currentPlayer === Player.PlayerMain ?
        pkg.Constants.PlayerMainCurrentScore :
        pkg.Constants.PlayerSecondCurrentScore;
}


export function RollDice() {
    let diceValue = GetRandomDiceValue();
    SetDiceIcon(diceValue);
    AddCurrentScore(diceValue);
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

function AddCurrentScore(diceValue) {
    let currentScore;
    let playerCurrentScore = GetPlayerCurrentScore();

    if (diceValue === 1) {
        currentScore = 0;
        ChangePlayerTurn();
    }else {
        currentScore = parseInt(playerCurrentScore.innerHTML);
        currentScore += diceValue;
    }

    playerCurrentScore.innerHTML = currentScore.toString();
}

function ChangePlayerTurn() {
    SwitchPlayerTurn();
    ResetCurrentScore();
}

function ResetCurrentScore() {
    let playerCurrentScore = GetPlayerCurrentScore();
    playerCurrentScore.innerHTML = "0";
}