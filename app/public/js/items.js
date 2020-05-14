class Item {
    constructor(id, name, description, category) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
    }
}


$('.random').click(function() {
    const form = $('.createItem');
    var responses = form.serializeArray();

    if (!form[0].checkValidity()) {
        return;
    };

    var id = '';
    var name = '';
    var description = '';
    var category = '';

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
        if (responses[key].name === 'vegan' && responses[key].value !== '') {
            vegan = responses[key].value;
        }
    }

    const item = new Item(id, name, description, category);

    $.post("/menu", {item}).then(function() {
    })

})