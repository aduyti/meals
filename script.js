document.getElementById('search-button').addEventListener('click', () => {
    document.getElementById('search-result-block').innerHTML = '';
    const searchInput = document.getElementById('search-input');
    // const searchResult = document.getElementById('search-result-block');
    if (searchInput.value != '') {
        loadSearchResult(searchInput.value);
        searchInput.value = '';
    }
    else {
        showError("Write Something to Search.");
    }
})
const loadSearchResult = async (searchKey) => {
    const ras = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchKey}`);
    const data = await ras.json();
    showSearchResult(data.meals);
}
const showSearchResult = meals => {
    if (meals) {
        meals.forEach(meal => creatMealCard(meal.idMeal, meal.strArea, meal.strCategory, meal.strMeal, meal.strMealThumb))
    }
    else {
        showError("No results found.");
    }
}
const showError = errorMessage => {
    console.log(errorMessage);
}
const creatMealCard = (id, area, category, name, thumb) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-3 m-3';
    cardDiv.innerHTML = `<div class="card" style="width: 18rem;">
        <img src="${thumb}" class="card-img-top" alt="${name}">
        <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">Category: ${category}<br/>Region: ${area}</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="loadDetail(${id})">Details</button>
        </div>
    </div>`;
    document.getElementById('search-result-block').appendChild(cardDiv);
}
const loadDetail = async (id) => {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await res.json();
    showMealDetail(data.meals);
}
const showMealDetail = meal => {
    console.log(meal);
    if (meal) {
        updateMealDetail(meal);
    }
    else {
        showError("No information")
    }
}