let APIkey = 'a2b5a786ef73d04a7ea692c4055cfd1e';
let cityName = 'homs';
let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APIkey}`;
let hr = (new Date()).getHours();
if (hr > 5 && hr < 19) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW9ybmluZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60')";
} else {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmlnaHR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60')";
}
new Promise((resolve, reject) => {
    let myRequest = new XMLHttpRequest();
    myRequest.open('GET', url);
    myRequest.send();
    myRequest.onload = function () {
        if (myRequest.readyState == 4 && myRequest.status == 200) {
            resolve(JSON.parse(this.responseText));
        } else {
            reject(Error('Wrong Api'));
        }
    };
}).then((result) => {
    console.log(result);
    const { name } = result;
    const { icon, description } = result.weather[0];
    const { temp, humidity } = result.main;
    const { speed } = result.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".wind").innerText = "Wind " + speed + " km/h";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + " °C";
    document.querySelector(".humidty").innerText = "Humidity " + humidity + " %";
    document.querySelector(".icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
});

// fetch('https://api.openweathermap.org/data/2.5/weather?q=homs&units=metrics&appid=a2b5a786ef73d04a7ea692c4055cfd1e')
// .then(
//     (data) => {
//         console.log(data);
//         let result = data.json();
//         console.log(result);

// const { name } = result;
// const { icon, description } = result.weather[0];
// const { temp, humidty } = result.main;
// const { speed } = result.wind;
// document.querySelector(".city").innerText = "Weather in " + name;
// document.querySelector(".wind").innerText = "Wind " + speed + "km/h";
// document.querySelector(".description").innerText = description;
// document.querySelector(".temp").innerText = temp + "°C";
// document.querySelector(".humidty").innerText = "Humidty" + humidty + "%";
// document.querySelector(".icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
//     }
// );

function search(query) {
    cityName = query;
    new Promise((resolve, reject) => {
        let myRequest = new XMLHttpRequest();
        myRequest.open('GET', `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${APIkey}`);
        myRequest.send();
        myRequest.onload = function () {
            if (myRequest.readyState == 4 && myRequest.status == 200) {
                resolve(JSON.parse(this.responseText));
            } else {
                reject(Error('Wrong Api'));
            }
        };
    }).then((result) => {
        console.log(result);
        const { name } = result;
        const { icon, description } = result.weather[0];
        const { temp, humidity } = result.main;
        const { speed } = result.wind;
        document.querySelector(".city").innerText = "Weather in " + name;
        document.querySelector(".wind").innerText = "Wind " + speed + " km/h";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = temp + " °C";
        document.querySelector(".humidty").innerText = "Humidity " + humidity + " %";
        document.querySelector(".icon").src = "https://openweathermap.org/img/w/" + icon + ".png";
    });
}

document.querySelector('button').addEventListener('click', () => {
    search(document.querySelector('input').value);
});

document.querySelector('input').addEventListener('keyup', (event) => {
    if (event.key == 'Enter') {
        search(document.querySelector('input').value);
    }
});
