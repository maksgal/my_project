const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "6e2dff868c224d5211da0cff7c953dcf"
}

const cities = {
    5056033: 'london',
    6453341: 'alesund',
    524305: 'murmansk',
    703448: 'kyiv',
    3099434: 'gdansk',
    2638077: 'sheffield'
}

for (key in cities) {

let option = document.createElement('option');
option.innerHTML = cities[key];
option.setAttribute('value', key);

document.querySelector('#city').appendChild(option);
}




function getWeather() {

    const cityId = document.querySelector('#city').value;

    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)

        .then(weather => {
            return weather.json();
        })

        .then(showWeather);
}

function showWeather(data) {

    console.log(data);

    function getWindDir() {

        let v = data.wind.deg,
            windDir;

        if (v > 337.5) windDir = 'Northerly';
        if (v > 247.5) windDir = 'Westerly';
        if (v > 292.5) windDir = 'North Westerly';
        if (v > 202.5) windDir = 'South Westerly';
        if (v > 157.5) windDir = 'Southerly';
        if (v > 122.5) windDir = 'South Easterly';
        if (v > 67.5) windDir = 'Easterly';
        if (v > 22.5) {
            windDir = 'North Easterly';
        }
        windDir = 'Northerly';

        return windDir;
    }

    // здесь вы выводите на страницу

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.actual').innerHTML = `${Math.round(data.main.temp)}&degC`;
    document.querySelector('.felt').innerHTML = `Feels like: ${Math.round(data.main.feels_like)}&degC`;
    document.querySelector('.humidity').innerHTML = `Humidity: ${data.main.humidity}%`
    document.querySelector('.wind').innerHTML = `${Math.round(data.wind.speed)} m/s ${getWindDir()}`
    document.querySelector('.icon').innerHTML = `<img src = 'http://openweathermap.org/img/wn/${data.weather["0"].icon}@2x.png'>`
}

getWeather();
document.querySelector('#city').onchange = getWeather;