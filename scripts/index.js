import * as pkg from "./_imports.js";

const elements = [pkg.Constants.DiceButton, pkg.Constants.RollButton, pkg.Constants.HoldButton]

export const EnabledButton = () => {
    pkg.Utils.RemoveClassOnHtmlElements(elements, 'disabled-button');
    pkg.Constants.DiceButton.addEventListener("click", pkg.Game.RollDice);
    pkg.Constants.RollButton.addEventListener("click", pkg.Game.RollDice);
    pkg.Constants.HoldButton.addEventListener("click", pkg.Game.Hold);
};

export const DisableButton = () => {
    pkg.Utils.AddClassOnHtmlElements(elements, 'disabled-button');
    pkg.Constants.DiceButton.removeEventListener("click", pkg.Game.RollDice);
    pkg.Constants.RollButton.removeEventListener("click", pkg.Game.RollDice);
    pkg.Constants.HoldButton.removeEventListener("click", pkg.Game.Hold);
};