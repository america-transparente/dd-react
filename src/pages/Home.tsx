import AmericaTransparenteLogo from "../assets/logo_white.webp";
import Results from "../components/Results";
import { SearchBar } from "@america-transparente/ui/search";
import { Header } from "@america-transparente/ui/core";

function Home() {
  return (
    <>
      <Header title="Dueños Directos" imagePath={AmericaTransparenteLogo} />
      <main className="mx-auto max-w-6xl px-4 text-font font py-4 space-y-4">
        <SearchBar placeholder="Buscar" />
        <Results />
      </main>
    </>
  );
}

export default Home;
