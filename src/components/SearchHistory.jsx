import "./SearchHistory.css";

export default function SearchHistory({searchHistory, onSearch, onClear}) {
  return (
    <div className="search-history">
      <p>Search History</p>

      {searchHistory.map(city => (    // 각 도시를 버튼으로 만듦
        <button key={city} type="button" onClick={() => onSearch(city)}>{city}</button>
      ))}
      
      <button type="button" onClick={onClear}>Clear All</button>
    </div>
  );
}