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

    return { setField, getField ,board};

})();


const displayController = (() => {


    const fields = document.querySelectorAll(".field");
    const message = document.querySelector("#currentPlayer");


    fields.forEach(field => {

        field.addEventListener("click", (e) => {

            const index = e.target.dataset.index;

            if (gameBoard.getField(index) !== "") return;

            gameController.playRound(index);

            renderBoard();

            console.log(gameBoard.board);

        })

    })


    const renderBoard = () => {

        let i = 0;

        fields.forEach((field) => {
            field.textContent = gameBoard.getField(i);
            i++;
        })
        
    } 

    const messagetext = (m) => {
        message.textContent = m;
    }

    return { messagetext };

})();


const gameController = (() => {

    const playerX = player("X");
    const playerO = player("O");

    let roundCount = 1;

    const playRound = (index) => {

        gameBoard.setField(index, currentPlayerSign()); 
        roundCount++;
        displayController.messagetext(currentPlayerSign());

    }

    const currentPlayerSign = () => {

        if (roundCount % 2 == 0) return playerO.getSign();        
        return playerX.getSign(); 
        
    }

    return { playRound };

})();