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


    fields.forEach(field => {

        field.addEventListener("click", (e) => {

            const index = e.target.dataset.index;

            if (gameBoard.getField(index) !== "") return;

            gameController.playRound(index);

            renderBoard();

            console.log(gameBoard.board);

        })

    })

    restart.addEventListener("click", () => {
        gameBoard.reset();
        gameController.reset();
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

    return { messagetext };

})();


const gameController = (() => {

    const playerX = player("X");
    const playerO = player("O");

    let roundCount = 1;

    const modal = document.querySelector(".modal");

    const popupMessage = document.querySelector(".popupMessage");

    const playRound = (index) => {

        gameBoard.setField(index, currentPlayerSign());
        roundCount++;
        displayController.messagetext(currentPlayerSign());
        if (roundCount > 9) {
            gameOver();
        }

    }

    const currentPlayerSign = () => {

        if (roundCount % 2 == 0) return playerO.getSign();
        return playerX.getSign();

    }

    const gameOver = () => {

        modal.style.display = "block";

        popupMessage.innerHTML = "Yikes!😬<br>Its a Tie!";

        document.querySelector(".close-btn").addEventListener("click", closePopup);

    }

    const closePopup = () => {
        modal.style.display = "none";
    }

    const reset = () => {
        roundCount = 1;
        displayController.messagetext(currentPlayerSign());
        modal.style.display = "none";

    }

    return { playRound, gameOver ,reset};

})();


