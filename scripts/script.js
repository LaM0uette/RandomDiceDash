import * as pkg from "./_imports.js";

const mediaQuery = window.matchMedia("screen and (max-width: 999px)");
const handleMediaQueryChange = event => {
    pkg.Game.ResetPlayerTurn();

    if (event.matches) {
        pkg.Game.SetOnMobile(true);
    } else {
        pkg.Game.SetOnMobile(false);
    }
};
const OnLoad = () => pkg.Index.DisableButton();
const deleteAllCookies = () => {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const equalPos = cookie.indexOf('=');
        const name = equalPos > -1 ? cookie.substr(0, equalPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
    }
};

mediaQuery.addEventListener("change", handleMediaQueryChange);
handleMediaQueryChange(mediaQuery);

document.addEventListener("DOMContentLoaded", OnLoad)
pkg.Constants.NewGameButton.addEventListener("click", pkg.Game.NewGame);

window.addEventListener('beforeunload', () => {
    deleteAllCookies();
});