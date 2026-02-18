import { Button } from '@components/common/ui/Button.js';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@components/common/ui/Dialog.js';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from '@components/common/ui/Table.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { Method, ShippingMethod } from './Method.js';
import { MethodForm } from './MethodForm.js';

export interface MethodsProps {
  methods: Array<ShippingMethod>;
  reload: () => void;
  addMethodApi: string;
}

export function Methods({ reload, methods, addMethodApi }: MethodsProps) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  return (
    <div className="my-5 text-xs">
      <Table>
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="border-none">{_("Method")}</TableHead>
            <TableHead className="border-none">{_("Status")}</TableHead>
            <TableHead className="border-none">{_("Cost")}</TableHead>
            <TableHead className="border-none">{_("Condition")}</TableHead>
            <TableHead className="border-none">{_("Action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {methods.map((method) => (
            <TableRow
              key={method.methodId}
              className="border-divider py-5 text-xs"
            >
              <Method method={method} reload={reload} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <div className="mt-2">
          <DialogTrigger>
            <Button
              variant={'link'}
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              {_("+ Add Method")}
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent>
          <DialogTitle>{_("Add Shipping Method")}</DialogTitle>
          <MethodForm
            saveMethodApi={addMethodApi}
            onSuccess={() => {
              setDialogOpen(false);
            }}
            reload={reload}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
