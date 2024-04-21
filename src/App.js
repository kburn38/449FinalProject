import './App.css';
import {useState} from 'react';

function App() {
  let [searchType, setSearchType] = useState("mounts");
  let [searchParam, setSearchParam] = useState("");
  let [searchResults, setSearchResults] = useState("");

  const baseUrl = 'https://ffxivcollect.com/api/';

  const search = () => {
    let searchURL = baseUrl + searchType;
    if (searchParam.trim() !== "") {
      searchURL += "?name_en_cont=" + searchParam.trim();
    }

    fetch(searchURL, {mode: 'cors'})
        .then(response => response.json())
        .then(data => {
            setSearchResults(data);
        })
        .catch(error => console.error('Error: ', error));
  };  

  const updateList = (data) => {

    console.log(data);
    if (data.results != null) {
      return data.results.map((dataElement, index) => (
        <li className="flex justify-center w-full m-4 outline-8 outline-black" key={index}>
          <img class="size-16" alt={dataElement.enhanced_description} src={dataElement.icon} />
          <h2 class="w-1/4">{dataElement.name}</h2>
          <p class="w-3/4">{dataElement.description}</p>
        </li>
      ));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>FFXIVCollect Searcher</h1>
        <div class="flex gap-4 mt-4">
            <label htmlFor="searchtype">Search Type:</label>
            <select id="searchtype" class="text-black" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
                <option value="mounts">Mounts</option>
                <option value="minions">Minions</option>
                <option value="spells">Blue Mage Spells</option>
                <option value="hairstyles">Hairstyles</option>
            </select>
            <label htmlFor="searchparam">Keyword:</label>
            <input type="text" id="searchparam" class="text-black" value={searchParam} onChange={(e) => setSearchParam(e.target.value)}></input>
        </div>
        <button class="mb-16 bg-gradient-to-r from-[#81B1B8] to-[#B8C287] hover:from-[#B88195] hover:to-[#879BC2] border-black rounded text-base" onClick={search}>Search</button>
        <ul id="searchlist">
            {updateList(searchResults)}
        </ul>
      </header>
    </div>
  );
};

export default App;