import * as Constants from './constants.js';
import * as Utils from './utils.js';
import * as Game from "./game.js";

document.addEventListener("DOMContentLoaded", OnLoad)
Constants.NewGameButton.addEventListener("click", Game.NewGame);

function OnLoad() {
    DisableButton();
}

function DisableButton() {
    let elements = [Constants.DiceButton, Constants.RollButton, Constants.HoldButton];
    Utils.AddClassOnHtmlElements(elements, 'disabled-button');
}

