export const initialState = {
    infoCases : {},
    mapCenter : { lat: 34.80746, lng: -40.4796 },
    mapZoom: 2,
    tableData: []
}

const reducer = (state,action) => {

    switch(action.type){

        case 'ADD_INFO_CASES':
            return {
                ...state,
                infoCases: [...state,action.payload]
            }
        case 'ADD_TABLE_DATA':
            return {
                ...state,
                tableData:[...state,action.payload]
            }
        case 'ADD_MAP_LOCATION':
            return {
                ...state,
                mapCenter:[action.payload]
            }
        default :
            return state
            
    }
}

export default reducer