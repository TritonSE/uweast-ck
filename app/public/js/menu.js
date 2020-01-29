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

    var quantity = 1;
    $('#modal-trig').click(function() {
        $('#itemModal').modal('show');
        setQuantity(1);
    });

    function setQuantity(quant) {
        console.log("quantity is "+quant)
        $('#quantity').html(quant);
        $('#cart-text').html("Add "+quant+" to cart");
        console.log("set quantity to "+quant);
    }

    $('#subtract').click(function() {
        if (quantity > 1) {
            setQuantity(--quantity);
        } else {
            console.log("tried to subtract from 1");
        }
    });

    $('#add').click(function() {
        setQuantity(++quantity);
    });

    $('#itemModal').on('hidden.bs.modal', function () {
        quantity = 1;

        $('.form-check-input').prop('checked', false);
        console.log("cleared radio and checkbox");

        $('#specialInstructionsText').val("");
    })
}