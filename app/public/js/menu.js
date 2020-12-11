class Item {
    constructor(name, price, size, sides, special, amt) {
        this.name = name;
        this.price = price;
        this.size = size;
        this.sides = sides;
        this.instructions = special;
        this.quantity = amt;
    }
}

window.onload = function() {

    /* Every menu category item is associated with a particular class that matches
    the id of the filter item element. 
    
    If that id is whole menu (so if the whole menu filter item is clicked), then we 
    want to check if the menu item is already on. If it is, we simply remove that status.
    If it is not on, then we turn off all the other filter items and show every menu category.

    If the id matches a particular category and it's already turned on, then we hide the item
    (with 1 exception -- where every other item is already off -- then we show all items)
    If the id is turned off, then we hide all other categories except ones that have already 
    been turned on by the user. Those stay. 
    */

    $('.filter-item').click(function() {
        let clickClass = this.id;
        if (this.id === 'whole-menu') {
            if ($(this).hasClass('on')) {
                $(this).removeClass('on');
            } else {
                $('.filter-item').removeClass('on');
                $(this).addClass('on');
                $('.menu-category').show();
            }
        } else {
            if ($(this).hasClass('on')) {
                $('.'+clickClass).hide();
                $(this).removeClass('on');
                var counter = 0;
                $('.filter-item').each(function(i, obj) {
                    let objClass = obj.id;
                    if (!$('#'+objClass).hasClass('on')) {
                        counter++;
                    }
                });
                if (counter == 5) {
                    $('.menu-category').show();
                }
            } else {
                $('#whole-menu').removeClass('on');
                $('.menu-category').hide();
                $('.'+clickClass).show();
                $('.filter-item').each(function(i, obj) {
                    let objClass = obj.id;
                    if ($('#'+objClass).hasClass('on')) {
                        $('.'+objClass).show();
                    }
                })
                $(this).addClass('on');
            }
        }
        
    });

    /* Functions to handle adding/subtracting quantity of items to cart */
    // NOTE: MAKE MORE EFFICIENT, CLEANER
    var quantity = 1;
    var curName = '';
    var curPrice = 0.0;

    /**
     * Each parent element of the button clicked (class item-right) has an 
     * id of the item's name without whitespaces. Each of the modal boxes
     * is formatted as #itemModal-<item.name>. Each of them is shown
     * depending on which button is pressed
     * 
     * siblings key
     * 0 - item-name
     * 1 - item-cuisine
     * 2 - item-price
     */
    $(document).on('click', '.modal-trig', function() {
        let parent = $(this).parent().get(0);
        curName = $(this).siblings()[0].innerText;  
            // [0] matches to item-name
        curPrice = parseFloat(($(this).siblings()[2].innerText).substring(1)); 
            // [2] matches to item-price
        $('#itemModal-' + parent.id).modal('show');
        // quantity = 1;
        setQuantity(quantity);
        setInstructions('');
        clearForms();
    });

    // resets the modal every time it is clicked off
    // $('#itemModal').on('hide.bs.modal', function() {
    //     clearForms();
    //     setQuantity(1);
    // })



    




    function setSize(size) {
        var sizes = document.forms['submitOrder'].elements['size'];
        for (i = 0; i < sizes.length; i++) {
            if (size == sizes[i].value) {
                document.getElementsByName('size')[i].checked = true;  
                break;
            }
        }
    }

    function setSides(sides) {
        var allSides = document.forms['submitOrder'].elements['side'];
        for (i = 0; i < sides.length; i++) {
            for (j = 0; j < allSides.length; j++) {
                if (sides[i] == allSides[j].value) {
                    document.getElementsByName('side')[j].checked = true;
                }
            }
        }
    }

    function setInstructions(instructions) {
        $("textarea[name='special']").val(instructions);
    }

    function setQuantity(quant) {
        $('.quantity').html(quant);
        $('.hidden-input').val(quant);
        $('.cart-text').html("Add "+quant+" to cart");
    }

    function calculateSubtotal(array) {
        let subtotal = 0.0;
        for (const element in array['cart']) {
            const item = array['cart'][element];
            subtotal += item.quantity*item.price;
        }
        return subtotal;
    }

    function calculateTax(subtotal) {
        return parseFloat((0.08*subtotal).toFixed(2));  // CA tax is 8%
    }

    function calculateTotal(subtotal) {
        return parseFloat((subtotal+parseFloat(calculateTax(subtotal))).toFixed(2));   // CA tax is 8%
    }

    $('.subtract').click(function() {
        if (quantity > 1) {
            setQuantity(--quantity);
        } 
    });

    $('.add').click(function() {
        setQuantity(++quantity);
    });

    $('#itemModal').on('hidden.bs.modal', function () {
        quantity = 1;

        $('.form-check-input').prop('checked', false);
        $('#specialInstructionsText').val("");
    });

    function clearForms() {
        $(':input').not(':button, :submit, :reset, :hidden, :checkbox, :radio').val('');
        $(':checkbox, :radio').prop('checked', false);
    }

    $('.submit-btn').click(function() {
        const form = $('.submitOrder');
        let responses = form.serializeArray();

        if (!form[0].checkValidity()) {
            return;
        };

        let size = '';
        let sides = [];
        let instructions = '';

        for (var key in responses) {
            if (responses[key].name === 'side') sides.push(responses[key].value);
            if (responses[key].name === 'size') size = responses[key].value;
            if (responses[key].name === 'special' && responses[key].value !== '') {
                instructions = responses[key].value;
            }
        }

        const item = new Item(curName, curPrice, size, sides, instructions, quantity);
        curName = '';
        curPrice = 0.0;

        clearForms(); 
        
        $.post("/menu/addCart", {item}).then(function() {
            $('.modal').modal('hide');
            window.location.href = "/menu";
        }); 
    })

    // remove item
    $(document).on("click", ".remove-item", function() {
        var index = $(this).attr('id');
        $.post("/menu/removeCart", {index}).then(function() {
            window.location.href = "/menu";
        });
    })

    // edit item
    $(document).on("click", ".edit-item", function() {
        var index = $(this).attr('id');

        // open up auto filled modal
        $.post("menu/getCart").then(function(res) {
            var item = res['cart'][index];
            $('#editModal').modal('show');
            $('#editModalLabel').text(index + ". Edit " + item['name']);
            setSize(item['size']);
            setSides(item['sides']);
            setInstructions(item['instructions']);
            setQuantity(item['quantity']);
        })
    })

    // edit item submit
    $('.edit-btn-submit').click(function() {
        var index = $('#editModalLabel').text().substring(0, 1);
        $.post("menu/getCart").then(function(res) {
            var foodItem = res['cart'][index];

            const form = $('.editCart');
            let responses = form.serializeArray();

            // let itemName = foodItem['name'];
            // let itemPrice = foodItem['price'];
            curName = foodItem['name'];
            curPrice = foodItem['price'];
            let size = '';
            let sides = [];
            let instructions = '';

            for (var key in responses) {
                if (responses[key].name === 'side') sides.push(responses[key].value);
                if (responses[key].name === 'size') size = responses[key].value;
                if (responses[key].name === 'special' && responses[key].value !== '') {
                    instructions = responses[key].value;
                }
            }

            // add new item
            const item = new Item(curName, curPrice, size, sides, instructions, quantity);
            curName = '';
            curPrice = 0.0;
            $.post("/menu/addCart", {item}).then(function() {
                $('.modal').modal('hide');
                $('.modal-backdrop').remove();
                window.location.href = "/menu";
            }); 
        })

        // remove old item
        $.post("/menu/removeCart", {index});
    })

    $('#cart-modal').click(function() {
        $('#cart-items-modal').html('');
        $.post("/menu/getCart").then(function(res) {
            
            for (let index = 0; index < res['cart'].length; index++) {
                var tr = document.createElement('tr');
                const element = res['cart'][index];
                tr.id = element['name'].split(' ').join('_');
                const size = '<dd><b>Size: </b>' + element['size'] + '</dd>';
                const sides = '<dd><b>Sides: </b>' + element['sides'] + '</dd>';
                const instructions = '<dd>' + element['instructions'] + '</dd>';
                tr.innerHTML += '<td>' + element['name'] + '</td>';
                tr.innerHTML += '<td>' + element['quantity'] + '</td>';
                tr.innerHTML += '<td> <button id="' + index + '" type="button" class="btn btn-primary edit-item">Edit</button> </td>';
                tr.innerHTML += '<td> <button id="' + index + '" type="button" class="btn btn-danger remove-item" data-dismiss="modal">&times;</button> </td>';
                tr.innerHTML += '<td> $' + element['quantity'] * element['price'] + '</td>';
                document.getElementById('cart-items-modal').appendChild(tr);
            }
            var subtotal = document.createElement('div');
            subtotal.innerHTML += "<p>Subtotal: " + calculateSubtotal(res) + "</p></div>";
            document.getElementById('cart-items-modal').appendChild(subtotal);
        });
    })
}
