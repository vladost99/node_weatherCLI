const axios = require('axios');
const { getKeyValue, TOKEN_DICTIONARY } = require('./storage.service');


const getIcon = (icon) => {
    switch(icon.slice(0, -1)) {
        case '01':
            return '☀️'
        case '02':
            return '⛅'
        case '03':
            return '☁️'
        case '04':
            return '☁️'
        case '09':
            return '🌧️'
        case '10':
            return '🌦️'
        case '11':
            return '🌩️'
        case '13':
            return '❄️'
        case '50':
            return '🌨️'
    }
}

const getWeather = async (city) => {
    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);

    if(!token) {
        throw new Error('Не задан ключ API, задайте его через команду -t [API_KEY]');
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${token}&lang=ru&units=metric`;
    const { data } =  await axios.get(url);


    return data;
}


module.exports = { getWeather, getIcon };