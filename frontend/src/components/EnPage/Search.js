import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function Search(props) {

  // const [items, setItems] = useState([]);
  // const fromEng = props.fromEng;
  // // note: the id field is mandatory

  // const handleOnSearch = (string) => {
  //   if (string != "") {
  //     const loadData = async () => {
  //       // THE ADDR BELOW MUST BE THE DOMAIN NAME OF THE CLOUD SERVER WHEN DEPLOYED!
  //       const response = await axios.get("http://localhost:5000/search_bar", {
  //         params: { word: string, lang: fromEng ? "en" : "vn" },
  //       });
  //       setItems(response.data);
  //     };
  //     loadData();
  //   }
  // };

  // const handleOnHover = (result) => {
  //   // console.log(result);
  // };

  // const handleOnSelect = (item) => {
  //   // THE ADDR BELOW MUST BE THE DOMAIN NAME SERVER OF THE CLOUD SERVER WHEN DEPLOYED
  //   axios
  //     .get("http://localhost:5000/audio", {
  //       params: { en_word: item.en, vi_word: item.vn },
  //     })
  //     .then((response) => { });

  //   props.setShowResult(!props.showResult);
  //   props.setResult({
  //     en: `${item.en}`,
  //     vn: `${item.vn}`,
  //     type: `${item.word_type}`,
  //     type_vn: `${item.word_type_vn}`,
  //   });
  // };

  // const handleOnFocus = () => {
  //   // console.log("Focused");
  // };

  // const handleOnClear = () => {
  //   // console.log("Cleared");
  // };

  // const formatResult = (item) => {
  //   return (
  //     <>
  //       <span style={{}}>
  //         {fromEng ? item.en : item.vn} ({item.word_type})
  //       </span>
  //     </>
  //   );
  // };
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const fromEng = props.fromEng;

  useEffect(() => {
    const getResults = async () => {
      try {
        const response = await axios.get("http://localhost:5000/search_bar", {
          params: { word: inputValue, lang: fromEng ? "en" : "vn" },
        });
        var myOptions = []
        for (var i = 0; i < response.data.length; i++) {
          myOptions.push(response.data[i].vn)
        }
        setOptions(myOptions)


      } catch (error) {
        console.error(error);
      }
    };

    getResults();
  }, [value, inputValue]);

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
        {/* <ReactSearchAutocomplete
          items={items}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          inputDebounce={300}
          autoFocus
          onClear={handleOnClear}
          formatResult={formatResult}
          fuseOptions={{ keys: fromEng ? ["en"] : ["vn"] }}
          resultStringKeyName={fromEng ? ["en"] : ["vn"]}
          styling={{
            lineColor: "#c92127",
          }}
        /> */}
        <Autocomplete
          value={value}
          style={{ width: 500 }}
          freeSolo
          autoComplete
          autoHighlight
          options={options}
          onChange={(event, newValue) => {
            setOptions(newValue ? [newValue, ...options] : options);
            setValue(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="" variant="outlined" />
          )}
        />
      </div>
    </div>
  );
}

export default Search;
