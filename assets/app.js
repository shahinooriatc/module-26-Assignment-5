// 'use strict';
const data_container = document.getElementById('foods');
const searchBtn = document.getElementById('searchBtn');
const warning = document.getElementById('warning');
// Search Button Click & Display warning for input must..
searchBtn.addEventListener('click', function () {
    const searchItem = document.getElementById('search-item').value;
    data_container.innerHTML = '';
    if (searchItem === '') {
        warning.style.display = 'block';
    } else {
        getFood(searchItem);
        warning.style.display = 'none';
    }
});
// fatch foods data details from the  database... by API calling...
const displayDetails = name => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${name}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            findFoodInfo(data.meals[0]);
            console.log(data.meals[0]);
        });
};
// Each & Every Foods Info.....
const findFoodInfo = food => {
// Get all ingredients from the objects Up to 25 item.
     const ingredients = [];
     for (let i = 1; i <= 25; i++) {
         if (food[`strIngredient${i}`]) {
             ingredients.push(`${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}`);
         } else {
// Stop if there are no more ingredients
             break;
         }
     }
// Each Food Details.....
    const foodDetailsDiv = document.getElementById('foodsDetails');
    foodDetailsDiv.innerHTML = `
    <img class="img-fluid rounded mb-4" src="${food.strMealThumb}" alt="">
    <h4>${food.strMeal}</h4>
    
    <h5 class="pt-3 pb-2"><i class="icon-fire icons"></i> Ingredients</h5>
    <ul class="list-unstyled mb-0">${ingredients.map((ingredient) => `<li><i class="icon-check icons"></i>${ingredient}</li>`).join('')}</ul>

`;
};

function getFood(mealId) {
//MainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem.value}`;
    const mainApi = `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealId}`;

    fetch(mainApi)
        .then(res => res.json())
        .then(data => {
            displayFoods(data.meals);
        });

    const displayFoods = foods => {
        const foodsDiv = document.getElementById('foods');
        if (foods != null) {
            foods.map(food => {
                const foodDiv = document.createElement('div');//make div into the food-area..
                foodDiv.className = 'col-md-3';// 
                const foodInfo = `
                        <div onclick="displayDetails('${food.idMeal}')" class="border rounded text-center h-100" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img class="img-fluid rounded-top" src="${food.strMealThumb}" alt="">
                        <h4 class="h5 py-4 px-2 mb-0">${food.strMeal}</h4>
                        </div>
                    `;
                foodDiv.innerHTML = foodInfo;
                foodsDiv.appendChild(foodDiv);// Add food into div from API..
            });
        } else {
            warning.style.display = 'block';
        }
    };
}
