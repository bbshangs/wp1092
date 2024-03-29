export default function Header(props){
    const step = props.step;
    const qs_ranking = props.qs_ranking;
    const best_qs_ranking = props.best_qs_ranking;

    const handleClick = (e) => {
        props.initializeBoard();
    }

    return (
        <>
        <h1 id="title">Merging School</h1>
        <div className="btn-groups">
            <div className="qs-ranking" id="general-qs-ranking">QS: <p id="general-qs-ranking-value">{qs_ranking}</p></div>
            <div className="qs-ranking" id="general-step">Step: <p id="general-step-value">{step}</p></div>
            <div className="qs-ranking" id="best-qs-ranking">Best: <p id="best-qs-ranking-value">{best_qs_ranking}</p></div>
            <div className="button" id="reset-button" onClick={handleClick}>New Game</div>
        </div>
        </>
    );
}
