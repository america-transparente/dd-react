import { Suspense, lazy, useEffect, useState } from "react";
import atLogo from "../assets/at_logo.webp";
const Results = lazy(() => import("../components/Results"));
import { SearchBar } from "@america-transparente/ui/search";
import { Header } from "@america-transparente/ui/core";

function Home() {
  const [searchedQuery, setSearchedQuery] = useState("");

  return (
    <>
      <Header
        title="Dueños Directos"
        imagePath={atLogo}
        description="Dueños Directos es un buscador 
    de documentos del Diario Oficial
    de Chile, que permite rápidamente
    buscar entre miles de constituciones
    y otros archivos legales de 
    organizaciones."
      />
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
          <p className="text-center font-bold text-lg py-16">
            Para hacer búsquedas exactas, rodea tu consulta en comillas dobles
            (Ej: "Sebastián Piñera")
          </p>
        )}
      </main>
    </>
  );
}

export default Home;
