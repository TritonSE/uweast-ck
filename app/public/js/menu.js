window.onload = function() {
    var quantity = 1;
    $('#modal-trig').click(function() {
        $('#itemModal').modal('show');
        setQuantity(1);
    });

    function setQuantity(quant) {
        $('#quantity').html(quant);
        $('#cart-text').html("Add "+quant+" to cart");
    }

    $('#subtract').click(function() {
        setQuantity(--quantity);
    });

    $('#add').click(function() {
        setQuantity(++quantity);
    });

    $('#itemModal').on('hidden.bs.modal', function () {
        quantity = 1;

        $('.form-check-input').prop('checked', false);
        $('#specialInstructionsText').val("");
    });
}

$("#submitOrder").submit(function(event) {
    const form = $('#submitOrder');
    if (!form[0].checkValidity()) {
        return;
    };

    event.preventDefault();
    const responses = form.serializeArray();
    const quantity = parseInt(document.getElementById('quantity').innerText);
    const size = responses[0].value;

    var sides = []
    for (var key in responses) {
        if (responses[key].name === 'side') sides.push(responses[key].value);
    }
    
    $.post("/menu", {
        size,
        sides,
        quantity
    });
});