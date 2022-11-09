import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from "@america-transparente/ui/search";
import HitCard from "./HitCard";

interface ResultsProps {
  config?: UseInfiniteHitsProps;
}

const tidyItems: UseInfiniteHitsProps["transformItems"] = (items) => {
  return items.map((item, index) => {
    let indexOfSnippet =
      item?._snippetResult?.content?.value?.indexOf("</mark>");
    let indexOfNextLine = item?._snippetResult?.content?.value?.indexOf(
      "\n",
      indexOfSnippet
    );

    let thesubstring = item._snippetResult?.content?.value.substring(
      0,
      indexOfNextLine
    ) as string;

    let indexOfPrevLine = thesubstring.lastIndexOf("\n", indexOfSnippet - 100);

    thesubstring = thesubstring.substring(indexOfPrevLine, indexOfNextLine);

    return {
      ...item,
      _snippetResult: {
        ...item._snippetResult,
        content: {
          ...item._snippetResult?.content,
          value: thesubstring,
        },
      },
    };
  });
};

function Results({ config }: ResultsProps) {
  const { hits, showMore, isLastPage } = useInfiniteHits({
    ...config,
    transformItems: tidyItems,
  });

  return (
    <ul className="grid grid-cols-2 gap-4">
      {hits.map((hit, index) => (
        <li key={index} className="flex">
          <HitCard hit={hit} />
        </li>
      ))}
    </ul>
  );
}

export default Results;
