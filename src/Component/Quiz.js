import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Timer from './Timer'
import {useScoreStore} from './results'
import { resultstate } from './results'



const Quiz = () => {
  const [data, setData] = useState(null)
  const [currentQ, setCurrentQ] = useState(0)
  //ckeck if the answer is correct
  const [flagAnswer, setFlagAnswer] = useState(null)
  const [indexA, setIndexA] = useState(null)
  const [allAnswers, setAllAnswers] = useState([])
  const [results, setResults] = useState(resultstate)
  const [showResult, setShowResult] = useState(false)
  const [second, setSecond] = useState(15)


  const loadData = async () => {
    try {
      await axios.get('https://opentdb.com/api.php?amount=20&category=18')
        .then(res => {
          const newdata = res.data.results.map(question => ({
            ...question,
            answers: randomAnswers([...question.incorrect_answers, question.correct_answer])
          }));
          setData(newdata);

        })
        .catch(error => console.log(error.message))

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    loadData();

  }, [])

  const randomAnswers = (answerss) => {
    const random = answerss.slice();
    for (let i = random.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i * 1));
      [random[i], random[j]] = [random[j], random[i]];
    }
    return random;
  }

  const nextQuestion = () => {
    if (currentQ !== data.length - 1) {
      setCurrentQ(currentQ + 1)
      setSecond(15)
    } else {
      setSecond(0)
      setShowResult(true)
    }
  }

  const checkAnswer = (answer, index) => {
    setIndexA(index);
    if (answer === data[currentQ].correct_answer) {
      setFlagAnswer(true);
    } else {
      setFlagAnswer(false);
    }
    setResults((prev) =>
      answer && {
        ...prev,
        score: prev.score + 5,
        correctAnswers: prev.correctAnswers + 1,
        wrongAnswers: prev.wrongAnswers - 1,
      }
    )
  }

  const timeOut = () => {
    nextQuestion();
  }
  const PlayAgain = () => {
    setSecond(15)
    setCurrentQ(0)
    setResults(resultstate);
    setShowResult(false);
  }

  return (
    <>
      {
        !showResult ? (<div className='quiz'>
          {data && data[currentQ] && (
            <>
              <div className='question'>
                <p style={{ textAlign: 'end', fontSize: 18 }}>Question {currentQ + 1} / {data.length}</p>
                <p style={{ fontSize: 22, fontWeight: 'bold' }}>{data[currentQ].question}</p>
              </div>

              <div className='answer'>
                <ul>
                  {
                    data[currentQ].answers.map((answer, index) => (
                      <li
                        onClick={() => checkAnswer(answer, index)}
                        key={answer}
                        className={indexA === index ? "selected-answer" : null}
                      >
                        {answer}
                      </li>

                    ))
                  }
                </ul>

              </div>

              <div className='footer'>

                <div className='timer'>
                  <Timer counter={second} timeOut={timeOut} setCounter={setSecond} />
                </div>


                <div className='nextbtn'>
                  {
                    currentQ < data.length - 1 ? (<>
                      <button className='netxbtn1' onClick={nextQuestion}>Next</button>
                    </>) : (
                      <><button className='netxbtn1' onClick={nextQuestion}>Finsh</button></>
                    )
                  }

                </div>
              </div>
            </>
          )}
        </div>
        ) : (
          <div className='result'>
            <h2>Result</h2>
            <p>
              Total Question:  {data.length}
            </p>
            <p>
              Total score:  {results.score}
            </p>
            <p>
              Corrent Answer:  {results.correctAnswers}
            </p>
            <p>
              Wrong Answer:  {results.wrongAnswers}
            </p>

            <button onClick={PlayAgain}>Play Again</button>

          </div>)
      }




    </>

  )
}

export default Quiz;