// document.addEventListener('DOMContentLoaded', function() {
//     console.log('JavaScript is loaded');
// });



//     // Add click event to each menu item
    const menuItems = document.querySelectorAll('.menu a');
    const checkbox = document.getElementById('check');
    
    menuItems.forEach(item => {
        item.addEventListener('click', (event) => {
            // Prevent the default link behavior
            event.preventDefault();
    
            // Scroll to the section smoothly
            const targetId = item.getAttribute('href').substring(1); // Remove '#' to get the ID
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
    
            // Uncheck the checkbox to hide the menu
            checkbox.checked = false;
        });
    });
    
    

// window.onload = function () {
//     var spinner = document.getElementById('spinner');
    
//     // Simulate loading time (you can remove this in real projects)
//     setTimeout(function () {
//         spinner.classList.add('spinner-hidden'); // Hide the spinner after content loads
//     }, 1000); // Adjust time as needed for your loading situation
// };

// document.querySelectorAll(".menu a").forEach(item => {
//             item.addEventListener("click", () => {
//                 document.getElementById("#check").checked = false;
//             });
//         });


const menuBtn = document.getElementById("menu-btn");
        const closeBtn = document.getElementById("close-btn");
        const menu = document.getElementById("menu");
        const menuLinks = document.querySelectorAll("#menu a");

        // Hide menu initially
        //menu.style.display = "none";

        // Open menu on button click
        // menuBtn.addEventListener("click", () => {
        //     menu.style.display = "block";
        // });

        // // Close menu on close button click
        // closeBtn.addEventListener("click", () => {
        //     menu.style.display = "none";
        // });

        // Close menu when a menu item is clicked
        menuLinks.forEach(link => {
            link.addEventListener("click", () => {
                menu.style.display = "none";
            });
        });
