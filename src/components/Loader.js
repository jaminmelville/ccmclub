import React from 'react';

const Loader = function Loader() {
  return (
    <div className="text-center loader">
      <img
        src="https://s3-ap-southeast-2.amazonaws.com/ccmclub/manual/loader.png"
        alt="loader"
        className="loader__image"
      />
      <br />
      Loading...
    </div>
  );
};

export default Loader;
