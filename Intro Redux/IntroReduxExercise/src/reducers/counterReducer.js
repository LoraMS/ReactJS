import * as actionTypes from './../actions/actionTypes';

export default (oldStore= [], action) => {
    switch (action.type) {
        case actionTypes.ADD: 
            return [...oldStore, { index: oldStore.length, value: 0 }];

        case actionTypes.REMOVE: 
            return [...oldStore.slice(0, oldStore.length-1)];
            
        case actionTypes.INCREMENT: //console.log(action); // {type: "INCREMENT", value: {index: 0, step: 5}}
            return [...oldStore.slice(0, action.value.index),
            Object.assign({}, oldStore[action.value.index], {
              value: oldStore[action.value.index].value + action.value.step
            }),
            ...oldStore.slice(action.value.index + 1)];

        case actionTypes.DECREMENT:
            return [...oldStore.slice(0, action.value.index),
            Object.assign({}, oldStore[action.value.index], {
              value: oldStore[action.value.index].value - action.value.step
            }),
            ...oldStore.slice(action.value.index + 1)];
                 
        case actionTypes.CLEAR: 
            return [...oldStore.slice(0, action.value.index),
            Object.assign({}, oldStore[action.value.index], {
              value: 0
            }),
            ...oldStore.slice(action.value.index + 1)];
          
        default: 
            return oldStore;
    }
};