import axios from "axios";
import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";
// import "../style/searchmobile.css";

function SearchMobile(props) {
  const fromEng = props.fromEng;
  console.log("Rendered");

  //   let navigate = useNavigate();
  //   const routeChange = () =>{
  //     let path = "./Home";
  //     navigate(path);
  //   }

  // note: the id field is mandatory
  const [items, setItems] = useState([]);

  const handleOnSearch = (string, results) => {
    console.log("Search", string);
    if (string != "") {
      const loadData = async () => {
        // THE ADDR BELOW MUST BE THE DOMAIN NAME OF THE CLOUD SERVER WHEN DEPLOYED!
        const response = await axios.get(
          "http://103.82.24.40:5000/search_bar",
          {
            params: { word: string, lang: fromEng ? "en" : "vn" },
          }
        );
        console.log("Response Data:", response.data);
        setItems(response.data);
      };
      loadData();
    }
  };

  const handleOnHover = (result) => {
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    // THE ADDR BELOW MUST BE THE DOMAIN NAME SERVER OF THE CLOUD SERVER WHEN DEPLOYED
    axios
      .get("http://103.82.24.40:5000/audio", {
        params: { en_word: item.en, vi_word: item.vn },
      })
      .then((response) => {});

    props.setShowResult(!props.showResult);
    props.setResult({
      en: `${item.en}`,
      vn: `${item.vn}`,
      type: `${item.word_type}`,
      type_vn: `${item.word_type_vn}`,
    });
  };

  const handleOnFocus = () => {
    // console.log("Focused");
  };

  const handleOnClear = () => {
    // console.log("Cleared");
  };

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: "block", textAlign: "left" }}>
          {fromEng ? item.en : item.vn} ({item.word_type})
        </span>
      </>
    );
  };

  return (
    <div className="search-mobile">
      <i
        className="search-mobile-head-icon fas fa-angle-left"
        onClick={() => {
          props.setShowSearchMobile(!props.showSearchMobile);
        }}
      ></i>
      <div className="search-mobile-head">
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          onClear={handleOnClear}
          formatResult={formatResult}
          fuseOptions={{ keys: fromEng ? ["en"] : ["vn"] }}
          resultStringKeyName={fromEng ? ["en"] : ["vn"]}
          styling={{
            lineColor: "#c92127",
            boxShadow: "none",
            border: "none",
          }}
        />
      </div>
      <div className="line-result-mobile" />
    </div>
  );
}

export default SearchMobile;
