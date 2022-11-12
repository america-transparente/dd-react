import { useRef, useEffect } from "react";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from "@america-transparente/ui/search";
import HitCard from "./HitCard";
import HitCardSkeleton from "../components/HitCardSkeleton";

interface ResultsProps {
  config?: UseInfiniteHitsProps;
}

const tidyItems: UseInfiniteHitsProps["transformItems"] = (items) => {
  return items.map((item) => {
    // where end search key word is
    let indexOfSnippet =
      item?._snippetResult?.content?.value?.indexOf("</mark>");
    // line break after search key word
    let indexOfNextLine = item?._snippetResult?.content?.value?.indexOf(
      "\n",
      indexOfSnippet
    );
    // line break before search key word
    let indexOfPrevLine = item._snippetResult?.content?.value?.lastIndexOf(
      "\n",
      indexOfSnippet
    );

    let textSnippet = item._snippetResult?.content?.value?.substring(
      indexOfPrevLine - 200,
      indexOfNextLine + 100
    );

    return {
      ...item,
      _snippetResult: {
        ...item._snippetResult,
        content: {
          ...item._snippetResult?.content,
          value: `"...${textSnippet}..."`,
        },
      },
    };
  });
};

function Results({ config }: ResultsProps) {
  const { hits, showMore, isLastPage, results } = useInfiniteHits({
    ...config,
    transformItems: tidyItems,
  });

  const targetRef = useRef(null);
  function fetchHits(entries: any) {
    const [targetRefEntry] = entries;
    if (!isLastPage) targetRefEntry.isIntersecting && showMore(); // when targetRef element visible trigger showMore
  }
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.5, // percentage of how much the targetRef element is visible for fetchHits to trigger
  };

  useEffect(() => {
    const observer = new IntersectionObserver(fetchHits, options);
    const currentTarget = targetRef.current;
    currentTarget && observer.observe(currentTarget);
    return () => {
      currentTarget && observer.unobserve(currentTarget);
    };
  }, [targetRef, options]);

  return (
    <>
      {results && <p>{results.nbHits} resultados encontrados.</p>}
      <ul className="grid md:grid-cols-2 gap-4">
        {hits.map((hit, index) => (
          <li key={index} className="flex">
            <HitCard
              snippet={hit?._snippetResult?.content?.value as string}
              id={hit.id as string}
              date={hit.date as string}
            />
          </li>
        ))}
      </ul>
      {results && results.nbHits > 20 && !isLastPage && (
        <div ref={targetRef} className="grid md:grid-cols-2 gap-4">
          <HitCardSkeleton />
          <HitCardSkeleton />
        </div>
      )}
    </>
  );
}

export default Results;
