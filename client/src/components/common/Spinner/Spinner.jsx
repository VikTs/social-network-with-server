import React from 'react';

import './styles.scss';

export const Spinner = () => {
  return (
    <div className="spiner">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
