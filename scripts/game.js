import * as Constants from './constants.js';

export function NewGame() {
    ResetAllScores();
}

function ResetAllScores() {
    Constants.PlayerMainGlobalScore.innerHTML = "0";
    Constants.PlayerMainCurrentScore.innerHTML = "0";
    Constants.PlayerSecondGlobalScore.innerHTML = "0";
    Constants.PlayerSecondCurrentScore.innerHTML = "0";
}