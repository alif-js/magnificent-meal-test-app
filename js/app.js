const loadMeals = searchText => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    console.log(meals)
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = '';
    meals.forEach(meal => {
        const foodDiv = document.createElement('div');
        foodDiv.innerHTML = `
            <div class="card mb-3 mx-auto" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural
                                lead-in to additional content. This content is a little bit longer.</p>
                            <button onclick="modalButtonFunction('${meal.idMeal}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#displayFoodDetails">
                            View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    `;
        foodContainer.appendChild(foodDiv);
    });
}

const searchFunction = () => {
    const searchText = document.getElementById('search-field').value;
    loadMeals(searchText);
}

const modalButtonFunction = idMeal => {
    console.log(idMeal)
    const loadMealDetails = () => {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        fetch(url)
            .then(res => res.json())
            .then(data => displayMealDetails(data))
    }

    const displayMealDetails = meal => {
        console.log(meal)
        document.getElementById('displayFoodDetailsLabel').innerText = meal.meals[0].strMeal;
        document.getElementById('displayFoodDetailsImage').innerHTML = `
            <img src="${meal.meals[0].strMealThumb}" class="img-fluid">
        `;
        document.getElementById('displayFoodDetailsCategory').innerText = `Category: ${meal.meals[0].strCategory}`;
        document.getElementById('displayFoodDetailsArea').innerText = `Area: ${meal.meals[0].strArea}`;
        document.getElementById('displayFoodDetailsInstructions').innerText = `Instructions: ${meal.meals[0].strInstructions}`;
        document.getElementById('displayFoodDetailsYouTube').innerText = `YouTube: ${meal.meals[0].strYoutube}`;
    }

    loadMealDetails();


}