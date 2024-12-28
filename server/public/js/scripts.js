document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript is loaded');
});

window.onload = function () {
    var spinner = document.getElementById('spinner');
    
    // Simulate loading time (you can remove this in real projects)
    setTimeout(function () {
        spinner.classList.add('spinner-hidden'); // Hide the spinner after content loads
    }, 1000); // Adjust time as needed for your loading situation
};

