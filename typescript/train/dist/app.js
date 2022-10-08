"use strict";
const container = document.querySelector(".container");
const button = document.querySelector("button");
/**
 *
 * @param e
 */
const increment = (e) => {
    const target = e.target;
    console.log(target.textContent);
};
button === null || button === void 0 ? void 0 : button.addEventListener('click', increment);
