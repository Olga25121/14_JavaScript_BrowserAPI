"usr strict";

/* Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, вы решаете установить некоторые ограничения.

Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов, функция должна генерировать исключение.

При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            {
                id: "1",
                text: "Отличный телефон! Батарея держится долго.",
            },
            {
                id: "2",
                text: "Камера супер, фото выглядят просто потрясающе.",
            },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            {
                id: "3",
                text: "Интересный дизайн, но дорогой.",
            },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            {
                id: "4",
                text: "Люблю играть на PS5, графика на высоте.",
            },
        ],
    },
];

Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения. */

let stringInput = document.querySelector(".user-input");
let button = document.querySelector(".button");
let printBlock = document.querySelector(".printBlock");
let errorMessage = document.querySelector(".errorMessage");

button.addEventListener("click", () => {
    try {
        const string = stringInput.value;
        if (string.length < 50 || string.length > 500) {
            throw new Error(
                "Комментарий не может быть менее 50 или более 500 символов"
            );
        } else {
            const newComment = document.createElement("p");
            newComment.textContent = string;
            printBlock.appendChild(newComment);
            errorMessage.textContent = "";
        }
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        console.log("Попытка добавления коментария завершена");
    }
});