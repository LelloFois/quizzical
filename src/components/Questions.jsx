import { decode } from 'html-entities';

export default function Questions(props) {
    
    const { category, question } = props.question;

    return (
            <div className="question">
                <h3>{ category }</h3>
                <h2>{ decode(question) }</h2>
            </div>
           
       
    )
}

