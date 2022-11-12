import { Suspense, lazy, useEffect, useState } from "react";
import AmericaTransparenteLogo from "../assets/logo_white.webp";
const Results = lazy(() => import("../components/Results"));
import { SearchBar } from "@america-transparente/ui/search";
import { Header } from "@america-transparente/ui/core";

function Home() {
  const [searchedQuery, setSearchedQuery] = useState("");

  return (
    <>
      <Header title="Dueños Directos" imagePath={AmericaTransparenteLogo} />
      <main className="mx-auto max-w-6xl px-4 text-font font py-4 space-y-4">
        <SearchBar
          placeholder="Buscar"
          captureSearchedQuery={setSearchedQuery}
        />
        {searchedQuery ? (
          <Suspense fallback={<p className="text-center">Cargando...</p>}>
            <Results />
          </Suspense>
        ) : (
          <div className="text-center font-bold text-lg py-16">
            <p>
              Recuerda que está plataforma esta en alpha, así que todavía puede
              haber cosas que no funcionan como deberían.
            </p>
            <p>
              Para hacer búsquedas exactas, rodea tu consulta en comillas dobles
              (Ej: "Sebastián Piñera")
            </p>
          </div>
        )}
      </main>
    </>
  );
}

export default Home;
