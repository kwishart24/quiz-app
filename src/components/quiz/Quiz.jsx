import { useState, useRef } from "react";
import "./Quiz.css";
import { data } from "./../../assets/data";

const Quiz = () => {
  //Set state so we know which number question we are on in the array
  let [index, setIndex] = useState(0);

  //Set state for question in the question array in the data.js file
  let [question, setQuestion] = useState(data[index]);

  //Lock state so user cannot select multiple options
  let [lock, setLock] = useState(false);

  //to keep track of scoring
  let [score, setScore] = useState(0);

  //so when we reach the last question
  let [result, setResult] = useState(false);

  //Created so we can show the user what the correct answer is if they select the wrong one
  let Option1 = useRef(null);
  let Option2 = useRef(null);
  let Option3 = useRef(null);
  let Option4 = useRef(null);

  let option_array = [Option1, Option2, Option3, Option4];

  //Check answer function when user chooses an option. Properties are the event onClick and the answer the user selected
  const checkAns = (e, ans) => {
    //if locking state is false meaning the user hasn't selected their answer yet, then let user select an option
    if (lock === false) {
      //If their answer is the same as the answer in the data.js file
      if (question.ans === ans) {
        //add a class of "correct" to their answer
        e.target.classList.add("correct");
        //set locking to true so they can't choose another answer
        setLock(true);
        //Add a point to score when answer is correct
        setScore((prev) => prev + 1);
      } else {
        //if they get it wrong, add a class of "wrong"
        e.target.classList.add("wrong");
        //setlocking to true so they can't select another answer
        setLock(true);
        //show them the correct answer by adding the class name of correct to the answer option based on the data.js file
        option_array[question.ans - 1].current.classList.add("correct");
      }
    }
  };

  //This is for the next button to advance to the next question when clicked
  const next = () => {
    //disables button until user has selected an answer
    if (lock === true) {
      //if we are on the last question, then set result true, meaning we have reached the end and should show the result
      if (index === data.length - 1) {
        setResult(true);
        //return so it won't execute the remaining statement
        return;
      }
      //update index to next index
      setIndex(++index);
      //set next question based on new index
      setQuestion(data[index]);
      //make new answers clickable
      setLock(false);
      //reset the classList "wrong" and "correct"
      option_array.map((option) => {
        option.current.classList.remove("wrong");
        option.current.classList.remove("correct");
        return null;
      });
    }
  };

  //for reset button
  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li
              // this is to link the options to the refs
              ref={Option1}
              onClick={(e) => {
                checkAns(e, 1);
              }}
            >
              {question.option1}
            </li>
            <li
              ref={Option2}
              onClick={(e) => {
                checkAns(e, 2);
              }}
            >
              {question.option2}
            </li>
            <li
              ref={Option3}
              onClick={(e) => {
                checkAns(e, 3);
              }}
            >
              {question.option3}
            </li>
            <li
              ref={Option4}
              onClick={(e) => {
                checkAns(e, 4);
              }}
            >
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Submit</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
      {result ? (
        <>
          <h2>
            You Scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Quiz;
