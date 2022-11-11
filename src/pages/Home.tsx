import { Suspense, lazy } from "react";
import AmericaTransparenteLogo from "../assets/logo_white.webp";
const Results = lazy(() => import("../components/Results"));
import { SearchBar } from "@america-transparente/ui/search";
import { Header } from "@america-transparente/ui/core";

function Home() {
  return (
    <>
      <Header title="Dueños Directos" imagePath={AmericaTransparenteLogo} />
      <main className="mx-auto max-w-6xl px-4 text-font font py-4 space-y-4">
        <SearchBar placeholder="Buscar" />
        <Suspense fallback={<p className="text-center">Cargando...</p>}>
          <Results />
        </Suspense>
      </main>
    </>
  );
}

export default Home;
