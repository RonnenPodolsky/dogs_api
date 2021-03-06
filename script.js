const btnSelector = document.querySelector(".button-dog");
const imgSelector = document.querySelector("img");
const inputSelector = document.querySelector("#dog-input");
const allBreeds = document.querySelector("#dog-breeds");
const selectBreed = document.querySelector("select")

const updateSelectBreed = (breeds) => {
    for (const breed of breeds){
        allBreeds.innerHTML += `<option value="${breed}">${breed}</option>`
    }
}

const getBreeds = async (url) => {
    const response = await fetch(url)
    const data = await response.json()
    return Object.keys(data.message)
}

const getDog = async url => {
    try {
        const response = await fetch(url)
        const data = await response.json();
        if (data.status === 'error'){
            throw data.message;
        }
        imgSelector.src = data.message;
    } catch (err) {
        alert(`there was an error: ${err}`)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getBreeds('https://dog.ceo/api/breeds/list/all').then(breeds => updateSelectBreed(breeds))
})

selectBreed.addEventListener('change', e => {
    e.preventDefault();
    const selectDog = selectBreed.options[selectBreed.selectedIndex].value;
    const url = `https://dog.ceo/api/breed/${selectDog}/images/random`;
    getDog(url)
    inputSelector.value = ""
})

btnSelector.addEventListener('click', e => {
    e.preventDefault();
    const breed = inputSelector.value;
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    getDog(url)
    inputSelector.value = ""
})