const mealDetail = document.querySelector(".meal-details-content");

getMealList = () => {
    let searchText = document.getElementById("search-input").value;
    fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`
    )
        .then((response) => response.json())

        .then((data) => {
            let html = "";
            if (data.meals) {
                const mealList = document.getElementById("meal");
                data.meals.forEach((meal) => {
                    html += `
          <div onclick ="getMealByID('${meal.idMeal}')" class = "meal-item" data-id = "${meal.idMeal}">
              <div class = "meal-img">
                  <img src = "${meal.strMealThumb}" alt = "food">
              </div>
              <div class = "meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href = "#" class = "recipe-btn">Get Recipe</a>
              </div>
          </div>
         `
                        ;
                    mealList.innerHTML = html;
                    console.log(html);
                });
            } else {
                const mealList = document.getElementById("meal");
                html = `<h1 style ="text-align:center">Sorry, we didn't find any meal!</h1>`;
                mealList.innerHTML = html;
            }

            console.log(html);
        });
};

getMealByID = (mealId) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const meal = data.meals[0];
            getIngredientList(meal);
        });
};

getIngredientList = (meal) => {
    const ingredients = [];
    for (let i = 1; i < 30; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]} `
            );
        } else {
            break;
        }
    }
    mealDetail.innerHTML = `
    <div class="meal-detail">
    <h1>${meal.strMeal}</h1>
    <img src="${meal.strMealThumb}" alt="food" />
    <div class="meal-ingredient">
        <h2>Ingredients</h2>
        <p>
        ${ingredients.map((ing) => `${ing}`).join()}
        </p>
    </div>
    </div>
    
     `;
};