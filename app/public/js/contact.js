window.onload = function() { 
    const button = this.document.getElementById('button');
    const message = this.document.getElementById('message');
    const name = this.document.getElementById('name');

    button.onclick = function() { 
        console.log("message submitted!");
        console.log(message);
        console.log(name);
    }
}