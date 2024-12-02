"use strict";
console.log(navigator.userAgent);
console.log(navigator.cookieEnabled);
console.log(navigator.doNotTrack);
console.log(navigator.platform);
console.log(navigator.geolocation);

console.log(location);

document.body.style.backgroundColor = "purple";

console.log(document);

console.log(document.body.firstChild);
console.log(document.body.lastChild);
console.log(document.body.childNodes);
console.log(document.body.children);

for (const val of document.body.children) {
    console.log(val);
}

for (const val of document.body.childNodes) {
    console.dir(val.nodeType);
}

for (const val of document.body.childNodes) {
    console.dir(val.nodeValue);
}

setInterval(() => {
    light.hidden = parseInt(Math.random() * 2) === 1;
    document.body.style.backgroundColor = `
    rgb(${parseInt(Math.random() * 255)}, 
        ${parseInt(Math.random() * 255)},
        ${parseInt(Math.random() * 255)}`;
}, 200);

let div = document.createElement("div");
div.innerHTML = "<strong>Hi!</strong>I'm new Element";
document.body.append(div);
let div2 = div.cloneNode(true);
div2.innerHTML += " Second";
setTimeout(() => div.insertAdjacentElement("afterend", div2), 1000);
setTimeout(() => div.remove(), 2000);