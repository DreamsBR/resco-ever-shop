import { CardContent } from '@components/common/ui/Card.js';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle
} from '@components/common/ui/Dialog.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import axios from 'axios';
import { MapPin } from 'lucide-react';
import React from 'react';
import { toast } from 'react-toastify';
import { ShippingMethod } from './Method.js';
import { Methods } from './Methods.js';
import { ZoneForm } from './ZoneForm.js';

export interface ShippingZone {
  name: string;
  uuid: string;
  country?: {
    name: string;
    code: string;
  };
  provinces: Array<{
    name: string;
    code: string;
  }>;
  methods: Array<ShippingMethod>;
  addMethodApi: string;
  deleteApi: string;
  updateApi: string;
}

export interface ZoneProps {
  zone: ShippingZone;
  reload: () => void;
}

function Zone({ zone, reload }: ZoneProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <CardContent className="space-y-3 pt-3 border-t border-border">
      <div className="flex justify-between items-center gap-5">
        <div className="text-xs uppercase font-semibold">{zone.name}</div>
        <div className="flex justify-between gap-5">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger>{_("Edit Zone")}</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{_("Edit Shipping Zone")}</DialogTitle>
              </DialogHeader>
              <ZoneForm
                formMethod="PATCH"
                saveZoneApi={zone.updateApi}
                onSuccess={() => setDialogOpen(false)}
                reload={reload}
                zone={zone}
              />
            </DialogContent>
          </Dialog>
          <a
            className="text-destructive"
            href="#"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const response = await axios.delete(zone.deleteApi);
                if (response.status === 200) {
                  toast.success(_('Zone removed successfully'));
                  setTimeout(() => {
                    window.location.reload();
                  }, 1500);
                } else {
                  toast.error(_('Failed to remove zone'));
                }
              } catch (error) {
                toast.error(_('Failed to remove zone'));
              }
            }}
          >
            {_("Remove Zone")}
          </a>
        </div>
      </div>
      <div className="divide-y border rounded border-divider">
        <div className="flex justify-start items-center border-divider">
          <div className="p-5">
            <MapPin width={20} height={20} />
          </div>
          <div className="grow px-2">
            <div>
              <b>{zone.country?.name || _('Worldwide')}</b>
            </div>
            <div>
              {zone.provinces
                .slice(0, 3)
                .map((province) => province.name)
                .join(', ')}
              {zone.provinces.length > 3 && '...'}
            </div>
          </div>
        </div>
        <div className="flex justify-start items-center border-divider">
          <div className="grow px-2">
            <Methods
              methods={zone.methods}
              reload={reload}
              addMethodApi={zone.addMethodApi}
            />
          </div>
        </div>
      </div>
    </CardContent>
  );
}

export { Zone };
