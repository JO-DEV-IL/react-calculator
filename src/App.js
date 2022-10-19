//import stylesheet
import { useReducer } from "react";
import "./styles.css"

 
//calculator 'actions' object for reducer() param
//exported to DigitButtons.js
export const ACTIONS ={
  ADD_DIGIT: 'add-digit',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  CHOOSE_OPERATION: 'choose-operation',
  EVALUATE: 'evaluate'
}

//reducer() is a react function
//more info below about it
function reducer(state, { type, payload }){
  //switchcase format to handle state types quickly
  switch(type){
    case ACTIONS.ADD_DIGIT:
      return{ //return new state object
        ...state, //go through current state
        currentOperand: `${currentOperand || ""}${payload.digit}`
      }
  }
}

//app frontend
function App() {

  //Alternative to useState hook
  //Accepts a reducer of type (reducer()) and returns current state w/ a dispatch method(empty obj for now{})
  //runs 'reducer' function above
  //makes doing complex states easier
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer,{})
  
  dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 }})

  // html rendering
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <button>÷</button>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>*</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>+</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button>-</button>
      <button>.</button>
      <button>0</button>
      <button className="span-two">=</button>
    </div>
  )
}

//export app function
export default App;