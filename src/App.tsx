import { InstantSearch } from "react-instantsearch-hooks-web";
import { Provider } from "@america-transparente/ui/search";
import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import Home from "./pages/Home";

function App() {
  const searchClient = instantMeiliSearch(
    import.meta.env.VITE_MEILISEARCH_URL,
    import.meta.env.VITE_MEILISEARCH_API_KEY
    );

  return (
    <InstantSearch searchClient={searchClient} indexName={import.meta.env.VITE_MEILISEARCH_INDEX}>
      <Provider searchClient={searchClient} indexName={import.meta.env.VITE_MEILISEARCH_INDEX}>
        <Home />
      </Provider>
    </InstantSearch>
  );
}

export default App;
