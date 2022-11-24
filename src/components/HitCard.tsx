import { memo } from "react";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Card, Button } from "@america-transparente/ui/core";

interface HitCardProps {
  snippet: string;
  id: string;
  date: string;
}

function HitCard({ snippet, id, date }: HitCardProps) {
  const documentDateLocalFormat = new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <div className="md:p-4 space-y-4 flex flex-col justify-between h-full">
        <p
          className="italic font-merriweather text-sm md:text-base break-words"
          dangerouslySetInnerHTML={{ __html: snippet }}
        />
        <div className="w-full flex justify-between items-center">
          <div className="font-bold">
            <p className="flex gap-1 items-center">
              Publicado el {documentDateLocalFormat}
            </p>
            <p className="flex gap-1 text-grayscale-5 items-center">ID: {id}</p>
          </div>
          <Button primary icon={true}>
            <ArrowDownTrayIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default memo(HitCard);