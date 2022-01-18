const Square = ({ value, squareClick }) => {

    return (
        <button onClick={squareClick} className="square">
            {value}
        </button>
    )
}
export default Square;
