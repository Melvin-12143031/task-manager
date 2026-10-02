const SearchBar = ({ search, setSearch, setError }) => {
  return (
    <div className="input-section">
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setError("");
        }}
        placeholder="Search task..."
      />
    </div>
  );
};

export default SearchBar;