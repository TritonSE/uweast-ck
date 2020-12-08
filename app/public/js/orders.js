/*class Order {
    constructor(id, name, items, completed) {
        this.id = id;
        this.name = name;
        this.items = items;
        this.completed = completed;
    }

}*/
function handleDisplay(event) {
    const order = JSON.parse(event);
    console.log(order);
    $("#displayItems").val(order.items.name.join(", ").trim())
    $("#completeOrderSubmit").val(order._id);
    console.log(order.items[0])
}
/*$('.completed-button').click(function(){

)}*/


