import { InstantSearch } from "react-instantsearch-hooks-web";
import { Provider } from "@america-transparente/ui/search";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import Home from "./pages/Home";

function App() {
  const searchClient = instantMeiliSearch("http://localhost:7700");

  return (
    <InstantSearch searchClient={searchClient} indexName="muestras">
      <Provider searchClient={searchClient} indexName="muestras">
        <Home />
      </Provider>
    </InstantSearch>
  );
}

export default App;
