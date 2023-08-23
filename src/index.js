//live_HbYY1KqMbjQNXatbIJfzQFpHx5Fg23kMUlHnsyE03TT8N7YOWY9RagC3Y5Jyf4Sf

import { fetchBreeds, fetchCatByBreed } from './cat-api'
import SlimSelect from 'slim-select'
import 'slim-select/dist/slimselect.css'
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const selector = document.querySelector('.breed-select');
const waitMessage = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');
const decr = document.querySelector('.cat-info')

selector.addEventListener('change', searchForCatById)

function createList() {

    waitMessage.classList.remove('is-hidden');
    selector.classList.add('is-hidden');
    errorMessage.classList.add('is-hidden');

fetchBreeds()
    .then(catsArray => {

    const catListRender = catsArray.map(({id, name}) => `<option value="${id}">${name}</option>`).join('');
      
    selector.innerHTML += catListRender;

        new SlimSelect({
            select: selector
        });

            waitMessage.classList.add('is-hidden');
            selector.classList.remove('is-hidden')


    }).catch(error => {
        waitMessage.classList.add('is-hidden');
        errorMessage.classList.remove('is-hidden');
      Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

}

createList();


function searchForCatById(event) {

  waitMessage.classList.remove('is-hidden');
    decr.classList.add('is-hidden')

    const selecorIdValue = event.currentTarget.value

    fetchCatByBreed(selecorIdValue).then(catData => {
        showCatInfo(catData)


        waitMessage.classList.add('is-hidden');
            decr.classList.remove('is-hidden');


    

    }).catch(error => {
     waitMessage.classList.add('is-hidden');
        Notify.failure('Oops! Something went wrong! Try reloading the page!')
        
    });
}


function showCatInfo(catData) {
    const { url } = catData[0]
    const { name, temperament, description } = catData[0].breeds[0];
    const catInfoString = `<div class='common-div'><img class="gallery__image" width = 500 src="${url}" alt="${name}" /> 
    <div class='text-div'> 
    <h2>${name}</h2>
    <p class='temp-text'>${temperament}<p>
    <p class='descr-text'>${description}</p>
    </div>
    </div>`;
    
  return decr.innerHTML = catInfoString;
}

Notify.init({
  width: '400px',
  position: 'left-top',
  distance: '50px',
    opacity: 1,
  closeButton: true
});
