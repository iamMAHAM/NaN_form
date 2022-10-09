"use strict";
const container = document.querySelector(".container");
const info = document.querySelector(".recoltedInfo");
const submit = document.querySelector("input[type='submit']");
const form = document.querySelector('form');
submit === null || submit === void 0 ? void 0 : submit.addEventListener('click', (e) => {
    const children = form === null || form === void 0 ? void 0 : form.elements;
    e.preventDefault();
    if (children) {
        for (let i = 0; i < children.length; i++) {
            const ab = children[i];
            info
                ? info.innerHTML += `<p>${ab.value}</p>`
                : '';
        }
    }
});
