import * as pkg from "./_imports.js";

export function NewGame() {
    ResetAllScores();
    pkg.Index.EnabledButton();
}

function ResetAllScores() {
    pkg.Constants.PlayerMainGlobalScore.innerHTML = "0";
    pkg.Constants.PlayerMainCurrentScore.innerHTML = "0";
    pkg.Constants.PlayerSecondGlobalScore.innerHTML = "0";
    pkg.Constants.PlayerSecondCurrentScore.innerHTML = "0";
}
