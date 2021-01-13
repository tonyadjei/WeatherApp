const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();

const updateUI = (data) => {

	// const cityDetails = data.cityDetails;
	// const weather = data.weather;

	//destructuring properties (an easy way to get properties from an object and then store them in a constant of the same name)
	const {cityDetails, weather} = data;

	// update the details div template 
	details.innerHTML = `
		<h5 class="my-3">${cityDetails.EnglishName}</h5>
		<div class="my-3">${weather.WeatherText}</div>
		<div class="display-4 my-4">
			<span>${weather.Temperature.Metric.Value}</span>
			<span>&deg;C</span>
		</div>
	`; 

	//update the night/day icon images
	const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
	icon.setAttribute('src', iconSrc);

	let iconFile = weather.IsDayTime ? 'img/day.svg':'img/night.svg'; //ternary operator, when you have an if..else statement and you are checking for only one condition
	time.setAttribute('src', iconFile);

	if(card.classList.contains('d-none')){
		card.classList.remove('d-none');
	}
};


form.addEventListener('submit', e => {
	//prevent default action
	e.preventDefault();

	// get city value from input, and remove whitespaces with .trim() method
	const city = form.city.value.trim();
	form.reset(); //clear form input elements

	//update the ui with the new city
	forecast.updateCity(city) 
	.then(data => updateUI(data))
	.catch(err => console.log(err));

	//set local storage
	localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
	forecast.updateCity(localStorage.getItem('city'))
		.then(data => updateUI(data))
		.catch(err => console.log(err));
}  