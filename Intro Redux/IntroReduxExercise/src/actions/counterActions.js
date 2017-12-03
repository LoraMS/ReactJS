import * as actionTypes from './actionTypes';

const actions = {
    addCounter: () => {
        return { type: actionTypes.ADD };
    },
    removeCounter: () => {
        return { type: actionTypes.REMOVE };
    },
    increment: (value) => {
        return { type: actionTypes.INCREMENT, value };
    },
    decrement: (value) => {
        return { type: actionTypes.DECREMENT, value };
    },
    clear: (value) => {
        return { type: actionTypes.CLEAR, value };
    }
};

export default actions;