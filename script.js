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
    const restart = document.getElementById("newGame");
    const popupMessage = document.querySelector(".popupMessage");
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".close-btn");
    const heading = document.querySelector(".heading");


    fields.forEach(field => {

        field.addEventListener("click", (e) => {

            const index = e.target.dataset.index;

            if (gameBoard.getField(index) !== "") return;

            gameController.playRound(index);

            renderBoard();

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


    const currentPlayerText = (m) => {
        if (m == "Draw") {
            heading.innerHTML = "It's a Draw";
        } else {
            heading.innerHTML = `Player ' ${m} ' Turn`;
        }
    }

    const popupDisplay = (display) => {
        modal.style.display = display;
    }

    const setPopupMessage = (winner) => {
        if (winner == "Draw") {
            popupMessage.innerHTML = "Yikes!😬<br>Its a Tie!";
        } else {
            popupMessage.innerHTML = `Congratulations on your well deserved win Player '${winner}'! <br>You're amazing! 🎉`;
        }
        
    }

    const reset = () => {
        popupDisplay("none");
        setPopupMessage("");
        heading.innerHTML = "Player ' X ' Turn";
    }

    return { currentPlayerText, setPopupMessage , popupDisplay };

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
            displayController.setPopupMessage("Draw");
            displayController.currentPlayerText("Draw");
            return;
        }

        roundCount++;
        displayController.currentPlayerText(currentPlayerSign());
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
        isOver = false;
    }

    return { playRound, getIsOver, reset };

})();


