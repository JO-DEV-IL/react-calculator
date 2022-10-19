//import stylesheet
import { useReducer } from "react";
import "./styles.css"
import DigitButton from "./DigitButton";
import OperationButton from "./OperationButton"
 
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
      //if digit = and currentOperand = 0, return state (dont make changes)
      //keeps only a single 0
      if(payload.digit === '0' && state.currentOperand === '0'){
        return state
      }
      //if there is a . present already or currentOperand has a ., do nothing
      if(payload.digit === '.' && state.currentOperand.includes('.')){
        return state
      }
      //update state
      return{ //return new state object
        ...state, //go through current state
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      //return empty state
      return {}
  }
}

//app frontend
function App() {

  //Alternative to useState hook
  //Accepts a reducer of type (reducer()) and returns current state w/ a dispatch method(empty obj for now{})
  //runs 'reducer' function above
  //makes doing complex states easier
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer,{})

  // html rendering
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two">=</button>

      <h1>React Calculator</h1>
    </div>
  )
}

//export app function
export default App;