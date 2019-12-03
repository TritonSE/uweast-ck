window.onload = function() { 
    const button = this.document.getElementById('sendMenuData');
    const para = this.document.getElementById('menuInfo');
    
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