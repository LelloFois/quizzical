

export default function CheckAnswers(props) {
    
    return (
        <>
            { !props.checkedAnswers &&
                <button className="btn-check" onClick={ props.checkAnswers }>
                    Check Answers
                </button> 
            }
        </>
            
       
    )
}