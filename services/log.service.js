const { bgRed, bgGreen, bgCyan, bgMagenta } = require('chalk');
const dedent = require('dedent-js'); 

const printError = (error) => {
    console.log(bgRed(`ERROR ${error}`));
}
const printSuccess = (message) => {
    console.log(bgGreen(`Success ${message}`));
}
const printHelp = () => {
    console.log(bgCyan(
        dedent`Help 
        Без параметров - вывод погоды
        -s [CITY] для установки города
        -h для вывода помощи
        -t [API_KEY] для сохранения токена
        `
    ))
}

const printWeather = (res, icon) => {
    console.log(
        dedent` ${bgMagenta('Weather')} Погода в городе ${res.name}
            ${icon}  ${res.weather[0].description}
            Температура: ${res.main.temp} (ощущается как ${res.main.feels_like})
            Влажность: ${res.main.humidity}%
            Скорость ветра: ${res.wind.speed}
        `
    )
}

module.exports = { printError, printSuccess, printHelp, printWeather };

