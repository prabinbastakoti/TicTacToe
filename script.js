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

    const getBoard = () => {
        return board;
    }

    return { getBoard };

})();


const gameController = (() => {

    const playerX = player("X");
    const playerO = player("O");

    const fields = document.querySelectorAll(".field");

    fields.forEach(field => {

        field.addEventListener("click", () => {
            field.innerHTML = "X";
        })

    })


    return { updateGameBoard };

})();


gameController.updateGameBoard();