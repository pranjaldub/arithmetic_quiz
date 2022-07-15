import React , {useState , useEffect} from 'react';



function QuizOne(props) {
    console.log('props::::', props)
    const [showQuestion , setShowQuestion] = useState(true)
    const [question , setQuestion] = useState("")
    const [counter , setCounter] = useState(20)
    const [answer , setAnswer] = useState(0)
    const [isAnswerCorrect , setAnswerIsCorrect] = useState(false)
    const [userInput , setUserInput] = useState('')
    const [showAnswer , setShowAnswer] = useState(false)
    const [inputDisabled , setInputDisabled] = useState(false)
    const [toggle , setToggle] = useState(true)
    const [buttonText , setButtonText] = useState('click to submit')
    const [score , setScore] = useState(0)
    const [numberOfQuestions , setNumberOfQuestions] = useState(-1)
    const [allQuestions , setAllQuestions] = useState([])
    const [finishQuiz , setFinishQuiz] = useState(false)
    //const [startQuiz , setStartQuiz] = useState(false)
    const operatorList = ["+" , "-","*","/"]
    const numberList = [1,2,3,4,5,6,7,8,9,0]
    const successMessage = <h2 style={{color:'green'}}>"congratulations , right answer !"</h2>
    const failMessage = <h2 style={{color:'red'}}>"Oops , wrong answer ."</h2>
    //useEffect(()=>{setStartQuiz(props.showQuestionProps)} , [startQuiz])
    
    function createQuestion(){
      
        let q=""
        let a=0
        let numberOne = Math.floor(Math.random() * (9 - 0 + 1)) + 0
        let numberTwo = Math.floor(Math.random() * (9 - 0 + 1)) + 0
        let min = 0;
        let max = 3;
        let operator = Math.floor(Math.random() * (max - min + 1)) + min
        q = `${numberList[numberOne]} ${operatorList[operator]}  ${numberList[numberTwo]}`
        a = eval(`${q}`);
        return [q,a]
      }

    useEffect(()=>{
        let qa = createQuestion()
        //setStartQuiz(props.showQuestionProps)
        setQuestion(qa[0]);
    setAnswer(qa[1],[])
  },[toggle])
    //console.log(question)
    const handleShowQuestion = () =>{
        if(props.showQuestionProps ){
            setShowQuestion(true) 
             
        }
       }
    
    useEffect(() => {
        handleShowQuestion();
        const timer = setTimeout(() => setInputDisabled(true), 20000);
        return () => clearTimeout(timer);
      }, [question]);
    
      useEffect(() => {
        const interval = setInterval(() => {

          if(counter >1){
          setCounter(counter => counter - 1);}
          else{
            setCounter(0)
           
          }


          
        }, 1000);
    
        return () => {
          clearInterval(interval);
        };
      }, []);

      function checkAnswer(event){
       
        let userIn = event.target.value;
        setUserInput(userIn)
        if(userIn == answer){
          setAnswerIsCorrect(true)
          setUserInput('')

        }
      
      }

      function publish(){
        if(isAnswerCorrect){
          setScore(score => score+1)
          props.ShowCumulativeScore(score)
          console.log("correct ans")
          setShowAnswer(true)
          setInputDisabled(true)
          setButtonText('correct answer')
          

        }
       
       else{
        console.log("wrong ans")
        setInputDisabled(true)
        setUserInput('')
        setCounter(0)
        setButtonText('wrong answer')
       }}

       function resetAll(){
        setToggle(!toggle);
        setCounter(20)
        setButtonText('click to submit')
        setInputDisabled(false)
        setAnswerIsCorrect(false)
        setShowAnswer(false)
       }

       function ResetButton(){
        setCounter(20)
        setButtonText('click to submit')
        setInputDisabled(false)
        setShowAnswer(false)
        setAnswerIsCorrect(false)
        setShowAnswer(false)
        props.setStartQuizOne(false);props.HideButtonPlayerOne(false);setNumberOfQuestions(0)
       }
       function finishQuizfunc(){
        if(numberOfQuestions <20){
          setNumberOfQuestions(numberOfQuestions => numberOfQuestions+1)}
          else{
            setFinishQuiz(true)
          }
       }
       useEffect(()=>{finishQuizfunc()},[toggle])
       let questionSummaryObject = {question : question , isAnswerCorrect:isAnswerCorrect , answer:answer}
       useEffect(()=>{setAllQuestions([...allQuestions ,questionSummaryObject ])},[question])

       function ShowSummary(question){
        return <table>
          <tr>
            <td>Question : {question.question}</td>&nbsp;
            <td>Answer : {Math.round(question.answer*10)/10}</td> &nbsp;
            <td>Status : {question.isAnswerCorrect ? 'correct answer' : 'wrong answer'}</td>
          </tr>
        </table>
       }

      
      if(props.showQuestionProps){
        console.log("inside if ")
      return (
        <div>
            
            {(!showAnswer && counter>0) && `Time : ${counter}s`}
            <h2>{ `question : ${numberOfQuestions}`}</h2>
            <h2>{showQuestion && question}</h2>
            <div>{showQuestion && <input
        type="text"
              disabled={inputDisabled}
        
        onChange={checkAnswer}
        //value={userInput}
      />
}</div>

<div>{(showQuestion && !finishQuiz ) && <button onClick = {publish}>{buttonText}</button>}</div>
{(showAnswer && isAnswerCorrect && !finishQuiz ) && successMessage}
{(!showAnswer && !isAnswerCorrect && !finishQuiz && inputDisabled) && failMessage}
{`Score : ${score}`}
<div>{(inputDisabled && !finishQuiz ) && <button onClick={resetAll}>Move to next question</button>}</div>
            <h2>{(counter <1 && !showAnswer && !finishQuiz )  && `The correct answer is ${Math.round(answer*10)/10}` }</h2>
           <h1>{(finishQuiz ) && `quiz has been completed , your total score is ${score} `}</h1>
           <div><table>{(finishQuiz) && allQuestions.map((question)=>ShowSummary(question))}</table></div>
           <button onClick={()=>{ResetButton()}}>Reset</button>
          
        </div>
    );}
    else{
      return <></>
    }
}

export default QuizOne;