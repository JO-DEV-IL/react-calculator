//Essentially custom-created button html tag
//runs a function on click to ADD_DIGIT, accepting a payload of digit variable
//displays that digit variable

import { ACTIONS } from './App'

export default function DigitButton({ dispatch, digit }){
    return <button
        onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit }})}>
            {digit}
            </button>
}