import { Dispatch } from "react";
import { Card, Button } from "@america-transparente/ui/core";
import { Dialog } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface DonationCardProps {
  displayCard: boolean;
  setDisplayCard: Dispatch<React.SetStateAction<boolean>>;
}

function WarningModal({ displayCard, setDisplayCard }: DonationCardProps) {
  return (
    <Dialog
      open={displayCard}
      onClose={() => setDisplayCard(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex items-center justify-center bg-black/30 p-4">
        <Dialog.Panel>
          <Card>
            <div className="max-h-[75vh] max-w-2xl space-y-4 overflow-auto rounded-2xl p-4 text-lg md:text-xl">
              <div className="flex items-center justify-between gap-1">
                <p className="text-xl font-extrabold md:text-2xl">
                  ¡Hola! Ten en cuenta esto:
                </p>
                <Button
                  primary={false}
                  icon={true}
                  color="primary-rl"
                  aria-label="Cerrar"
                  className="shrink-0"
                  onClick={() => setDisplayCard(false)}
                >
                  <XMarkIcon className="h-6 w-6 text-black dark:text-white" />
                </Button>
              </div>
              <p>
                Esta versión de Dueños Directos se basa en un{" "}
                <strong>conjunto incompleto</strong> de documentos de distintas
                fuentes.{" "}
                <strong>Ten esto en cuenta al usar la plataforma.</strong>
              </p>
            </div>
          </Card>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default WarningModal;
