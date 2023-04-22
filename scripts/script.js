const DiceButton = document.getElementById("btn-dice");
const RollButton = document.getElementById("btn-roll-dice");
const HoldButton = document.getElementById("btn-hold");

document.addEventListener("DOMContentLoaded", OnLoad)

function OnLoad() {
    DiceButton.classList.add('disabled-button');
    RollButton.classList.add('disabled-button');
    HoldButton.classList.add('disabled-button');
}