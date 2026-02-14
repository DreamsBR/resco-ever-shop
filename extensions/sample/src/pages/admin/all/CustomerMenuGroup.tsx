import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { User } from 'lucide-react';
import React from 'react';

interface CustomerMenuGroupProps {
  customerGrid: string;
}

export default function CustomerMenuGroup({ customerGrid }: CustomerMenuGroupProps) {
  return (
    <NavigationItemGroup
      id="customerMenuGroup"
      name={_("Customer")}
      items={[
        {
          Icon: User,
          url: customerGrid,
          title: _('Customers')
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 40
};

export const query = `
  query Query {
    customerGrid: url(routeId:"customerGrid")
  }
`;
