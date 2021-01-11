const form = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');


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

const updateCity = async (city) => { //make a function async if it makes use of other async functions in its body

	const cityDetails = await getCity(city);
	const weather = await getWeather(cityDetails.Key);

	return { //when you need to return more than one thing, you can return an object
		//whose properties are those. Now the syntax below is returnin an object alright
		//but we are using Object Shorthand Notation(which can be used when the property and value of an object have the same name, in which case we remove the property name, including the ':', remaining only the value name)
		cityDetails, weather };
};


form.addEventListener('submit', e => {
	//prevent default action
	e.preventDefault();

	// get city value from input, and remove whitespaces
	const city = form.city.value.trim();
	form.reset(); //clear form input elements

	//update the ui with the new city
	updateCity(city) 
	.then(data => updateUI(data))
	.catch(err => console.log(err));

	//set local storage
	localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
	updateCity(localStorage.getItem('city'))
		.then(data => updateUI(data))
		.catch(err => console.log(err));
}  