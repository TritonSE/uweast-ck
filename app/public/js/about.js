window.onload = function() { 
    const button = this.document.getElementById('sendData');
    const para = this.document.getElementById('info');
    
    // Post request to page.
    button.onclick = function() {
        console.log("clicked!");
        $.post('/about', {
            example: 'text',
            otherExample: 'moreText'
        }, function(data) {
            console.log(data);
        });

        para.innerText = 'Data sent!';
    }
}