function handleEdit(event) {
    const item = JSON.parse(event);

    console.log(item);

    $("#editName").val(item.name)
    $("#editDescription").val(item.description)
    $("#editPrice").val(item.price)
    $("#editImage").val(item.image)
    $("#editCuisine").val(item.cuisine)
    $("#editIngredients").val(item.ingredients.join(", ").trim())

    $("#category" + item.category.replace(" ", '')).prop('checked', true);
    
    if (item.glutenFree) $("#editGlutenFree").prop('checked', true);
    if (item.vegetarian) $("#editVegetarian").prop('checked', true);
    if (item.vegan) $("#editVegan").prop('checked', true);
    
    $("#editItemSubmit").attr('value', item._id);

    console.log($("#editItemSubmit"))

    $("#editItemModal").modal("show");
}

function handleFetured(event) {
    
}