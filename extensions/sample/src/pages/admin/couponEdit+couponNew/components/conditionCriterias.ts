import { _ } from '@evershop/evershop/lib/locale/translate/_';

export enum Operator {
  EQUAL = '=',
  NOT_EQUAL = '!=',
  GREATER = '>',
  GREATER_OR_EQUAL = '>=',
  SMALLER = '<',
  SMALLER_OR_EQUAL = '<=',
  IN = 'IN',
  NOT_IN = 'NOT IN'
}

export type ConditionKey = {
  key: string;
  label: string;
};

export type OperatorOption = {
  key: Operator;
  label: string;
};

const options: ConditionKey[] = [
  {
    key: 'category',
    label: _('Category')
  },
  {
    key: 'collection',
    label: _('Collection')
  },
  {
    key: 'attribute_group',
    label: _('Attribute Group')
  },
  {
    key: 'sku',
    label: _('Sku')
  },
  {
    key: 'price',
    label: _('Price')
  }
];

const operators: OperatorOption[] = [
  {
    key: Operator.EQUAL,
    label: _('Equal')
  },
  {
    key: Operator.NOT_EQUAL,
    label: _('Not equal')
  },
  {
    key: Operator.GREATER,
    label: _('Greater')
  },
  {
    key: Operator.GREATER_OR_EQUAL,
    label: _('Greater or equal')
  },
  {
    key: Operator.SMALLER,
    label: _('Smaller')
  },
  {
    key: Operator.SMALLER_OR_EQUAL,
    label: _('Equal or smaller')
  },
  {
    key: Operator.IN,
    label: _('In')
  },
  {
    key: Operator.NOT_IN,
    label: _('Not in')
  }
];

export { options, operators };
