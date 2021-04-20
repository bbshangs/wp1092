import Row from './Row'

export default function Board2048 (props) {

    let boardClassName = "board";
    let infoClassName = "info";
    let outSentence = "No funding this year QAO";
    let phdSentence = "You should study a PhD!";
    var sentence;

    const handleClick = (e) => {
        props.initializeBoard();
    }
    var id;
    if (props.gameover || props.win) {
        boardClassName += " game-over-board";
        infoClassName += " game-over-wrapper";
        if (props.gameover) 
            sentence = outSentence;
        
        else    
            sentence = phdSentence;
        infoClassName += " end-fade-in";
    }

    

    return (
        <>
        <table className={boardClassName} id="board-full">
            <tbody>
                {props.board.map((row_vector, row_idx) => (<Row row_idx={row_idx} row_vector={row_vector}/>))}
            </tbody>
        </table>
        <div className={infoClassName} id="game-over-info">
            <span id="game-over-text">{sentence}</span>
            <div className="button" id="game-over-button" onClick={handleClick}>Try again</div>
        </div>
        </>
    );
};
