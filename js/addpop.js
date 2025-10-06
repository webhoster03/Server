// Modal shell: keep class names the same as your CSS uses
const addpop = () => `
    <div class="add-pop-background" style="display:none"></div>
        <div class="main-pop-container" style="display:none">
        <div class="pop-close-container">
            <div class="pop-close-box">X</div>
        </div>
        <div class="add-pop-heading"></div>
        <div class="add-mian-pop-contant"></div>
    </div>

    <style>
        .add-pop-background{
            height: 100vh;
            width: 100%;
            background-color: black;
            position: absolute;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: .8;
            display:none;
        }
        .main-pop-container{
            background-color: white;
            position: absolute;
            border-radius: 5px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display:none;
        }
        .pop-close-container{
            height: var(--add-pop-up-height);
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
        .pop-close-box{
            height: 25px;
            width: 25px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: var(--close-button-text-color);
            cursor: pointer;
            font-family: 'Times New Roman', Times, serif;
        }

        .add-pop-heading{
            height: var(--add-pop-up-height);
            margin-top: calc(-1 * var(--add-pop-up-height));
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
        }
        <style>
`;

// Delegate close handlers so it works even if the DOM is injected later
$(document).on("click", ".pop-close-box, .add-pop-background", function () {
    $(".add-pop-background, .main-pop-container").hide();
    $("body").css("overflow", "auto");
    $(".add-pop-heading").empty();
    $(".add-mian-pop-contant").empty();
});