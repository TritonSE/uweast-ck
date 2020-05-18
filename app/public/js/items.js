class Item {
    constructor(id, name, description, price, category, image, cuisine, vegan, vegetarian, glutenFree, ingredients) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.category = category;
        this.image = image;
        this.cuisine = cuisine;
        this.vegan = vegan;
        this.vegetarian = vegetarian;
        this.glutenFree = glutenFree
        this.ingredients = ingredients;
        this.tags = tags;
    }
}


$('.submit-button').click(function() {
    const form = $('.new-item-form');
    var responses = form.serializeArray();

    if (!form[0].checkValidity()) {
        return;
    };

    var id = '';
    var name = '';
    var description = '';
    var price = '';
    var category = '';
    var image = '';
    var cuisine = '';
    var vegan = '';
    var glutenFree = '';
    var vegetarian = '';
    var ingredients = [];
    var tags = [];

    for (var key in responses){
        if (responses[key].name === 'id' && responses[key].value !== '') {
            id = responses[key].value;
        }
        if (responses[key].name === 'name' && responses[key].value !== '') {
            name = responses[key].value;
        }
        if (responses[key].name === 'description' && responses[key].value !== '') {
            description = responses[key].value;
        }
        if (responses[key].name === 'price' && responses[key].value !== '') {
            price = responses[key].value;
        }
        if (responses[key].name === 'category' && responses[key].value !== '') {
            category = responses[key].value;
        }
        if (responses[key].name === 'image' && responses[key].value !== '') {
            image = responses[key].value;
        }
        if (responses[key].name === 'cuisine' && responses[key].value !== '') {
            cuisine = responses[key].value;
        }
        if (responses[key].name === 'vegan' && responses[key].value !== '') {
            vegan = responses[key].value;
        }
        if (responses[key].name === 'glutenFree' && responses[key].value !== '') {
            glutenFree = responses[key].value;
        }
        if (responses[key].name === 'vegetarian' && responses[key].value !== '') {
            vegetarian = responses[key].value;
        }
        if (responses[key].name === 'ingredients' && responses[key].value !== '') {
            ingredients = responses[key].value;
        }
        if (responses[key].name === 'tags' && responses[key].value !== '') {
            tags = responses[key].value;
        }
    }

    const item = new Item(id, name, description, price, category, image, cuisine, vegan, vegetarian, glutenFree, ingredients, tags);

    $.post("/items", {item}).then(function() {
        window.location = '/items';
    })

})