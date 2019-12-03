window.onload = function() { 
    const button = this.document.getElementById('sendData');
    const para = this.document.getElementById('info');
    
    // Post request to page.
    button.onclick = function() {
        console.log("clicked!");
        $.post('/home', {
            homeExample: 'uweast',
            otherHomeExample: 'uweast-ck'
        }, function(data) {
            console.log(data);
        });

        para.innerText = 'Data sent!';
    }
}