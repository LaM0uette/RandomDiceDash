import * as Constants from './constants.js';
import * as Utils from './utils.js';

document.addEventListener("DOMContentLoaded", OnLoad)

function OnLoad() {
    DisableButton();
}

function DisableButton() {
    let elements = [Constants.DiceButton, Constants.RollButton, Constants.HoldButton];
    Utils.AddClassOnHtmlElements(elements, 'disabled-button');
}

