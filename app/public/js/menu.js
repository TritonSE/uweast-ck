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
    /**
     * Each parent element of the button clicked (class item-right) has an 
     * id of the item's name without whitespaces. Each of the modal boxes
     * is formatted as #itemModal-<item.name>. Each of them is shown
     * depending on which button is pressed
     */
    $(document).on('click', '#modal-trig', function() {
        var parent = $(this).parent().get(0);
        $('#itemModal-' + parent.id).modal('show');
        setQuantity(1);
    });

    function setQuantity(quant) {
        $('.quantity').html(quant);
        $('.cart-text').html("Add "+quant+" to cart");
    }

    $('.subtract').click(function() {
        if (quantity > 1) {
            setQuantity(--quantity);
        } 
    });

    $('.add').click(function() {
        console.log("add clicked");
        setQuantity(++quantity);
    });

    $('#itemModal').on('hidden.bs.modal', function () {
        quantity = 1;

        $('.form-check-input').prop('checked', false);
        $('#specialInstructionsText').val("");
    });

    $('#submitOrder').submit(function(event) {
        console.log("submit order");
        
        const form = $('#submitOrder');
        if (!form[0].checkValidity()) {
            return;
        };

        event.preventDefault();
        const responses = form.serializeArray();
        const quantity = parseInt(document.getElementById('quantity').innerText);
        const size = responses[0].value;
        const instructions = responses[responses.length - 1].value;

        var sides = []
        for (var key in responses) {
            if (responses[key].name === 'side') sides.push(responses[key].value);
        }
        
        $.post("/menu", {
            size,
            sides,
            quantity,
            instructions
        });

        $('#itemModal').modal('hide')
    });

    // submit payment function .then() {} --> calls submitOrder post request
}

