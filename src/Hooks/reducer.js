export const initialState = {
    Country : 'worldwide',
    GovCountry: '',
    GovState: '',
    infoCases : {},
    mapCenter : {center :{ lat: 34.80746, lng: -40.4796 }, zoom : 2},
    mapData: [],
    tableData: [],
    caseType:'cases',
    vaccineData:[],
    vaccineCandidates:''
}

const reducer = (state,action) => {

    switch(action.type){
        // worldwide
        case 'ADD_COUNTRY_DATA':
            return {
                ...state,
                Country: action.payload
            }
        // govCountries
        case 'ADD_GOVCOUNTRY_DATA':
            return {
                ...state,
                GovCountry: action.payload
            }
        // govState
        case 'ADD_STATE_DATA':
            return {
                ...state,
                GovState:action.payload
            }
        // state information
        case 'ADD_INFO_CASES':
            return {
                ...state,
                infoCases:action.payload
            }
        // map data
        case 'ADD_MAP_DATA' :
            return {
                ...state,
                mapData: action.payload
            }
        // map location
        case 'ADD_MAP_LOCATION':
            return {
                ...state,
                mapCenter: action.payload
            }
        // casesType
        case 'ADD_CASE_TYPE' :
            return {
                ...state,
                caseType:action.payload
            }
        // vaccine Page
        case 'ADD_VACCINE_DATA' :
            return {
                ...state,
                vaccineData:action.payload
            }
        case 'ADD_VACCINE_CANDIDATES' :
            return {
                ...state,
                vaccineCandidates:action.payload
            }
        default :
            return state

    }
}

export default reducer