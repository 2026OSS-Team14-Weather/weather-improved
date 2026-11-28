import "./SearchHistory.css";

export default function SearchHistory({ searchHistory, onSearch, onClear }) {
  return (
    <div className="search-history">
      <p>Search History</p>

      {searchHistory.map(city => (    // 각 도시를 버튼으로 만듦
        <button key={city} type="button" onClick={() => onSearch(city)}>{city}</button>
      ))}

      {searchHistory.length > 0 && (  // 검색 기록이 있을 때만 버튼 표시
          <button className="clear_btn" type="button" onClick={onClear}>Clear All</button>
        )
      }
    </div>
  );
}