import { useState, useEffect } from 'react';
import blob1 from './images/blob1.png';
import blob2 from './images/blob2.png';
import Questions from './components/Questions';
import Answers from './components/Answers';
import CheckAnswers from './components/CheckAnswers';
import PlayAgain from './components/PlayAgain';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  const [ questions, setQuestions ] = useState([]);
  const [ showQuiz, setShowQuiz ] = useState(false);
  const [ result, setResult ] = useState(0);
  const [ correct, setCorrect ] = useState(false)
  const [ wrong, setWrong ] = useState(false)
  const [ checkedAnswers, setCheckedAnswers ] = useState(false)
  const [ play, setPlay ] = useState(false)
  const [ spinner, setSpinner ] = useState(false)
 
  function shuffle(array) {
    const newArray = [...array]
    const length = newArray.length
  
    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((newArray.length - start) * Math.random())
      const randomItem = newArray.splice(randomPosition, 1)
  
      newArray.push(...randomItem)
    }

    return newArray
  }

 

  useEffect(() => {
    const url = 'https://opentdb.com/api.php?amount=5&type=multiple'
    const fetchData = async(url) => {
      setSpinner(true)
  
      const res = await fetch(url);
      const data = await res.json();
  
  
      // sets the questions object as needed
  
      setQuestions(data.results.map(question => {
        
        const answers = []
        for (let i = 0; i < question.incorrect_answers.length ; i++) {
          answers.push({
            id: nanoid(),
            answer: question.incorrect_answers[i],
            isHeld: false,
            isCorrect: false,
          })
        }
        answers.push({
          id: nanoid(),
          answer: question.correct_answer,
          isHeld: false,
          isCorrect: true,
        })
        const shuffledAnswers = shuffle(answers);
  
        const obj =  {
          id: nanoid(),
          category: question.category,
          question: question.question,
          answers: shuffledAnswers,
        }
        return obj
       
      }
      ))
      setSpinner(false)
    }
    fetchData(url)
  }, [play])

  
  // shows the questions 
  const setQuiz = () => {
    setShowQuiz(preShowQuiz => !preShowQuiz)
  }

  const checkIsHeld = (answerId, questionId) => {
     
    setQuestions(prevQuestions => prevQuestions.map(question => { 
    
      const holdIt = question.answers.map(answer => {
        // if an answer is already selected it deselect it to select the chosen one 
        if (question.id === questionId && answer.isHeld) {
          return {...answer, isHeld: !answer.isHeld } 
        }
        // selects the answer
        if (answer.id === answerId) {
          return  {...answer, isHeld: !answer.isHeld }
        } else {
          return answer
        }
       
      })

      return {...question, answers: holdIt}
    
    }))

  }

  // check if all the answers are selected
  const givenAnswers = questions.map(question => question.answers.filter(answer => answer.isHeld))  
  const areAllSelected = givenAnswers.every(answer => answer.length > 0)

console.log(checkedAnswers)
  const checkAnswers = () => {
    
    questions.map(question => question.answers.map(answer => {

      setCheckedAnswers(checkedAnswers => checkedAnswers = true);
      
      if ( answer.isHeld && answer.isCorrect ) {
         setResult(result=> result + 1);  
      }
      return !answer.isCorrect ? setWrong( wrong => wrong = true ) : setCorrect(correct => correct = true);
      
    }))
  }

  const playAgain = () => {

    window.scrollTo(0, 0);
    setPlay(play => !play);
    setCheckedAnswers(checkedAnswers => checkedAnswers = false);
    setResult(prevResult => prevResult = 0);
    setCorrect(correct => correct = false);
    setWrong(wrong => wrong = false)

  }
  
  const quest = questions && questions.map(question => {
    
    return (<>
      <Questions 
        question={ question } 
        key={ question.id } 
      />
      
      <div className='answers'>
        {question.answers.map(answer => {

          return (<Answers 
            key = { answer.id } 
            checkIsHeld = {() => checkIsHeld( answer.id, question.id )} 
            answer = { answer } 
            correct = { correct }
            wrong = { wrong }
            />)

        })}
      </div>
    </>
    )
  })

  const loader = 
    <div className = "spinner-box">
      <div className = "pulse-container">  
        <div className = "pulse-bubble pulse-bubble-1"></div>
        <div className = "pulse-bubble pulse-bubble-2"></div>
        <div className = "pulse-bubble pulse-bubble-3"></div>
      </div>
    </div>

  const firstPage =
    <div className='first-page'>
        <div className='title'>
          <h1>Quizzical</h1>
          <button onClick = { setQuiz }>Start quiz</button>
        </div>
    </div>
 
  return (
    <div className="App">
      {spinner ? loader : !showQuiz ? firstPage :
      showQuiz && <div className="question--container">
      { quest }
      <div className='btn-check--container'>
        {areAllSelected && !checkedAnswers &&
          <CheckAnswers 
            checkAnswers = { checkAnswers }
            
          />
        }
        {checkedAnswers && 
          <PlayAgain 
            checkedAnswers = { checkedAnswers }
            questions = { questions } 
            result = { result }
            playAgain = { playAgain }
          />
        }
        </div>
    </div>
   
    }
      
      
    <div className='blob-1'>
      <img src={blob1} alt="blob" />
    </div>
      <div className='blob-2'>
        <img src={blob2} alt="blob" />
      </div>
    </div>
  );
}

export default App;
