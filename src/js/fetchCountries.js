import { makeFetch } from './api';
import countryTemplate from '../tempates/contryTempalate.hbs';
import * as _ from 'lodash';
import PNotify from 'pnotify/dist/es/PNotify.js';
import 'pnotify/dist/PNotifyBrightTheme.css';

const refs = {
  input: document.querySelector('#myInput'),
  countryList: document.querySelector('#countryList'),
};
refs.input.addEventListener(
  'input',
  _.debounce(() => showCountry(), 500),
);

function showCountry() {
  const inputValue = refs.input.value;
  if (inputValue.length === 0) return;

  makeFetch(inputValue).then(data => {
    if (data.length > 10) {
      const notice = PNotify.notice({
        title: 'Click Close Notice',
        text: 'Click me anywhere to dismiss me.',
        modules: {
          Buttons: {
            closer: false,
            sticker: false,
          },
        },
      });
      notice.on('click', function () {
        notice.close();
      });
      return;
    } else if (data.length === 1) {
      createTemplate(data[0]);
      PNotify.closeAll();
    } else if (data.length > 1) {
      renderCountryList(data);
      PNotify.closeAll();
    }
  });
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => `<li class="country-name_item">${country.name}</li>`)
    .join('');

  return (refs.countryList.innerHTML = markup);
}

function createTemplate(country) {
  return (refs.countryList.innerHTML = countryTemplate(country));
}
