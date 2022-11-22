import { useRef, useEffect } from "react";
import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from "@america-transparente/ui/search";
import HitCard from "./HitCard";
import HitCardSkeleton from "../components/HitCardSkeleton";
import Hit from "../interface/hit";

interface ResultsProps {
  config?: UseInfiniteHitsProps;
}

function capitalizeTextSnippet(textSnippet: string) {
  return textSnippet
    .toLowerCase()
    .replace(/(^|\s)\S/g, (firstLetter: string) => firstLetter.toUpperCase());
}

const tidyItems = (items: Hit[]) => {
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

    let textSnippet: string = item._snippetResult.content.value.substring(
      indexOfPrevLine - 200,
      indexOfNextLine + 100
    );

    // check if 60% or more of the text is in uppercase
    let isTextUppercase =
      textSnippet.match(/[A-Z]/g).length > textSnippet.length * 0.6;

    return {
      ...item,
      _snippetResult: {
        ...item._snippetResult,
        content: {
          ...item._snippetResult?.content,
          value: `"...${
            isTextUppercase ? capitalizeTextSnippet(textSnippet) : textSnippet
          }..."`,
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
              snippet={hit?._snippetResult?.content?.value}
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
