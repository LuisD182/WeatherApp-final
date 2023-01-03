import React, { useEffect, useState } from 'react';

const SearchWeather = () => {
    const [searchWeather, setSearchWeather] = useState('New York');
    const [data, setData] = useState([]);
    const [input, setInput] = useState('')
    let componentMounted = true;



    useEffect(() => {

        const fetchWeather = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchWeather}&appid=f7caafd4aea21631da1833740cf20e8c`);
            if (componentMounted) {
                setData(await response.json());


            }
            return () => {
                componentMounted = false
            }
        }
        fetchWeather();
    }, [searchWeather]);

    console.log(data);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchWeather(input)
    }
    // const typeWeather = data?.weather[0]?.main

    const centigrades = Math.round(((data?.main?.temp) - 273.15) * 100) / 100
    const farenheit = Math.round(((centigrades * 9 / 5) + 32) * 100) / 100
    const hectoPascals = data?.main?.pressure
    const mmHg = Math.round((hectoPascals * 0.75) * 100) / 100

    const [areDegrees, setAreDegrees] = useState(true)
    const changeDegrees = () => {
        setAreDegrees(!areDegrees)
    }
    const [isHectoPascals, setIsHectoPascals] = useState(true)
    const changePressure = () => {
        setIsHectoPascals(!isHectoPascals)
    }
    
    let imgBackground = null;
    let typeWeather = null;
    let emoji = null;
    if (typeof data.main != 'undefined') {
        if (data.weather[0].main == "Clouds") {
            emoji = "fa-cloud";
            typeWeather = "Clouds"
            imgBackground = 'https://w0.peakpx.com/wallpaper/271/744/HD-wallpaper-forest-mist-trees-forest-trees-sky-mountains-nature.jpg'
        } else if (data.weather[0].main == "Thunderstorm") {
            emoji = "fa-bolt"
            typeWeather = "Thunderstorm"
            imgBackground = 'https://w0.peakpx.com/wallpaper/121/773/HD-wallpaper-thunderstorm-in-a-canyon-sky-thunderstorm-colors-storms-lightening-canyons-nature-mountains-graph.jpg'
        } else if (data.weather[0].main == "Drizzle") {
            emoji = "fa-cloud-rain"
            typeWeather = "Drizzle"
            imgBackground = 'https://w0.peakpx.com/wallpaper/689/1023/HD-wallpaper-spider-man-flying-in-rain.jpg'
        } else if (data.weather[0].main == "Rain") {
            emoji = "fa-cloud-shower-heavy"
            typeWeather = "Rain"
            imgBackground = 'https://w0.peakpx.com/wallpaper/964/27/HD-wallpaper-spider-man-no-way-home-in-the-rain-heavy-rain-game.jpg'
        } else if (data.weather[0].main == "Snow") {
            emoji = "fa-snowflake"
            typeWeather = "Snow"
            imgBackground = 'https://w0.peakpx.com/wallpaper/325/171/HD-wallpaper-snow-winter-mountains-nature-landscape-graphy-clouds-sky-cold-switzerland-titlis-engelberg.jpg'
        } else {
            emoji = "fa-sun"
            typeWeather = "Clear"
            imgBackground = 'https://w0.peakpx.com/wallpaper/243/23/HD-wallpaper-sunny-autumn-landscape-forest-autumn-mountains-nature-trees-sky-landscape.jpg'

        }
    } else {
        return (
            <div id="loader" class="loader">
                <svg version="1.0" id="cloudsNSun" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px" y="0px" width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"
                    xml:space="preserve">
                    <path fill="#29B6F6"
                        d="M70,70v-6.668h3.333c5.515,0,10-4.484,10-10.002c0-5.514-4.485-10-10-10h-5.169 c-0.84-7.479-7.129-13.332-14.831-13.332c-11.045,0-20,8.951-20,20h-10c-3.679,0-6.667,2.988-6.667,6.666	c0,3.674,2.988,6.668,6.667,6.668h10V70h-10C15.971,70,10,64.029,10,56.666s5.971-13.334,13.333-13.334h4.206 c2.969-11.498,13.373-20,25.794-20c9.015,0,16.737,5.502,20,13.334C82.539,36.666,90,44.127,90,53.332 C90,62.539,82.539,70,73.333,70H70z" />
                    <path fill="#E1F5FE"
                        d="M33.333,70v-6.668h-10c-3.679,0-6.667-2.994-6.667-6.668c0-3.678,2.988-6.666,6.667-6.666h10 c0-11.049,8.955-20,20-20c7.702,0,13.991,5.854,14.831,13.332h5.169c5.515,0,10,4.486,10,10c0,5.518-4.485,10.002-10,10.002H70V70 H33.333z" />
                    <polygon fill="orange"
                        points="60,46.667 47.779,46.667 40,70 50,70 43.333,90 63.334,63.333 53.334,63.333 " />
                    <polygon fill="#29B6F6" points="14.447,76.667 10,90 17.028,90 21.474,76.667 " />
                    <polygon fill="#29B6F6" points="29.638,76.667 25.195,90 32.223,90 36.667,76.667 " />
                    <polygon fill="#29B6F6" points="64.445,76.667 60,90 67.031,90 71.473,76.667 " />
                    <polygon fill="#29B6F6" points="79.643,76.667 75.195,90 82.221,90 86.668,76.667 " />
                    <path fill="red" d="M18.966,44.068c1.369-0.475,2.837-0.736,4.367-0.736h4.206c0.298-1.152,0.673-2.273,1.115-3.361
     C28.546,39.977,28.443,40,28.335,40c-6.439,0-11.668-5.225-11.668-11.666s5.229-11.667,11.668-11.667
     c5.983,0,10.86,4.524,11.534,10.325c1.965-1.156,4.092-2.066,6.339-2.689C44.37,16.121,37.076,10,28.335,10
     C18.21,10,10,18.21,10,28.334C10,35.031,13.606,40.871,18.966,44.068z" />
                </svg>
            </div>
        )
    }


    document.body.style.backgroundImage = `url(${imgBackground})`;
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundSize = 'cover'

    return (
        <div>
            <div className='container'>
                <h1>WeatherApp</h1>
                <form onSubmit={handleSubmit}>
                    <div className='input-bar'>
                        <input
                            type="search"
                            className='input-btn'
                            placeholder='Search for a City'
                            name='search'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            required
                        />
                        <button
                            className='search-btn'
                            type='submit '>Go!</button>
                    </div>
                </form>
                <h2>{data.name}{','} {data.sys?.country}</h2>
                <div className='list-container'>
                    <ul className='list'>
                        <li className='weatherType'>{typeWeather}</li>
                        <li>Temp: {areDegrees ? centigrades : farenheit}{' '}{areDegrees ? '°C' : '°F'}</li>
                        <li>Pressure: {isHectoPascals ? hectoPascals : mmHg}{' '}{isHectoPascals ? 'hPa' : 'mmHg'}</li>
                        <li>Wind speed: {data.wind.speed}{' m/s'}</li>
                    </ul>
                </div>

                <i className={`fas ${emoji} fa-5x`}></i>
                <div className='buttons'>
                    <button className='btn' onClick={changeDegrees}>°C / °F</button>
                    <button className='btn' onClick={changePressure}> hPa / mmHg </button>
                </div>
            </div>
        </div>
    );
};

export default SearchWeather;