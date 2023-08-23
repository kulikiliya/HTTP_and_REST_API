import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_HbYY1KqMbjQNXatbIJfzQFpHx5Fg23kMUlHnsyE03TT8N7YOWY9RagC3Y5Jyf4Sf";
  
// const params = new URLSearchParams({
//     limit: 5,
//     has_breeds: 1,
    
// }).toString();

function fetchBreeds() {
   return axios.get('https://api.thecatapi.com/v1/breeds')
       .then(response => {
           const catsArray = response.data
           console.log(catsArray)
        return catsArray
  })
  .catch(error => {
      console.error(error); 
  });

}


 function fetchCatByBreed(breedId) {
    return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`).then(response => {
        console.log(response.data)
        return response.data;
    }).catch(error => {
      throw console.error(error); 
  });
}

export { fetchBreeds, fetchCatByBreed }

// selector.addEventListener('change', event => {

//     const selecorIdValue = event.currentTarget.value

//     if (cachedCatsData[selecorIdValue]) {
//         showCatImage(cachedCatsData[selecorIdValue])
//     } else {
       
//         fetchCatByBreed(selecorIdValue)
//             .then(showMyCat => {
//                 cachedCatsData[selecorIdValue] = showMyCat;
//                 showCatImage(showMyCat);
//             });
//     };
// });