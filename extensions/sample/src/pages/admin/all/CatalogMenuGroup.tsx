import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Box, Hash, Link, Tag } from 'lucide-react';
import React from 'react';

interface CatalogMenuGroupProps {
  productGrid: string;
  categoryGrid: string;
  attributeGrid: string;
  collectionGrid: string;
}

export default function CatalogMenuGroup({
  productGrid,
  categoryGrid,
  attributeGrid,
  collectionGrid
}: CatalogMenuGroupProps) {
  return (
    <NavigationItemGroup
      id="catalogMenuGroup"
      name={_("Catalog")}
      items={[
        {
          Icon: Box,
          url: productGrid,
          title: _('Products')
        },
        {
          Icon: Link,
          url: categoryGrid,
          title: _('Categories')
        },
        {
          Icon: Tag,
          url: collectionGrid,
          title: _('Collections')
        },
        {
          Icon: Hash,
          url: attributeGrid,
          title: _('Attributes')
        }
      ]}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 20
};

export const query = `
  query Query {
    productGrid: url(routeId:"productGrid")
    categoryGrid: url(routeId:"categoryGrid")
    attributeGrid: url(routeId:"attributeGrid")
    collectionGrid: url(routeId:"collectionGrid")
  }
`;
