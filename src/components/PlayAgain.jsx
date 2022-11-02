
export default function PlayAgain(props) {
    
    return (
        <>
            {props.checkedAnswers && <h3 >You scored { props.result }/{ props.questions.length }</h3>}
            <button className="btn-check" onClick={ props.playAgain }>
                Play Again
            </button>
        </>
    )
}