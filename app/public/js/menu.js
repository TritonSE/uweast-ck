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
    /*const button = this.document.getElementById('sendMenuData'); /// Example code
    const para = this.document.getElementById('menuInfo');
    
    // Post request to page.
    button.onclick = function() {
        console.log("clicked!");
        $.post('/menu', {
            menuExample: 'fries',
            otherMenuExample: 'moreFries'
        }, function(data) {
            console.log(data);
        });

        para.innerText = 'Data sent!';
    }*/

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
        var parent = $(this).parent().get(0);
        curName = $(this).siblings()[0].innerText;  
            // [0] matches to item-name
        curPrice = parseFloat(($(this).siblings()[2].innerText).substring(1)); 
            // [2] matches to item-price
        $('#itemModal-' + parent.id).modal('show');
        quantity = 1;
        setQuantity(quantity);
    });

    function setQuantity(quant) {
        $('.quantity').html(quant);
        $('.hidden-input').val(quant);
        $('.cart-text').html("Add "+quant+" to cart");
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

    $('.submitOrder').submit(function(event) {
        const form = $('.submitOrder');
        var responses = form.serializeArray();

        if (!form[0].checkValidity()) {
            return;
        };

        var size = '';
        var sides = [];
        var instructions = '';

        for (var key in responses) {
            if (responses[key].name === 'side') sides.push(responses[key].value);
            if (responses[key].name === 'size') size = responses[key].value;
            if (responses[key].name === 'instructions' && responses[key].value !== '') {
                instructions = responses[key].value;
            }
        }

        const item = new Item(curName, curPrice, size, sides, instructions, quantity);
        curName = '';
        curPrice = 0.0;

        console.log(item);
        
        $.post("/menu", item);  // this is the part that isn't working yet

        $('.modal').modal('hide');

        clearForms(); 
    });

    // submit payment function .then() {} --> calls submitOrder post request
}

