import axios from "axios";
import React, { useEffect, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import "../style/base.css";
import "../style/main.css";
import "../style/responsive.css";

function Search(props) {
  const [items, setItems] = useState([]);

  // const [, updateState] = React.useState()
  // const forceUpdate = React.useCallback(()=> updateState({}),[])

  // useEffect(() => {
  //   forceUpdate();
  // })

  // const [search,setSearch] = useState("")

  // useEffect(() =>{
  //   if(search!==""){
  //      axios
  //   .get("http://localhost:5000/search_bar/", {
  //     params: {word:search, lang:fromEng ? "en" : "vn"},
  //   })
  //   .then((response) => {
  //     setItems(response.data)
  //   })
  // }
  // }, [search])

  // useEffect(() => {
  //   console.log(items)
  //   setItems(items)
  // }, [items])

  const fromEng = props.fromEng;
  // note: the id field is mandatory

  const handleOnSearch = (string) => {
    console.log("Search", string);
    if (string != "") {
      const loadData = async () => {
        // THE ADDR BELOW MUST BE THE DOMAIN NAME OF THE CLOUD SERVER WHEN DEPLOYED!
        const response = await axios.get("http://localhost:5000/search_bar", {
          params: { word: string, lang: fromEng ? "en" : "vn" },
        });
        console.log("Response Data:", response.data);
        setItems(response.data);
      };
      loadData();
    }
    // setSearch(string);
    // if(string!=""){
    //   await axios
    // .get("http://localhost:5000/search_bar/", {
    //   params: {word:string, lang:fromEng ? "en" : "vn"},
    // })
    // .then((response) => {
    //   console.log(response.data)
    //   setItems(response.data)
    //   setTimeout(() => console.log(items), 2000)
    //   console.log(response.data)
    // })
    // const response = axios.get("http://localhost:5000/search_bar/", {
    //   params: {word:string, lang:fromEng ? "en" : "vn"},})

    //   console.log("response data", response.data)
    //   setItems(response.data)
    //   console.log(items)

    // }
  };

  // useEffect(() => { // this hook will get called everytime when myArr has changed
  //   // perform some action which will get fired everytime when myArr gets updated

  //   }, [search])

  //  useEffect(() => {
  //     console.log(items)
  //   }, [items])

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
          {fromEng ? item.en : item.vn} ({item.word_type})
        </span>
      </>
    );
  };

  console.log(items);

  return (
    <div className="header__search">
      <h3 className="header__search__text">Start your search!</h3>
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
          inputDebounce={0}
          autoFocus
          onClear={handleOnClear}
          formatResult={formatResult}
          fuseOptions={{ keys: fromEng ? ["en"] : ["vn"] }}
          resultStringKeyName={fromEng ? ["en"] : ["vn"]}
          styling={{
            lineColor: "#c92127",
          }}
        />
      </div>
    </div>
  );
}

export default Search;
