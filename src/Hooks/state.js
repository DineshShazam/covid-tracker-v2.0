import React,{createContext,useContext,useReducer} from 'react'

// create the dataLayer
export const StateContext = createContext();

export const StateProvider = ({reducer,initialState,children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

// use State from DataLayer
export const useStateValue = () => useContext(StateContext);