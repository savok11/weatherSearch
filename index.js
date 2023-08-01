const api = 'https://api.openweathermap.org/data/2.5/weather?q='
const key = '&appid=5a57063ace1a931994faa463c241386e'
const form = document.querySelector('form')
const output = document.querySelector('#output')

const getWeather = async () => {
    const inp = document.querySelector('#inp')
    const url = api + inp.value + key
    const req = await fetch(url)
    const res = await req.json()
    renderWeather(res)
    getMap(res.coord)
    // console.log(res);

}


form.addEventListener('submit', (e) => {
    e.preventDefault()
    getWeather()
})


const renderWeather = (data) => {

    const cityName = document.createElement('h1')
    cityName.textContent = `City:  ${data.name}`
    output.innerHTML = ''
    const coord = document.createElement('h2')
    coord.textContent = `coord: ${data.coord.lat}`
    const coord2 = document.createElement('h2')
    coord2.textContent = `coord: ${data.coord.lon}`
    const temp = document.createElement('h2')
    temp.textContent = `temp: ${Math.floor(data.main.temp - 273.15)} C`
    const tempF = document.createElement('h2')
    tempF.textContent = `temp: ${Math.floor(((data.main.temp - 273.15) * 1.8) + 32)} F`
    const tempMax = document.createElement('h2')
    tempMax.textContent = `temp_max: ${Math.floor(data.main.temp_max - 273.15)} C`
    const tempMaxF = document.createElement('h2')
    tempMaxF.textContent = `temp_max: ${Math.floor(((data.main.temp_max - 273.15) * 1.8) + 32)} F`
    const tempMin = document.createElement('h2')
    tempMin.textContent = `temp_min: ${Math.floor(data.main.temp_min - 273.15)} C`
    const tempMinF = document.createElement('h2')
    tempMinF.textContent = `temp_min: ${Math.floor(((data.main.temp_min - 273.15) * 1.8) + 32)} F`
    const sys = document.createElement('h2')
    sys.textContent = `country: ${data.sys.country}`
    const weather = document.createElement('h2')
    weather.textContent = `weatherMain: ${data.weather[0].main}`
    const wind = document.createElement('h2')
    wind.textContent = `wind_dag: ${data.wind.deg}`
    const wind2 = document.createElement('h2')
    wind2.textContent = `wind_speed: ${data.wind.speed}`
    output.append(cityName, coord, coord2, temp, tempF, tempMax, tempMaxF, tempMin, tempMinF, sys, weather, wind, wind2)
}




const getMap = ({ lat, lon }) => {
    console.log(lat, lon);
    let map = document.createElement('div');
    map.id = 'map'

    DG.then(function () {
        map = DG.map('map', {
            center: [lat, lon],
            zoom: 13
        });

        DG.marker([lat, lon]).addTo(map).bindPopup('Вы кликнули по мне!');
    });
    output.append(map)
}

