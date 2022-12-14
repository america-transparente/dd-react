import { Suspense, lazy, useState, useEffect } from "react";
import atLogo from "../assets/at_logo.webp";
const Results = lazy(() => import("../components/Results"));
import { SearchBar } from "@america-transparente/ui/search";
import { Header, DonationCard } from "@america-transparente/ui/core";
import WarningModal from "../components/WarningModal";

function Home() {
  const [searchedQuery, setSearchedQuery] = useState("");

  const [theme, setTheme] = useState("");
  const [showDonationCard, setShowDonationCard] = useState(false);
  const [showWarningCard, setShowWarningCard] = useState(false);

  const halfAnHourInMilliseconds = 30 * 60000;
  const tenSecondsInMilliseconds = 10 * 1000;

  useEffect(() => {
    const donationPopup = setTimeout(() => {
      setShowDonationCard(true);
    }, halfAnHourInMilliseconds);

    const warningPopup = setTimeout(() => {
      setShowWarningCard(true);
    }, tenSecondsInMilliseconds);

    return () => {
      clearInterval(donationPopup);
      clearInterval(warningPopup);
    };
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      <Header
        title="Dueños Directos"
        captureThemeChange={setTheme}
        imagePath={atLogo}
        description="Dueños Directos es un buscador 
    de documentos del Diario Oficial
    de Chile, que permite rápidamente
    buscar entre miles de constituciones
    y otros archivos legales de 
    organizaciones."
      />
      <main className="text-font font mx-auto max-w-6xl px-4">
        <div className="sticky top-0 z-50 bg-light-neutral-300/80 bg-clip-padding py-4 backdrop-blur-sm backdrop-filter dark:bg-dark-neutral-300/80">
          <SearchBar
            placeholder="Buscar"
            captureSearchedQuery={setSearchedQuery}
          />
        </div>
        {searchedQuery ? (
          <Suspense
            fallback={
              <p className="text-center text-xl text-light-text-100 dark:text-dark-text-100">
                Cargando...
              </p>
            }
          >
            <Results />
          </Suspense>
        ) : (
          <p className="py-16 text-center text-lg font-bold">
            Para hacer búsquedas exactas, rodea tu consulta en comillas dobles
            (Ej: &quot;Sebastián Piñera&quot;)
          </p>
        )}
      </main>
      {showDonationCard && (
        <DonationCard
          showDonationCard={showDonationCard}
          setShowDonationCard={setShowDonationCard}
        />
      )}
      {showWarningCard && (
        <WarningModal
          displayCard={showWarningCard}
          setDisplayCard={setShowWarningCard}
        />
      )}
    </>
  );
}

export default Home;
