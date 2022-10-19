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
      //if overwrite state is true (found under ACTIONS.EVALUATE)
      if(state.overwrite){
        return{
          ...state, //access state
          currentOperand: payload.digit, //replaces currOp with digit input
          overwrite: false //return overwrite state to false
        }
      }
      //if digit = and currentOperand = 0, return state (dont make changes)
      //keeps only a single 0
      if(payload.digit === '0' && state.currentOperand === '0'){
        return state
      }
      //if there is a . present already or currentOperand has a ., do nothing
      if(payload.digit === '.' && state.currentOperand.includes('.')){
        return state
      }
      //update state to add digit inputs to current digits
      return{ //return new state object
        ...state, //access state
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      }
    
    case ACTIONS.CHOOSE_OPERATION:
      //if state of currentOp is null and state of prevOp is null, do nothing
      if(state.currentOperand == null && state.previousOperand == null){
        return state
      }
      //overrides chosen operation before computation takes place
      //i.e. user inputs 1 + but meant to do 1 *, * will override +
      if(state.currentOperand == null){
        return{
          ...state,
          operation: payload.operation
        }
      }
      //if state of prevOp is null
      //access state, make prevOp the state of currentOp, make currentOp null
      if(state.previousOperand == null){
        return{
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }
      //default action for CHOOSE_OP
      return {
        ...state, //access state
        previousOperand: evaluate(state), //run evaluate() w/ state
        operation: payload.operation, //use payload.operation as operation
        currentOperand: null //currentOp becomes null
      }
    
    case ACTIONS.CLEAR:
      return {} //return empty state
    
    case ACTIONS.EVALUATE:
      //if all conditions here are null, do nothing b/c not enough info to make a computation
      if(state.operation == null || state.currentOperand == null || state.previousOperand == null){
        return state
      }
      //otherwise return the following
      return{
        ...state, //access state
        //anytime an eval is done it will overwrite exisiting state
        //i.e. after a computation is done, starts a whole new computation if a number is pressed
        overwrite: true,
        previousOperand: null, //prevOp becomes null
        operation: null, //operation becomes null
        currentOperand: evaluate(state) //currOp runs eval function
      }
    
    case ACTIONS.DELETE_DIGIT:
      //if in overwrite state
      if(state.overwrite){
        return {
          ...state, //access state
          currentOperand: null, //currOp becomes null
          overwrite: false //overwrite state turns to false
        }
      }
      //do nothing if state of currOp is null
      if(state.currentOperand == null) return state
      //if length of the currOp state is 1
      //value becomes null instead of an empty string
      if(state.currentOperand.length === 1){
        return{
          ...state, //access state
          currentOperand: null //currOp becomes null
        }
      }
      //default for DELETE_DIGIT
      return{
        ...state, //access state
        //slice -1 at index 0, meaning remove last digit from currOp
        currentOperand: state.currentOperand.slice(0, -1)
      }

    default:
      // does nothing mechanically
      // fixes eslint warning with switchcases requiring default
  }
}

//evalutes using current, previous, and op variables
function evaluate({ currentOperand, previousOperand, operation }){
  //turns params into numbers
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  
  //if any of these don't exist, return nothing b/c no calculations to do
  if(isNaN(prev) || isNaN(current)) return ''

  //computation is empty by default
  let computation = ''
  
  //switchcase to handle operation computations
  switch(operation){
    case '+':
      computation = prev + current
      break
    case '-':
      computation = prev - current
      break
    case '*':
      computation = prev * current
      break
    case '÷':
      computation = prev / current
      break
    default:
      //does nothing mechanically
      //fixes eslint warning with switchcases requiring a default
  }
  //return computation as a string
  return computation.toString()
}

//Handles number format using Intl(Internalization) from React
//Allows for commas to separate numbers appropriately
//Allows for periods as decimals
const INTEGER_FORMATTER = new Intl.NumberFormat('en-us', {
  maximumFractionDigits: 0
})
function formatOperand(operand){
  if(operand == null) return
  const [integer, decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
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
        <div className="previous-operand">{formatOperand(previousOperand)} {operation}</div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>DEL</button>
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
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.EVALUATE })}>=</button>

      <h1>React Calculator</h1>
    </div>
  )
}

//export app function
export default App;