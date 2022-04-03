import { useReducer } from 'react'

const initialState = {
    hoveredConstituentChinese: null,
    detailsConstituentRef: [],
    clickedConstituent: null
  }
  
const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'hover':
      newState = { ...state, hoveredConstituentChinese: action.payload };
      break;
    case 'unhover':
      newState = { ...state, hoveredConstituentChinese: null };
      break;
    case 'loadConstituents':
      newState = { ...state, detailsConstituentRef: action.payload };
      break;
    case 'click':
      if (state?.detailsConstituentRef) {
        const bottommostMatchingConstituent = state.detailsConstituentRef.current
        .slice().reverse().find(object => object.current?.id === action.payload.charChinese)

        if (bottommostMatchingConstituent?.current) {
            bottommostMatchingConstituent.current.click()
            newState = { ...state, clickedConstituent: action.payload.uniqueIndex }
        }
        else newState = {... state}
      }
      break;
    case 'unclick':
      newState = { ...state, clickedConstituent: null };
      break;
    default:
      throw new Error();
  }

return newState;
}

const useConstituentReducer = () => useReducer(reducer, initialState)

export default useConstituentReducer