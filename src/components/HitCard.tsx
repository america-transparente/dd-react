import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { Card, Button } from "@america-transparente/ui/core";
import { Snippet } from "@america-transparente/ui/search";

interface HitCardProps {
  hit: any;
}

function HitCard({ hit }: HitCardProps) {
  return (
    <Card title="">
      <DocumentTextIcon className="h-6 w-6" />
      <Snippet hit={hit} attribute="content" />
      <div className="w-full flex justify-end">
        <Button primary icon={true}>
          <ArrowDownTrayIcon className="h-6 w-6" />
        </Button>
      </div>
    </Card>
  );
}

export default HitCard;
