import { decode } from 'html-entities';

export default function Answers(props) {
    const { answer, isHeld } = props.answer;

    return (
            <button
                className={isHeld && !props.answer.isCorrect && props.wrong ? "wrong" : props.answer.isCorrect && props.correct ? "correct" : isHeld && "held"}  
                onClick= {props.checkIsHeld}>
                    { decode(answer) }
            </button>
    )
}