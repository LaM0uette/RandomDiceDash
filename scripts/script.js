import * as pkg from "./_imports.js";

document.addEventListener("DOMContentLoaded", OnLoad)
pkg.Constants.NewGameButton.addEventListener("click", pkg.Game.NewGame);

function OnLoad() {
    pkg.Index.DisableButton();
}
