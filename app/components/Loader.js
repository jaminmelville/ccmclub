import React from 'react';

const Loader = function Loader() {
  return (
    <div className="text-center loader">
      <img
        src="/wp-content/themes/ccmclub/images/loader.png"
        alt="loader"
        className="loader__image"
      />
      <br />
      Loading...
    </div>
  );
};

export default Loader;
