import Square from "./Square"

const Board = ({ squareClick, squares }) => {
    const squareNums = Array.from(Array(9).keys());

    return (
        <div className="board-row">
            {squareNums.map((i, inde) => {
                return (
                    <div key={index}>
                        <Square
                            squareClick={() => { squareClick(i) }}
                            value={squares[i]}
                        />
                    </div>
                )
            })}
        </div>
    )
}
export default Board;
