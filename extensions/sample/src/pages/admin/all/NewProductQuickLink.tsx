import { NavigationItem } from '@components/admin/NavigationItem.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { BoxIcon } from 'lucide-react';
import React from 'react';

interface NewProductQuickLinkProps {
  productNew: string;
}

export default function NewProductQuickLink({ productNew }: NewProductQuickLinkProps) {
  return <NavigationItem Icon={BoxIcon} title={_("New Product")} url={productNew} />;
}

export const layout = {
  areaId: 'quickLinks',
  sortOrder: 20
};

export const query = `
  query Query {
    productNew: url(routeId:"productNew")
  }
`;
