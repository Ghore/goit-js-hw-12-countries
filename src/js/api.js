const baseUrl = 'https://restcountries.eu/rest/v2';

export const makeFetch = cityName => {
return fetch(`${baseUrl}/name/${cityName}`)
.then(res =>res.json())
.then(data=>data)
.catch(error => console.error('ERROR',error));
};
