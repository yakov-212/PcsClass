// https://stackoverflow.com/questions/74843753/how-to-get-the-value-of-checked-radio-button
(function (){
    /* use strict */
    mealImage = document.querySelector('img')
    mealName = document.querySelector('h2')
    ingrediants = document.querySelector('#ingrediants')
    document.querySelectorAll('input[name="recipe-name"]').forEach(radio => {
        radio.addEventListener("change", () =>{
            GetMeal(radio.value)
        })
    })
    GetMeal(document.querySelector('input[name="recipe-name"]').value)
    div = document.querySelector('div')
    for (let index = 1; index < 21; index++) {
        const element = document.createElement('div');
        element.id = "div"+index
        div.appendChild(element)
    }
    async function GetMeal(meal){
        try{
        promisedMeal = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
        if (!promisedMeal.ok){
            throw new Error(promisiedMeal.message)
        }
        meal = await promisedMeal.json()
        console.log(meal.meals[0])
        mealImage.src = `${meal.meals[0].strMealThumb}/medium`
        mealName.innerText = meal.meals[0].strMeal
        let s = ""
        for (let index = 1; index < 21; index++) {
            document.querySelector(`#div${index}`).innerText = meal.meals[0][`strIngredient${index}`]+' '
            // ingrediants.appendChild(`${meal.meals[0][`strIngredient${index}`]}`)
            // s += `${meal.meals[0][`strIngredient${index}`]}`
        }
        // ingrediants.innerText = s
    }
    catch(e){
        console.log(`${e.message} ${e.error}`)
    }}
    
    
}())