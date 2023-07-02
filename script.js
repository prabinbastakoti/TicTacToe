// Create Player Using this object with different signs assign to each
const player = (sign) => {

    this.sign = sign;

    const getSign = () => {
        return sign;
    }

    return { getSign };
}


const gameBoard = (() => {

    const board = ["", "", "", "", "", "", "", "", ""];

    const setField = (index, sign) => {
        board[index] = sign;
    }

    const getField = (index) => {
        return board[index];
    }

    const reset = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return { setField, getField, board, reset };

})();


const displayController = (() => {


    const fields = document.querySelectorAll(".field");
    const message = document.querySelector("#currentPlayer");
    const restart = document.getElementById("newGame");
    const popupMessage = document.querySelector(".popupMessage");
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".close-btn");



    fields.forEach(field => {

        field.addEventListener("click", (e) => {

            const index = e.target.dataset.index;

            if (gameBoard.getField(index) !== "") return;

            gameController.playRound(index);

            renderBoard();

            console.log(gameBoard.board);

        })

    })

    closeBtn.addEventListener("click", () => {
        popupDisplay("none");
    })

    restart.addEventListener("click", () => {
        gameBoard.reset();
        gameController.reset();
        reset();
        renderBoard();

    })

    const renderBoard = () => {

        let i = 0;

        fields.forEach((field) => {
            field.textContent = gameBoard.getField(i);
            i++;
        })

    }

    const messagetext = (m) => {
        message.textContent = ` ${m} `;
    }

    const popupDisplay = (display) => {
        modal.style.display = display;
    }

    const setPopupMessage = (message) => {
        popupMessage.innerHTML = message;
    }

    const reset = () => {
        message.textContent = ' X ';
        popupDisplay("none");
    }

    return { messagetext, setPopupMessage , popupDisplay};

})();


const gameController = (() => {

    const playerX = player("X");

    const playerO = player("O");

    let roundCount = 1;

    let isOver = false;


    const playRound = (index) => {

        gameBoard.setField(index, currentPlayerSign());

        if (roundCount === 9) {
            isOver = true;
            displayController.popupDisplay("block");
            displayController.setPopupMessage("Yikes!😬<br>Its a Tie!");
            return;
        }

        roundCount++;
        displayController.messagetext(currentPlayerSign());
    }

    const currentPlayerSign = () => {

        if (roundCount % 2 == 0) return playerO.getSign();
        return playerX.getSign();

    }

    const getIsOver = () => {
        return isOver;
    }

    const reset = () => {
        roundCount = 1;
        displayController.popupDisplay("none"); 
        isOver = false;
    }

    return { playRound, getIsOver, reset };

})();


