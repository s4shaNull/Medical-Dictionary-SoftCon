import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";

function Search(props) {
  const [items, setItems] = useState([]);
  // note: the id field is mandatory

  const handleOnSearch = (string) => {
    if (string !== "") {
      const loadData = async () => {
        // THE ADDR BELOW MUST BE THE DOMAIN NAME OF THE CLOUD SERVER WHEN DEPLOYED!
        const response = await axios.get("http://localhost:5000/search_bar", {
          params: { word: string, lang: props.fromEng ? "en" : "vn" },
        });
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
      .get("http://localhost:5000/audio", {
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
        <span style={{}}>
          {props.fromEng ? item.en : item.vn} ({item.word_type})
        </span>
      </>
    );
  };

  return (
    <div className="header__search">
      <h3 className="header__search__text">
        {props.getTranslation("search", props.language)}
      </h3>
      <div
        className="header__search__btn"
        onClick={() => {
          props.setShowSearchMobile(!props.showSearchMobile);
        }}
      >
        <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          inputDebounce={300}
          autoFocus
          onClear={handleOnClear}
          formatResult={formatResult}
          fuseOptions={{ keys: props.fromEng ? ["en"] : ["vn"] }}
          resultStringKeyName={props.fromEng ? ["en"] : ["vn"]}
          styling={{
            lineColor: "#c92127",
          }}
        />
      </div>
    </div>
  );
}

export default Search;
