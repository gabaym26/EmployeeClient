import * as actions from '../action';

const initialState = {
    employees: []
};

const Reducer_Employees = (state = initialState, action) => {
    switch (action.type) {
        case actions.ADD_EMPLOYEE:
            {
                let employees = [...state.employees];
                employees.push(action.payload);
                return {
                    ...state,
                    employees
                };
            }
        case actions.EDIT_EMPLOYEE:
            {
                let employees = [...state.employees];
                const index = employees.findIndex(r => r.Id === action.payload.Id);
                employees[index] = action.payload;
                return {
                    ...state,
                    employees,
                };
            }
        case actions.SET_EMPLOYEES:
            {
                return {
                    ...state,
                    employees: action.payload.filter(e => e.isActive === true),
                };
            }
        case actions.DELETE_EMPLOYEE:
            {
                const employees = [...state.employees];
                const index = employees.findIndex(e => e.Id === action.paylaod);
                employees[index].isActive = false;
                return {
                    ...state,
                    employees: employees.filter(e => e.isActive === true)
                };
            }
        default:
            return state;
    }
};

export default Reducer_Employees;