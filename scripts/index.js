import * as pkg from "./_imports.js";

const elements = [pkg.Constants.DiceButton, pkg.Constants.RollButton, pkg.Constants.HoldButton]

export function EnabledButton() {
    pkg.Utils.RemoveClassOnHtmlElements(elements, 'disabled-button');
}

export function DisableButton() {
    pkg.Utils.AddClassOnHtmlElements(elements, 'disabled-button');
}