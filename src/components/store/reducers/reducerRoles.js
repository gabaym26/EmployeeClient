import * as actionsName from '../action';

const initialState = {
    roles: [],
}

const Reducer_Roloe = (state = initialState, action) => {
    switch (action.type) {
        case actionsName.ADD_ROLR:
            {
                let roles = [...state.roles]
                roles.push(action.payload);
                return ({
                    ...state,
                    roles
                })
            }
        case actionsName.SET_ROLE:
            {
                return ({
                    ...state,
                    roles: action.payload
                });
            }
        case actionsName.DELETE_ROLR:
            {
                const roles = [...state.roles];
                roles.filter(role => role.id !== action.paylaod)
                return {
                    ...state,
                    roles: roles
                };
            }
        default: return ({ ...state });
    }
}
export default Reducer_Roloe;