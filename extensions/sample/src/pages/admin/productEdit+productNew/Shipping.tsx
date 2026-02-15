import { CheckboxField } from '@components/common/form/CheckboxField.js';
import { NumberField } from '@components/common/form/NumberField.js';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@components/common/ui/Card.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface ShippingProps {
  product:
    | {
        noShippingRequired: boolean;
        weight: {
          value: number;
          unit: string;
        };
      }
    | undefined;
  setting: {
    weightUnit: string;
  };
}

export default function Shipping({ product, setting }: ShippingProps) {
  const shipping = product || {
    noShippingRequired: undefined,
    weight: undefined
  };
  const { control } = useFormContext();
  const noShippingRequired = useWatch({
    control,
    name: 'no_shipping_required',
    defaultValue:
      (shipping.noShippingRequired !== null && shipping.noShippingRequired) ||
      false
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{_('Shipping')}</CardTitle>
        <CardDescription>
          {_('Manage the shipping settings of the product.')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CheckboxField
          name="no_shipping_required"
          label={_('No shipping required?')}
          defaultValue={shipping.noShippingRequired === true}
          helperText={_('Select this option if the product is a digital product or service that does not require shipping.')}
          wrapperClassName="mb-0"
        />
      </CardContent>
      <CardContent>
        {!noShippingRequired && (
          <NumberField
            name="weight"
            placeholder={_('Enter weight')}
            label={_('Weight')}
            defaultValue={shipping.weight?.value}
            unit={setting?.weightUnit}
            required
            validation={{
              min: {
                value: 0,
                message: _('Weight must be a positive number')
              }
            }}
            helperText={_('Weight must be a positive number')}
          />
        )}
        {noShippingRequired && (
          <NumberField
            name="weight_no_shipping"
            placeholder={_('Enter weight')}
            label={_('Weight')}
            defaultValue={shipping.weight?.value}
            unit={setting?.weightUnit}
            disabled
            helperText={_('Weight must be a positive number')}
          />
        )}
      </CardContent>
    </Card>
  );
}

export const layout = {
  areaId: 'rightSide',
  sortOrder: 15
};

export const query = `
  query Query {
    product(id: getContextValue("productId", null)) {
      weight {
        value
        unit
      }
      noShippingRequired
    }
    setting {
      weightUnit
    }
  }
`;
