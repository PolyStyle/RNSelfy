import { getBrand } from './../../api/api_proxy'

const ADD_BRAND = 'ADD_BRAND'
const SET_CURRENT_BRAND = 'SET_CURRENT_BRAND'
const IS_FATCHING = 'IS_FATCHING'

function addBrand( brand ) {
  return {
    type: ADD_BRAND,
    brand: brand
  }
}

export function fetchBrand(id){
  return function(dispatch){
    return getBrand(id).then(function(brand){
      dispatch(addBrand(brand))
      dispatch(setCurrentBrand(brand))
    })
  }
}


function setCurrentBrand( brand ) {
  return {
    type: SET_CURRENT_BRAND,
    brand: brand
  }
}

 
const initialState = {
  isFetching: false,
  brands: [],
  currentBrand: null
}

export default function posts (state = initialState, action) { 
  console.log(action)
  switch (action.type) {
    case ADD_BRAND:
      return {
        ...state,
        isFetching: false,
        brands: [action.brand]
      }
    case SET_CURRENT_BRAND:
      return {
        ...state,
        isFetching: false,
        currentBrand: action.brand
      }
    case IS_FATCHING:
      return {
        ...state,
        isFetching: true,
      }
    default :
      return state
  }
}