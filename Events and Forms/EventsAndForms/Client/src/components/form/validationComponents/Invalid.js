import React from 'react';

const Valid = prop => {
  return (
    <span
      role='img'
      aria-label='valid'
      style={{
        display: prop.display ? 'none' : '',
        marginLeft: '-23px', color: 'red'
      }}
    > 
    ❌ 
    </span>
  );
};

export default Valid;
