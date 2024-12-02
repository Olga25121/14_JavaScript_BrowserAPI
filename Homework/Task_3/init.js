"use strict";

const CLIENT_ID = "8I7d4WvEIvLQybp7HvwNoiVtphIlBCOvKthoBO_Cqc4";

// Slides quantity
const maxElement = 7;

let state = [];

const data = [];

// currentDate
let currentDate = new Date();

// Calculated and set Sunday
let sunday = new Date(
    currentDate.getTime() - currentDate.getDay() * 24 * 3600 * 1000
);
sunday.setHours(0, 0, 0, 0);

// Images names array
let images = [];

// Return day by number
const getWeekDay = (date) => {
    let days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ];
    return days[date];
};

// Return day by date
const getWeekDayWord = (date) => {
    return getWeekDay(date.getDay());
};

// Read localstorage
const readData = () => {
    const dataJSON = localStorage.getItem("photoData");

    if (dataJSON === null) {
        return undefined;
    }

    // Remove non-valod JSON
    try {
        return JSON.parse(dataJSON);
    } catch (e) {
        localStorage.removeItem("photoData");
        return undefined;
    }
};

const setPhotos = () => {
    state.forEach(({ urls: { regular }, user: { name } }) => {
        const container = {};
        container.url = regular;
        container.user = name;
        container.localLike = 0;
        images.push(container);
    });
    localStorage.setItem("startDate", JSON.stringify(sunday));
    localStorage.setItem("photoData", JSON.stringify(images));
};

const fetchPhotos = async () => {
    try {
        const url = `https://api.unsplash.com/photos/random?client_id=${CLIENT_ID}&count=${maxElement}&query=game-wallpaper`;
        const response = await fetch(url);
        const data = await response.json();

        if (response.ok && data.length) {
            state = data;
            setPhotos();
        }
    } catch (err) {
        console.log(err);
    }
};

if (readData() === undefined) {
    fetchPhotos();
} else {
    const weekMS = 604800000;
    const dateCheck = new Date(JSON.parse(localStorage.getItem("startDate")));
    console.log((currentDate - dateCheck) / weekMS);
    if ((currentDate - dateCheck) / weekMS >= 1) {
        console.log("Need to reload photos");
        fetchPhotos();
    } else {
        images = JSON.parse(localStorage.getItem("photoData"));
    }
}