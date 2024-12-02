"use strict";
import { workouts } from "./data.js";

const workoutsInfo = JSON.parse(workouts);

function renderWorkoutSchedule(workoutsInfo) {
    const scheduleBox = document.querySelector(".schedule-box");

    workoutsInfo.forEach((item) => {
        scheduleBox.insertAdjacentHTML(
            "beforeend",
            `
        <div class="schedule_item-box" id="${item.name_of_workout}">
			<div class="schedule_item">
                <p class="schedule_item-title">${item.name_of_workout}</p>
                <p class="schedule_item-time">${item.time_of_workout}</p>
            <div class="full">
				<p class="schedule_item-maxnumber" style="text-align:left">Максимальное<br>количество участников:</p>
				<p><span>${item.max_number_of_participants}</span></p>
			</div>
			<div class="full">
                <p class="schedule_item-currentnumber">Текущее количество<br>записанных участников:</p>
                <p data-id=${item.id} ><span>${item.current_number_of_participants}</span></p>
            </div>
            <div class="button-box">
            <button class="button-submit" id="${item.id}">Записаться</button>
            <button class="button-reject disabled" data-id="${item.name_of_workout}">Отменить запись</button>
            </div>
		</div>
        `
        );
        if (
            Number(item.max_number_of_participants) ===
            Number(item.current_number_of_participants)
        ) {
            const submitButton = document.getElementById(`${item.id}`);
            submitButton.classList.add("disabled");
            submitButton.closest(".schedule_item-box").style.backgroundColor =
                "rgba(240, 240, 240, .75)";
            submitButton
                .closest(".schedule_item-box")
                .classList.add("no-hover");
        }
    });
}

renderWorkoutSchedule(workoutsInfo);

const scheduleBox = document.querySelector(".schedule-box");

scheduleBox.addEventListener("click", function (e) {
    if (e.target.classList.contains("button-submit")) {
        workoutsInfo[e.target.id - 1].current_number_of_participants =
            Number(
                workoutsInfo[e.target.id - 1].current_number_of_participants
            ) + 1;
        const currentNumberOfParticipants = document.querySelector(
            `[data-id="${e.target.id}"]`
        );
        console.log(currentNumberOfParticipants);
        const span = currentNumberOfParticipants.querySelector("span");
        span.textContent =
            workoutsInfo[e.target.id - 1].current_number_of_participants;

        const currentSubmitButton = document.getElementById(`${e.target.id}`);
        currentSubmitButton.classList.add("disabled");
        currentSubmitButton.nextElementSibling.classList.remove("disabled");
    }
    if (e.target.classList.contains("button-reject")) {
        console.log(workoutsInfo);
        let currentWorkoutsInfoItem = workoutsInfo.filter(
            (item) => item.name_of_workout === e.target.dataset.id
        );
        let index = Number(currentWorkoutsInfoItem[0].id) - 1;
        workoutsInfo[index].current_number_of_participants =
            workoutsInfo[index].current_number_of_participants - 1;

        const currentNumberOfParticipants = document.querySelector(
            `[data-id="${index + 1}"]`
        );
        const span = currentNumberOfParticipants.querySelector("span");
        span.textContent = workoutsInfo[index].current_number_of_participants;

        const currentRejectButton = document.querySelector(
            `[data-id="${e.target.dataset.id}"]`
        );
        currentRejectButton.classList.add("disabled");
        currentRejectButton.previousElementSibling.classList.remove("disabled");
    }
});