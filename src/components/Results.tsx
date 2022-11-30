import { useRef, useEffect } from "react";
import {
  useInfiniteHits,
  type UseInfiniteHitsProps,
} from "@america-transparente/ui/search";
import HitCard from "./HitCard";
import HitCardSkeleton from "../components/HitCardSkeleton";

interface ResultsProps {
  config?: UseInfiniteHitsProps;
}

function capitalizeTextSnippet(textSnippet: string) {
  return textSnippet
    .toLowerCase()
    .replace(/(^|\s)\S/g, (firstLetter: string) => firstLetter.toUpperCase());
}

const tidyItems: UseInfiniteHitsProps["transformItems"] = (items) => {
  return items.map((item) => {
    const snippetResult =
      item._snippetResult instanceof Array
        ? item._snippetResult[0]
        : item._snippetResult;
    // where end search key word is
    const indexOfSnippet: number =
      snippetResult.content.value.indexOf("</mark>");
    // line break after search key word
    const indexOfNextLine: number = snippetResult.content.value.indexOf(
      "\n",
      indexOfSnippet
    );
    // line break before search key word
    const indexOfPrevLine: number = snippetResult.content.value.lastIndexOf(
      "\n",
      indexOfSnippet
    );

    const textSnippet: string = snippetResult.content.value.substring(
      indexOfPrevLine - 200,
      indexOfNextLine + 100
    );

    // check if 20% or more of the text is in uppercase
    const innerText = textSnippet.match(/[A-Z]/g);
    const isTextUppercase = innerText
      ? innerText.length > textSnippet.length * 0.2
      : false;

    return {
      ...item,
      _snippetResult: {
        ...snippetResult,
        content: {
          ...snippetResult.content,
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
      <ul className="grid gap-4 py-4 md:grid-cols-2">
        {hits.map((hit, index) => {
          const snippetResult =
            hit._snippetResult instanceof Array
              ? hit._snippetResult[0]
              : hit._snippetResult;
          return (
            <li key={index} className="flex">
              <HitCard
                snippet={snippetResult.content.value}
                cve={hit.cve as string}
                url={hit.url as string}
                date={hit.date as string}
              />
            </li>
          );
        })}
      </ul>
      {results && results.nbHits > 20 && !isLastPage && (
        <div ref={targetRef} className="grid gap-4 md:grid-cols-2">
          <HitCardSkeleton />
          <HitCardSkeleton />
        </div>
      )}
    </>
  );
}

export default Results;
