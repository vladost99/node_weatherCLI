const { getArgs } = require("./helpers/args");
const { printHelp, printSuccess, printError, printWeather } = require('./services/log.service');
const { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } = require('./services/storage.service');
const { getWeather, getIcon } = require('./services/api.service');

const saveToken = async (token) => {
    if(!token.length) {
        printError('Не передан токен');
        return;
    } 

   try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('TOKEN сохранен');
   } catch(err) {
        printError(err);
   }
}

const saveCity = async (city) => {

    if(!city.length) {
        printError('Не передан город');
        return;
    }

    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('CITY сохранен');
    } catch(err) {
        printError(err);
    }
 }


const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        console.log(city);
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon));
    } catch(e) {
        if(e?.response?.status === 404) {
            printError('Неверно указан город');
        }
        else if(e?.response?.status === 401) {
            printError('Неверно указан API_KEY');
        }
        else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);

    if(args.h) {
        return printHelp();
    }
    if(args.s) {
        return saveCity(args.s);
     }
    if(args.t) {
        return saveToken(args.t);
    }

    return getForcast();
}

initCLI();