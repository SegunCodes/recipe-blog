let addBtn = document.getElementById('addBtn');
let ingredientList = document.querySelector('.ingredientList');
let ingredientDiv = document.querySelector('.ingredientDiv');

addBtn.addEventListener("click", function(){
    let newIngredients = ingredientDiv.cloneNode(true);
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredients);
})