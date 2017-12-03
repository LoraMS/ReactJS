const funcHolder = {};

const observerMenu = {
    addObserver: (name, func) => {
        funcHolder[name] = func;
    },
    executeObserver: (name, id) => {
        funcHolder[name](id);
    }
};

export default observerMenu;