//Essentially custom-created button html tag
//runs a function on click to ADD_OPERATION, accepting a payload of operation variable
//displays that operation variable

import { ACTIONS } from './App'

export default function OperationButton({ dispatch, operation }) {
    return (
      <button
        onClick={() => dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })}
      >
        {operation}
      </button>
    )
  }