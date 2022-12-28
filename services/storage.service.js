const os = require('os');
const path = require('path');
const { promises } = require('fs');

const filePath = path.join(os.homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
    token: 'token',
    city: 'city',
}


const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    }
    catch(e) {
        return false;
    }
}

const getKeyValue = async (key) => {
    if(await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = JSON.parse(file);
        return data[key];
    }

    return undefined;
}


const saveKeyValue = async (key, value) => {
   let data = {};
   console.log(filePath);     
   if(await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file);
   }
   
   data[key] = value;
   await promises.writeFile(filePath, JSON.stringify(data)); 
}

module.exports = { saveKeyValue, getKeyValue, TOKEN_DICTIONARY };