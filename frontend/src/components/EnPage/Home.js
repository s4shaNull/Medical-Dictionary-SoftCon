import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";

import React from "react";
import { useState } from "react";

import NavBar from "./NavBar";
import DictLang from "./DictLang";
import Search from "./Search";
import TestSearchBar from "./TestSearchbar";


export default function Home(props) {
  
  return (
    <header className="header" id="searching">
      <NavBar />
      <DictLang {...props} />
      <Search {...props}/>
    </header>
  );
}
