import * as pkg from "./_imports.js";

document.addEventListener("DOMContentLoaded", OnLoad)
pkg.Constants.NewGameButton.addEventListener("click", pkg.Game.NewGame);
pkg.Constants.DiceButton.addEventListener("click", pkg.Game.RollDice);
pkg.Constants.RollButton.addEventListener("click", pkg.Game.RollDice);
pkg.Constants.HoldButton.addEventListener("click", pkg.Game.Hold);

function OnLoad() {
    pkg.Index.DisableButton();
}
