import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Book, Puzzle } from 'lucide-react';
import React from 'react';

interface CmsMenuGroupProps {
  cmsPageGrid: string;
  widgetGrid: string;
}

export default function CmsMenuGroup({ cmsPageGrid, widgetGrid }: CmsMenuGroupProps) {
  return (
    <NavigationItemGroup
      id="cmsMenuGroup"
      name={_("CMS")}
      items={[
        {
          Icon: Book,
          url: cmsPageGrid,
          title: _('Pages')
        },
        {
          Icon: Puzzle,
          url: widgetGrid,
          title: _('Widgets')
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 60
};

export const query = `
  query Query {
    cmsPageGrid: url(routeId:"cmsPageGrid")
    widgetGrid: url(routeId:"widgetGrid")
  }
`;
