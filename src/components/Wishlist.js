import React from "react";
import { useState } from "react";

function WishlistComp() {
  const [showDiv, setShowDiv] = useState(false);
  const modalHandler = () => {
    setShowDiv(true);
  };
  return (
    <div className="w-comp">
      <button onClick={modalHandler} className={showDiv ? "red" : ""}>
        +
      </button>
    </div>
  );
}

export default WishlistComp;
