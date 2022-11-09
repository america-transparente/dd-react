import { Card } from "@america-transparente/ui/core";
import { Snippet } from "@america-transparente/ui/search";

interface HitCardProps {
  hit: any;
}

function HitCard({ hit }: HitCardProps) {
  return (
    <Card title="hola">
      <Snippet hit={hit} attribute="content" />
    </Card>
  );
}

export default HitCard;
