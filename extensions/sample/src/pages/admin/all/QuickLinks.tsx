import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { HomeIcon } from 'lucide-react';
import React from 'react';

interface QuickLinksProps {
  dashboard: string;
}

export default function QuickLinks({ dashboard }: QuickLinksProps) {
  return (
    <NavigationItemGroup
      id="quickLinks"
      name={_("Quick links")}
      items={[
        {
          Icon: HomeIcon,
          url: dashboard,
          title: _('Dashboard')
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 10
};

export const query = `
  query Query {
    dashboard: url(routeId: "dashboard")
  }
`;
