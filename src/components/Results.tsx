import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from "@america-transparente/ui/search";
import HitCard from "./HitCard";

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
  const { hits, showMore, isLastPage } = useInfiniteHits({
    ...config,
    transformItems: tidyItems,
  });

  return (
    <ul className="grid lg:grid-cols-2 gap-4">
      {hits.map((hit, index) => (
        <li key={index} className="flex">
          <HitCard hit={hit as any} />
        </li>
      ))}
    </ul>
  );
}

export default Results;
