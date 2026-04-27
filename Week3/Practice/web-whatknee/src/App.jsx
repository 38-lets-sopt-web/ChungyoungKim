import Card from './components/Card';
import Header from "./components/Header.jsx";
import Search from "./components/Search.jsx";
import {useSearch} from "./useSearch.js";
import {members} from "./member.js";

function App() {
    const { search, filteredData, handleSearchChange, handleSearchClick } = useSearch(members);
  return (
      <>
        <Header />
          <Search search={search} onSearchChange={handleSearchChange} onSearchClick={handleSearchClick} />
          <section style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          {filteredData.map((member) => (
              <Card
                  key={member.id}
                  name={member.name}
                  github={member.github}
                  englishName={member.englishName}
              />
          ))}
        </section>
      </>
  );
}

export default App;