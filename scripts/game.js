import * as pkg from "./_imports.js";

let disableSpamTiming = 300;
const Player = {
    PlayerMain: "player-main",
    PlayerSecond: "player-second",
};
let currentPlayer = Player.PlayerMain;
let currentDiceValue = 0;
let onMobile = false;

export const SetOnMobile = isOnMobile => onMobile = isOnMobile;

export const NewGame = () => {
    ResetGame();
    pkg.Index.EnabledButton();
    PickFirstPlayerTurn();
};

const GetCurrentPlayerGlobalScore = () => currentPlayer === Player.PlayerMain ? pkg.Constants.PlayerMainGlobalScore : pkg.Constants.PlayerSecondGlobalScore;
const GetCurrentPlayerCurrentScore = () => currentPlayer === Player.PlayerMain ? pkg.Constants.PlayerMainCurrentScore : pkg.Constants.PlayerSecondCurrentScore;
const GetPlayerGlobalScore = player => player === Player.PlayerMain ? pkg.Constants.PlayerMainGlobalScore : pkg.Constants.PlayerSecondGlobalScore;
const GetPlayerCurrentScore = player => player === Player.PlayerMain ? pkg.Constants.PlayerMainCurrentScore : pkg.Constants.PlayerSecondCurrentScore;
const GetPlayerGlobalScoreToInt = player => player === Player.PlayerMain ? parseInt(pkg.Constants.PlayerMainGlobalScore.innerHTML) : parseInt(pkg.Constants.PlayerSecondGlobalScore.innerHTML);

function ResetGame() {
    ResetPlayerTurn();
    ResetAllScores();
}

export function ResetPlayerTurn() {
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

    InversePlayerScores();
}

function InversePlayerScores(){
    let playerMainGlobalScore = GetPlayerGlobalScore(Player.PlayerMain);
    let playerSecondGlobalScore = GetPlayerGlobalScore(Player.PlayerSecond);
    let p1 = playerMainGlobalScore.innerHTML;
    let p2 = playerSecondGlobalScore.innerHTML;

    SetGlobalScore(playerSecondGlobalScore, p1);
    SetGlobalScore(playerMainGlobalScore, p2);
}


export const RollDice = () => {
    DisableSpamButton(pkg.Constants.DiceButton, disableSpamTiming);
    DisableSpamButton(pkg.Constants.RollButton, disableSpamTiming);
    ShakeDice();

    let diceValue = GetRandomDiceValue();
    SetDiceIcon(diceValue);
    AddCurrentScore(diceValue);
};

function DisableSpamButton(button, ms) {
    button.disabled = true;

    setTimeout(() => {
        button.disabled = false;
    }, ms);
}

function ShakeDice() {
    pkg.Utils.AddClassOnHtmlElement(pkg.Constants.DiceButton, 'btn-dice-shake');
    setTimeout(() => {
        pkg.Utils.RemoveClassOnHtmlElement(pkg.Constants.DiceButton, 'btn-dice-shake');
    }, 400);
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

function SetGlobalScore(globalScore, value) {
    globalScore.innerHTML = value.toString();
}

function AddCurrentScore(diceValue) {
    let playerCurrentScore = onMobile ?
        GetPlayerCurrentScore(Player.PlayerMain):
        GetCurrentPlayerCurrentScore();

    let currentScore = CheckDiceValue(diceValue, playerCurrentScore);
    playerCurrentScore.innerHTML = currentScore.toString();
}

function CheckDiceValue(diceValue, playerScore) {
    let currentScore;

    if (diceValue === 1) {
        currentScore = 0;
        BodyAlert();
        SwitchPlayerTurn();
    }else {
        currentScore = parseInt(playerScore.innerHTML);
        currentScore += diceValue;
    }

    return currentScore;
}

function BodyAlert() {
    pkg.Utils.AddClassOnHtmlElement(document.body, 'body-alert');
    setTimeout(() => {
        pkg.Utils.RemoveClassOnHtmlElement(document.body, 'body-alert');
    }, 150);
}

function ResetCurrentScore() {
    let playerCurrentScore = GetCurrentPlayerCurrentScore();
    playerCurrentScore.innerHTML = "0";
}

function ResetMainCurrentScore() {
    let playerMainScore = GetPlayerCurrentScore(Player.PlayerMain);
    playerMainScore.innerHTML = "0";
}


export const Hold = () => {
    DisableSpamButton(pkg.Constants.HoldButton, disableSpamTiming);

    if (onMobile) {
        HoldOnMobile();
    }else {
        HoldOnDesktop();
    }
};

function HoldOnMobile() {
    let playerMainGlobalScore = GetPlayerGlobalScore(Player.PlayerMain);
    let playerCurrentScore = GetPlayerCurrentScore(Player.PlayerMain);
    let globalScore = parseInt(playerMainGlobalScore.innerHTML);
    let currentScore = parseInt(playerCurrentScore.innerHTML);

    globalScore += currentScore;
    SetGlobalScore(playerMainGlobalScore, globalScore);

    ResetMainCurrentScore();
    CheckWinner();
}

function HoldOnDesktop() {
    let playerGlobalScore = GetCurrentPlayerGlobalScore();
    let playerCurrentScore = GetCurrentPlayerCurrentScore();
    let globalScore = parseInt(playerGlobalScore.innerHTML);
    let currentScore = parseInt(playerCurrentScore.innerHTML);

    globalScore += currentScore;
    SetGlobalScore(playerGlobalScore, globalScore);

    ResetCurrentScore();
    CheckWinner();
}

function CheckWinner() {
    let playerMainGlobalScore = GetPlayerGlobalScoreToInt(Player.PlayerMain);
    let playerSecondGlobalScore = GetPlayerGlobalScoreToInt(Player.PlayerSecond);

    if (playerMainGlobalScore < 100 && playerSecondGlobalScore < 100) {
        SwitchPlayerTurn();
        return;
    }

    EndGame();
}

function EndGame() {
    pkg.Index.DisableButton();

    let playerWon = currentPlayer === Player.PlayerMain ? "Player 1" : "Player 2";
    alert(`${playerWon} won!`)
}
