import React from 'react';
import Menu from './Menu/Menu';
import ViewComponent from './ViewComponent';

const LoggedInWrapper = (props) => {
        return(
        <div>
            <Menu />
            <ViewComponent />
        </div>
        );
    };

export default LoggedInWrapper;