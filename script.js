window.addEventListener('load', () => {
    let long; //długość geo
    let lat;  //szerokość geo
    const temperatureExtraInfo = document.querySelector('.temperature__extraInfo')
    const temperatureDegrees = document.querySelector('.temperature__degrees')
    const locationTimezone = document.querySelector('.location__timezone')
    const location = document.querySelector('.location__visual')


    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;
            // console.log(long, lat);
            const proxy = "https://cors-anywhere.herokuapp.com/"
            const API_URL = `${proxy}https://api.darksky.net/forecast/83dac79a384a72ae030c5e84d220a22b/${lat},${long}?units=si`;

            fetch(API_URL)
            .then(res => {
                return res.json();
            })
            .then(data => {
                const {temperature, summary, icon} = data.currently;
                const timezone = data.timezone;
                temperatureExtraInfo.textContent = summary;
                temperatureDegrees.textContent = temperature;
                locationTimezone.textContent = timezone;

                setIcons(icon, document.querySelector('.icon'));

            });
        });
    }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});