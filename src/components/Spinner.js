import React, { useState } from "react";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/CircleLoader";

const override = `css 
display: "block",
margin: "0 auto",
borderColor: "red",
`;

function Spinner() {
  const [loading, setLoading] = useState(true);
  return <div></div>;
}

export default Spinner;
