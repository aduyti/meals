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
    const h2 = document.createElement("h2");
    h2.innerText = errorMessage;
    h2.className = "text-danger text-center fst-italic";

    document.getElementById('search-result-block').appendChild(h2);
}
const creatMealCard = (id, area, category, name, thumb) => {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'col-3 mb-3';
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
    if (meal) {
        updateMealDetail(meal[0]);
    }
    else {
        showError("No information");
    }
}
const updateMealDetail = (meal) => {
    // { strArea, strCategory, strMealThumb, strMeal, strInstructions, strTags, strYoutube, strMeasure1, strIngredient1 }
    document.getElementById('staticBackdropLabel').innerText = meal.strMeal;
    document.getElementById('modalContent').innerText = '';
    const ingredientsList = document.createElement('ol');
    const ih6 = document.createElement("h6");
    ih6.innerHTML = '<br/>Ingredient';
    let i = 1;
    while (meal[`strIngredient${i}`].length > 0) {
        const ingredients = meal[`strIngredient${i}`] + " " + meal[`strMeasure${i}`];
        const list = document.createElement("li");
        list.innerText = ingredients;
        i++;
        ingredientsList.appendChild(list);
    }
    const img = document.createElement("img");
    img.src = meal.strMealThumb;
    img.width = 350;
    const rh6 = document.createElement("h6");
    rh6.innerHTML = "<br/>Recipe";
    const recipe = document.createElement("p");
    recipe.innerText = meal.strInstructions
    document.getElementById('modalContent').appendChild(img);
    document.getElementById('modalContent').appendChild(ih6);
    document.getElementById('modalContent').appendChild(ingredientsList);
    document.getElementById('modalContent').appendChild(rh6);
    document.getElementById('modalContent').appendChild(recipe);
    document.getElementById('youtube').addEventListener('click', () => {
        window.open(meal.strYoutube, '_blank');
    })
}

const loaderState = (destination, visibility) => {
    const loader = document.getElementById(destination);
    loader.style.visibility = visibility;
}