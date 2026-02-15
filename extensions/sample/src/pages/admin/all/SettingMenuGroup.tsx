import { NavigationItemGroup } from '@components/admin/NavigationItemGroup.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import { Settings } from 'lucide-react';
import React from 'react';

interface SettingMenuGroupProps {
  storeSetting: string;
}

export default function SettingMenuGroup({ storeSetting }: SettingMenuGroupProps) {
  return (
    <NavigationItemGroup
      id="settingMenuGroup"
      name={_("Setting")}
      Icon={() => <Settings width={15} height={15} />}
      url={storeSetting}
    />
  );
}

export const layout = {
  areaId: 'adminMenu',
  sortOrder: 500
};

export const query = `
  query Query {
    storeSetting: url(routeId:"storeSetting")
  }
`;
