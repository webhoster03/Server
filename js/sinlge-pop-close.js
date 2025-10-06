const singlePopClose = (message, staut=false) => {
    $(document).ready(function () {
        $('.background-pop-container').show();
        $('.show_massage_container').show();
        $('.massage-text').empty().text(message);
        if(staut===false){
            $(".alert-icon").empty().append(`<i class="fa-solid fa-triangle-exclamation"></i>`)
        }
        if(staut===true){
            $(".alert-icon").empty().append(`<i class="fa-solid fa-check"></i>`)
            $(".alert-icon").css("color","#228B22")
        }

        $('.login-pop-close-btn-container button').click(function () {
            $('.background-pop-container').hide();
            $('.show_massage_container').hide();
        });
    });
}