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
    
    const showBtn = this.document.getElementById('modal-trig');
    var quantity = 1;

    showBtn.onclick = function() {
        $('#itemModal').modal('show');
        quantity = 1;
    }

    const subtract = this.document.getElementById('subtract');
    const add = this.document.getElementById('add');
    var span = this.document.getElementById('quantity');
    var cart = this.document.getElementById('cart-text');

    subtract.onclick = function() {
        if (quantity > 1) {
            span.innerHTML = --quantity;
            cart.innerHTML = "Add "+quantity+" to cart";
            console.log("subtracted quantity");
        } else {
            console.log("tried to subtract from 1");
        }
    }

    add.onclick = function() {
        span.innerHTML = ++quantity;
        cart.innerHTML = "Add "+quantity+" to cart";
        console.log("added quantity");
    }

    $('#itemModal').on('hidden.bs.modal', function () {
        quantity = 1;
        span.innerHTML = quantity;
        cart.innerHTML = "Add "+quantity+" to cart";
        console.log("cleared quantity")
    })
}