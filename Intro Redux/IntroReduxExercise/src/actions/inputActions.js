import * as actionTypes from './actionTypes';

const actions = {
    add: (input) => {
        return { type: actionTypes.ADD_INPUT, input };
    },
    delete: () => {
        return { type: actionTypes.DELETE_LAST };
    },
    save: (input) => {
        return { type: actionTypes.SAVE, input };
    }
};

export default actions;