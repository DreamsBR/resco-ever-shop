import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Package } from 'lucide-react';
import React from 'react';

interface OmsMenuGroupProps {
  orderGrid: string;
}

export default function OmsMenuGroup({ orderGrid }: OmsMenuGroupProps) {
  return (
    <NavigationItemGroup
      id="omsMenuGroup"
      name={_("Sale")}
      items={[
        {
          Icon: Package,
          url: orderGrid,
          title: _('Orders')
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 30
};

export const query = `
  query Query {
    orderGrid: url(routeId:"orderGrid")
  }
`;
