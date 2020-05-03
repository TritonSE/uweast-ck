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
        let parent = $(this).parent().get(0);
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
            if (responses[key].name === 'instructions' && responses[key].value !== '') {
                instructions = responses[key].value;
            }
        }

        const item = new Item(curName, curPrice, size, sides, instructions, quantity);
        curName = '';
        curPrice = 0.0;

        clearForms(); 
        
        $.post("/menu", {item}).then(function() {
            $('.modal').modal('hide');
        }); 

    })

    $('#cart-submit').click(function() {
        $.post("/menu/getCart").then(function(res) {
            var subtotal = calculateSubtotal(res);
            var tax = calculateTax(subtotal);
            var total = calculateTotal(subtotal);
            console.log(res, subtotal, tax, total);
            $.post("/menu/submitOrder", {res, subtotal, tax, total});
        });
    })
}
