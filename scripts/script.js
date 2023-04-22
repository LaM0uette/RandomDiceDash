import * as pkg from "./_imports.js";

document.addEventListener("DOMContentLoaded", OnLoad)
pkg.Constants.NewGameButton.addEventListener("click", pkg.Game.NewGame);

function OnLoad() {
    DisableButton();
}

function DisableButton() {
    let elements = [pkg.Constants.DiceButton, pkg.Constants.RollButton, pkg.Constants.HoldButton];
    pkg.Utils.AddClassOnHtmlElements(elements, 'disabled-button');
}

