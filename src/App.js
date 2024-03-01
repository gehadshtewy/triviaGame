import axios from 'axios'
import React,{useState,useEffect} from 'react'
import Timer from './Component/Timer'
import Quiz from './Component/Quiz'

const App = () => {
  const [showQuiz,setShowQuiz] = useState(false)

  const flagShowQuiz = () => {
    setShowQuiz(true)
  }
  return (
   <>
    {
      !showQuiz ?
       (<div className='firstpage'>
         <h1>Welcome</h1>
          <p className='pruls'>Name of application TriviGame - if you want to play erite the ruls</p>
          <p className='pruls'>In this game 20 question read the question and select the correct answer</p>
          <p className='pruls'>Time for each question 15 second if the time end wrong answer </p>
          
          <button style={{width:'40%',height:50,color:'#fff',fontSize:20,borderRadius:15,backgroundColor:'#006600',marginTop:20,padding:10}} onClick={flagShowQuiz}>Start Game </button>
       </div>)
        :
         (
          
          <Quiz />
         )
    }
   </>
  )
}

export default App
