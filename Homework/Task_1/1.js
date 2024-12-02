"use strict";

/*
###Задание 1
Задание 1
• Используя Symbol.iterator, создайте объект "Музыкальная коллекция", который можно итерировать. Каждая итерация должна возвращать следующий альбом из коллекции.

• Создайте объект musicCollection, который содержит массив альбомов и имеет свойство-символ Symbol.iterator. Каждый альбом имеет следующую структуру:

{
title: "Название альбома",
artist: "Исполнитель",
year: "Год выпуска"
}

• Реализуйте кастомный итератор для объекта musicCollection. Итератор должен перебирать альбомы по порядку.
• Используйте цикл for...of для перебора альбомов в музыкальной коллекции и вывода их на консоль в формате: Название альбома - Исполнитель (Год выпуска)
*/

const musicCollection = {
    albums: [
    {
        title: "Vuelve",
        artist: "Ricky Martin",
        year: "1998",
    },
    {
        title: "Би-2 и Симфонический оркестр МВД России",
        artist: "Би-2",
        year: "2010",
    },
    {
        title: "У истока",
        artist: "Татьяна Куртукова",
        year: "2024",
    },
],
[Symbol.iterator]: function() {
    let index = 0;
    const albums = this.albums;
    return {
        next: function() {
            return index < albums.length ?
                { value: albums[index++], done: false } :
                { done: true };
        }
    };
}
};

// Используем цикл for...of для перебора альбомов
for (const album of musicCollection) {
    console.log(`${album.title}, ${album.artist} (${album.year})`);
}
