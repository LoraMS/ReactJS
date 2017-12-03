import * as actionTypes from './../actions/actionTypes';

export default (oldStore= [], action) => {
    switch (action.type) {
        case actionTypes.ADD_INPUT: 
            // console.log(action); // {type: "ADD_INPUT", input: "some text"}
            return [...oldStore, { index: oldStore.length, value: action.input }];

        case actionTypes.DELETE_LAST: 
            return [...oldStore.slice(0, oldStore.length-1)];

        case actionTypes.SAVE:
            return [...oldStore.slice(0, action.input.index),
            Object.assign({}, oldStore[action.input.index], {
              value: action.input }),
            ...oldStore.slice(action.input.index + 1)];
          
        default: 
            return oldStore;
    }
};