import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { Card, Button } from "@america-transparente/ui/core";
import { Snippet } from "@america-transparente/ui/search";
import Hit from "../interface/hit";

interface HitCardProps {
  hit: Hit;
}

function HitCard({ hit }: HitCardProps) {
  const documentDateLocalFormat = new Date(hit.date).toLocaleDateString(
    "es-ES"
  );

  return (
    <Card>
      <div className="p-4 space-y-4 flex flex-col justify-between h-full">
        {/* <Snippet
          hit={hit as any}
          attribute="content"
          classNames={{
            root: "italic font-merriweather",
            highlighted: "bg-primary/40",
          }}
        /> */}
        <p
          className="italic font-merriweather"
          dangerouslySetInnerHTML={{ __html: hit._snippetResult.content.value }}
        />
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-1 font-bold">
            <p>
              Publicado el {documentDateLocalFormat} ·{" "}
              <span className="text-grayscale-5">{hit.id}</span>
            </p>
          </div>
          <Button primary icon={true}>
            <ArrowDownTrayIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default HitCard;
