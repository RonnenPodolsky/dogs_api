
const btnSelector = document.querySelector(".button-dog");
const imgSelector = document.querySelector("img");
const inputSelector = document.querySelector("#dog-input");
const allBreeds = document.querySelector("#dog-breeds");
const selectBreed = document.querySelector("select")

const getBreeds = () => {
    fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => {
      return response.json();
    })
    .then(data => {
      for (element in data.message){
          allBreeds.innerHTML += `<option value="${element}">${element}</option>`
      }
  });
}

const getDog = url => {
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(data => {
        imgSelector.src = data.message;
        return data
      })
}

getBreeds()

selectBreed.addEventListener('change', e => {
    e.preventDefault();
    const selectDog = selectBreed.options[selectBreed.selectedIndex].value;
    let url = `https://dog.ceo/api/breed/${selectDog}/images/random`;

    getDog(url)
})

btnSelector.addEventListener('click', e => {
    e.preventDefault();
    let breed = inputSelector.value;
    let url = `https://dog.ceo/api/breed/${breed}/images/random`;
    getDog(url)
    inputSelector.value = ""

})

