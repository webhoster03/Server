// $(document).ready(()=>{
//     // Hide side-div-bar and show sidenav-home-container
//     $(".side-nav-icon").on("click", function(){
//         $(".side-div-bar").animate({ opacity: 0 }, 500, function(){
//             $(this).css("visibility", "hidden");
//         });

//         $(".sidenav-home-container")
//             .css("display", "flex")
//             .hide()
//             .fadeIn(500);
//     });

//     // Reset when clicking .side-nav-icon-bar
//     $(".side-nav-icon-bar").on("click", function(){
//         $(".sidenav-home-container").fadeOut(500, function(){
//             $(this).css("display", "none"); // fully hide
//         });

//         $(".side-div-bar")
//             .css("visibility", "visible")  // make visible again
//             .animate({ opacity: 1 }, 500); // fade back in
//     });

// });


$(document).ready(() => {
    // Function to apply nav state from localStorage
    function applyNavState() {
        const navState = localStorage.getItem("navVisible");

        if (navState === "true") {
            // Show sidenav-home-container
            $(".side-div-bar").css({ visibility: "hidden", opacity: 0 });
            $(".sidenav-home-container")
                .css("display", "flex")
                .show();
        } else {
            // Show side-div-bar
            $(".sidenav-home-container").css("display", "none");
            $(".side-div-bar").css({ visibility: "visible", opacity: 1 });
        }
    }

    // Apply state when page loads
    applyNavState();

    // Hide side-div-bar and show sidenav-home-container
    $(".side-nav-icon").on("click", function () {
        $(".side-div-bar").animate({ opacity: 0 }, 500, function () {
            $(this).css("visibility", "hidden");
        });

        $(".sidenav-home-container")
            .css("display", "flex")
            .hide()
            .fadeIn(500);

        // Save state to localStorage
        localStorage.setItem("navVisible", "true");
    });

    // Reset when clicking .side-nav-icon-bar
    $(".side-nav-icon-bar").on("click", function () {
        $(".sidenav-home-container").fadeOut(500, function () {
            $(this).css("display", "none"); // fully hide
        });

        $(".side-div-bar")
            .css("visibility", "visible")
            .animate({ opacity: 1 }, 500);

        // Save state to localStorage
        localStorage.setItem("navVisible", "false");
    });
});
