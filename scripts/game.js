import * as pkg from "./_imports.js";

const Player = {
    PlayerMain: "player-main",
    PlayerSecond: "player-second",
};
let currentPlayer = Player.PlayerMain;
let currentDiceValue = 0;
let onMobile = false;

export function NewGame() {
    ResetGame();
    pkg.Index.EnabledButton();
    PickFirstPlayerTurn();
}

export function SetOnMobile(isOnMobile) {
    onMobile = isOnMobile;
}

function ResetGame() {
    ResetPlayerTurn();
    ResetAllScores();
}

function ResetPlayerTurn() {
    if (onMobile) return;

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

    SwitchPlayerTurn();
}

function SwitchPlayerTurn() {
    ResetPlayerTurn();

    currentPlayer = currentPlayer === Player.PlayerMain ?
        Player.PlayerSecond :
        Player.PlayerMain;

    if (!onMobile) {
        SetPlayerTurn();
    }else {
        SetMobilePlayerTurn();
    }
}

function SetPlayerTurn() {
    let playerHtmlElement = currentPlayer === Player.PlayerMain ?
        pkg.Constants.PlayerMain :
        pkg.Constants.PlayerSecond;

    pkg.Utils.AddClassOnHtmlElement(playerHtmlElement, 'player-turn');
}

function SetMobilePlayerTurn() {
    let numPlayerMain = currentPlayer === Player.PlayerMain ? 1 : 2;
    let numPlayerSecond = numPlayerMain === 1 ? 2 : 1;

    pkg.Constants.PlayerMain.textContent = `PLAYER ${numPlayerMain}`;
    pkg.Constants.PlayerSecond.textContent = `PLAYER ${numPlayerSecond} :`;
}

function GetCurrentPlayerGlobalScore() {
    return currentPlayer === Player.PlayerMain ?
        pkg.Constants.PlayerMainGlobalScore :
        pkg.Constants.PlayerSecondGlobalScore;
}

function GetCurrentPlayerCurrentScore() {
    return currentPlayer === Player.PlayerMain ?
        pkg.Constants.PlayerMainCurrentScore :
        pkg.Constants.PlayerSecondCurrentScore;
}

function GetPlayerGlobalScoreToInt(player) {
    return player === Player.PlayerMain ?
        parseInt(pkg.Constants.PlayerMainGlobalScore.innerHTML):
        parseInt(pkg.Constants.PlayerSecondGlobalScore.innerHTML);
}

function GetPlayerCurrentScoreToInt(player) {
    return player === Player.PlayerMain ?
        parseInt(pkg.Constants.PlayerMainCurrentScore.innerHTML):
        parseInt(pkg.Constants.PlayerSecondCurrentScore.innerHTML);
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
    let playerCurrentScore = GetCurrentPlayerCurrentScore();

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
    let playerCurrentScore = GetCurrentPlayerCurrentScore();
    playerCurrentScore.innerHTML = "0";
}


export function Hold() {
    if (onMobile) {
        HoldOnMobile();
    }else {
        HoldOnDesktop();
    }
}

function HoldOnMobile() {
    let playerMainGlobalScore = GetPlayerGlobalScoreToInt(Player.PlayerMain);
    let playerSecondGlobalScore = GetPlayerGlobalScoreToInt(Player.PlayerSecond);
    let playerMainCurrentScore = GetPlayerCurrentScoreToInt(Player.PlayerMain);

    SetMobilePlayerTurn();
    CheckWinner();
}

function HoldOnDesktop() {
    let playerGlobalScore = GetCurrentPlayerGlobalScore();
    let playerCurrentScore = GetCurrentPlayerCurrentScore();
    let globalScore = parseInt(playerGlobalScore.innerHTML);
    let currentScore = parseInt(playerCurrentScore.innerHTML);

    globalScore += currentScore;
    playerGlobalScore.innerHTML = globalScore.toString();

    ResetCurrentScore();
    CheckWinner();
}

function CheckWinner() {
    let playerMainGlobalScore = GetPlayerGlobalScoreToInt(Player.PlayerMain);
    let playerSecondGlobalScore = GetPlayerGlobalScoreToInt(Player.PlayerSecond);

    if (playerMainGlobalScore < 100 && playerSecondGlobalScore < 100) {
        ChangePlayerTurn();
        return;
    }

    EndGame();
}

function EndGame() {
    pkg.Index.DisableButton();

    let playerWon = currentPlayer === Player.PlayerMain ? "Player 1" : "Player 2";
    alert(`${playerWon} won!`)
}