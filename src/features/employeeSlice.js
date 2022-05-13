const initState = JSON.parse(localStorage.getItem('employees')) || [
    {
        firstName: "Augustin",
        lastName: "Legrand",
        dateOfBirth: '08/04/2022',
        startDate: "08/04/2022",
        department: "Sales",
        street: "LE FAURE",
        city: "ARRONNES",
        state: "ALLIER",
        zipCode: "03250",
    }
]

const ADD_EMPLOYEE = "ADD_EMPLOYEE"

function EmployeeReducer (state = initState, action) {
    switch (action.type) {
        case ADD_EMPLOYEE:
            console.log(action.payload);
            state = [...state, { ...action.payload }]
            localStorage.setItem('employees', JSON.stringify(state))
            return state
    
        default:
            return state;
    }
}

export default EmployeeReducer