export default function (state, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                }
            };

        case 'REMOVE_USER':
            return {
                ...state,
                user: {
                name: '',
                surname: '',
                username: '',
                usermail: '',
                }
            };
            
        default:
            return state;
    }
}
