import React, { useState, useEffect } from "react";


import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import api from "../utils/api";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    api()
      .get('/api/colors')
      .then(res => {
        setColorList(res.data)
      })
      .catch(err => console.log(err))
  })



  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
