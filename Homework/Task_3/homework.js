"use strict";

// Frame swap time
const timeStep = 1000;

// animationDelay
const animationDelay = 500;

// Center dot
const middleDot = parseInt(maxElement / 2);

// activeFrame
let activeFrame = 0;

const dotsFrame = document.querySelector(".slider__dots");

// Creating dot element
const dot = (position) => {
    const element = document.createElement("div");
    element.className = "dot";
    element.setAttribute("data-pos", position);
    if (position === middleDot) {
        element.classList.add("dot_middle");
    }
    return element;
};

// Modulo: maximum + 1 = minimum; minimum - 1 = maximum
function frameModulo(direction) {
    return (((activeFrame + direction) % maxElement) + maxElement) % maxElement;
}

// Append images names to array, and dot elements to dotsFrame
const arrayDotsGenerate = () => {
    for (let index = 0; index < maxElement; index++) {
        dotsFrame.appendChild(dot(index));
    }
};

arrayDotsGenerate();

// Images in slider
const frames = 3;

// The prohibition flag
let flag = true;

// Slider
const slider = document.querySelector(".slider");

// Controls
const controls = document.querySelector(".carousel");

// Create and place frame to slider
const getFrame = (direction) => {
    const currentFrame = frameModulo(direction);
    const sliderFrame = document.createElement("div");
    sliderFrame.className = "slider__frame";
    const imageFrame = document.createElement("div");
    const backgroundImageString = `url(${images[currentFrame].url}) center/cover no-repeat`;
    imageFrame.className = "frame";
    imageFrame.style.background = backgroundImageString;
    imageFrame.innerHTML = setInnerHTML(currentFrame);
    sliderFrame.appendChild(imageFrame);
    return sliderFrame;
};

function setInnerHTML(currentFrame) {
    let innerString = "";
    let todayString =
        currentDate.getDay() === currentFrame
            ? `Привет, сегодня ${getWeekDayWord(currentDate).toLowerCase()}`
            : `${getWeekDay(currentFrame)}`;
    innerString += `
    <div class="frame__day">
        ${todayString}
    </div>
    <div class="frame__info">
        <div class="frame__author">
            <span>Photographer: </span> ${images[currentFrame].user}
        </div>
        <div class="frame__like">
            &#10084;${images[currentFrame].localLike}
        </div>
    </div>
    `;
    return innerString;
}

// initSlider
const initSlider = () => {
    // Generating initial slides
    slider.append(getFrame(frameModulo(currentDate.getDay())));
    slider.append(getFrame(frameModulo(currentDate.getDay() + 1)));
    slider.prepend(getFrame(frameModulo(currentDate.getDay() - 1)));
    // Set activeFrame to currentDate to correct date shift
    activeFrame = currentDate.getDay();
};

// animate frame on edge of slider
function animate({ timing, draw, duration, removeElement }) {
    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction from 0 to 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // Current animation state
        let progress = timing(timeFraction);

        draw(progress); // Drawing

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        } else {
            // Remove frame
            removeElement.remove();
            flag = true;
        }
    });
}

// Adding new frame, animate, remove frame on different edge of slider
const nextSlide = (direction) => {
    // Prohibition of repeated animation
    if (!flag) {
        return;
    }
    flag = !flag;

    activeFrame = frameModulo(direction);
    const frameWidth = slider.offsetWidth / frames;

    let currentDiv;

    if (direction === 1) {
        slider.style.justifyContent = "flex-start";
        slider.append(getFrame(direction));
        currentDiv = slider.firstChild;
    }
    if (direction === -1) {
        slider.style.justifyContent = "flex-end";
        slider.prepend(getFrame(direction));
        currentDiv = slider.lastElementChild;
    }

    animate({
        duration: timeStep,
        timing: function (timeFraction) {
            return timeFraction;
        },
        draw: function (progress) {
            currentDiv.style.width = frameWidth * (1 - progress) + "px";
        },
        removeElement: currentDiv,
    });
};

// dotsContainer
const dotsContainer = document.querySelector(".slider__dots");

// Slide rotation
function controlClick(event) {
    if (event.target === slider.childNodes[1].querySelector(".frame__like")) {
        likeClick(event);
        return;
    }
    let dotsSteps = 1;
    let direction;
    let currentDot;
    if (event.target.classList.contains("btn_left")) {
        direction = -1;
        currentDot = middleDot - 1;
    }
    if (event.target.classList.contains("btn_right")) {
        direction = 1;
        currentDot = middleDot + 1;
    }
    if (event.target.hasAttribute("data-pos")) {
        controls.removeEventListener("click", controlClick);
        currentDot = parseInt(event.target.getAttribute("data-pos"));
        dotsSteps = currentDot - middleDot;
        if (dotsSteps !== 0) {
            if (dotsSteps < 0) {
                direction = -1;
                dotsSteps = -dotsSteps;
            } else {
                direction = 1;
            }
        }
    }
    frameMove(dotsSteps, direction, currentDot);
}

// Frame move
function frameMove(dotsSteps, direction, currentDot) {
    if (direction === undefined) {
        return;
    }

    // Animation parameters
    const dotsTransform = [
        { transform: "scale(1.5)", background: "white" },
        { transform: "scale(1)" },
    ];
    const dotTiming = {
        duration: timeStep * 0.5,
        iterations: 1,
    };
    const dotHide = [
        { transform: "scale(1)", background: "none" },
        { transform: "scale(2)", background: "initial", offset: 1 },
    ];
    const dotHideTiming = {
        duration: (timeStep + animationDelay) * (dotsSteps - 1),
        iterations: 1,
    };

    // Middle dot animation
    const middleDotAnimation = dotsContainer.childNodes[middleDot].animate(
        dotHide,
        dotHideTiming,
        dotListener
    );

    middleDotAnimation.onfinish = () => {
        dotListener();
        // likeCounterAdd();
    };

    // Dots animation from click to middleDot
    for (let i = 0; i < dotsSteps; i++) {
        ((index) => {
            setTimeout(() => {
                dotsContainer.childNodes[
                    currentDot + index * -direction - 1 * direction
                ].animate(dotsTransform, dotTiming);
                nextSlide(direction);
            }, (timeStep + animationDelay) * index);
        })(i);
    }
}

// Add listener to carousel
function dotListener() {
    controls.addEventListener("click", controlClick);
}

// Modify likes quantity, update screen, re-set localstorage
function likeClick(event) {
    images[activeFrame].localLike++;
    event.target.innerHTML = `&#10084;${images[activeFrame].localLike}`;
    localStorage.setItem("photoData", JSON.stringify(images));
}

initSlider();
dotListener();