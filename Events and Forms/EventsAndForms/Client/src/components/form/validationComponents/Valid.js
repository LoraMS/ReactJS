import React from 'react';

const Valid = (prop)=>{
    return(
<span role="img" aria-label="valid" style={{
          display: prop.display ? '' : 'none',
          marginLeft: '-23px', backgroundColor: 'lightgreen', border: '1px solid black', padding: '0 3px'
        }}>      
        ✅
      </span>
    );
};

export default Valid;