const mainHeading = (buttonName, id, title) => {
    return `
        <div class="main-add-button-continer">
            <div class="main-add-button-box opne-add-pop" id=${id}>
                <button>
                    ${buttonName}
                </button>
            </div>
        </div>
        <div class="main-heading">
            ${title}
        </div>

        <style>
        .main-add-button-continer{
            height: 40px;
            display: flex;
            justify-content: flex-end;
            align-items: center;    
            /* border: 1px solid blue; */
        }
        .main-add-button-continer button{
            padding: 7px 13px;
            background-color: var(--main-button-color);
            color: var(--main-text-color);
            border: none;
            outline: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .main-heading{
            margin-top: -40px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 22px;
            font-family: emoji;
            font-weight: 500;
        }
        </style>
    `;
};
