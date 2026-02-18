import Spinner from '@components/admin/Spinner.js';
import { Form } from '@components/common/form/Form.js';
import { InputField } from '@components/common/form/InputField.js';
import { ReactSelectField } from '@components/common/form/ReactSelectField.js';
import { Button } from '@components/common/ui/Button.js';
import { _ } from '@evershop/evershop/lib/locale/translate/_';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'urql';
import { ShippingZone } from './Zone.js';

export interface ZoneFormProps {
  formMethod?: 'POST' | 'PATCH';
  saveZoneApi: string;
  onSuccess: () => void;
  reload: () => void;
  zone?: ShippingZone;
}

const CountriesQuery = `
  query Country {
    countries {
      value: code
      label: name
      provinces {
        value: code
        label: name
      }
    }
  }
`;

function ZoneForm({
  formMethod,
  saveZoneApi,
  onSuccess,
  reload,
  zone
}: ZoneFormProps) {
  const form = useForm();
  const countryWatch = form.watch('country', zone?.country?.code);
  const [{ data, fetching, error }] = useQuery({
    query: CountriesQuery
  });

  React.useEffect(() => {
    if (countryWatch !== zone?.country?.code) {
      form.setValue('provinces', []);
    }
  }, [countryWatch, zone?.country?.code, form]);

  if (fetching) return <Spinner width={20} height={20} />;
  if (error) {
    return <p className="text-destructive">{_("Error loading countries")}</p>;
  }
  return (
    <Form
      id="createShippingZone"
      method={formMethod || 'POST'}
      action={saveZoneApi}
      submitBtn={false}
      onSuccess={async () => {
        await reload();
        onSuccess();
      }}
      form={form}
    >
      <div className="space-y-3">
        <InputField
          name="name"
          label={_("Zone Name")}
          aria-label={_("Zone Name")}
          placeholder={_("Enter zone name")}
          required
          validation={{ required: _('Zone name is required') }}
          defaultValue={zone?.name}
        />
        <ReactSelectField
          name="country"
          label={_("Country")}
          aria-label={_("Country")}
          placeholder={_("Select country")}
          required
          validation={{ required: _('Country is required') }}
          options={data.countries}
          hideSelectedOptions={false}
          isMulti={false}
          defaultValue={zone?.country?.code}
        />
        <ReactSelectField
          name="provinces"
          label={_("Provinces/States")}
          aria-label={_("Provinces/States")}
          placeholder={_("Select provinces/states")}
          options={
            data.countries.find((c) => c.value === countryWatch)?.provinces ||
            []
          }
          hideSelectedOptions
          isMulti
          defaultValue={(zone?.provinces || []).map(
            (province) => province.code
          )}
        />
        <div className="flex justify-end gap-2">
          <Button
            title={_("Save")}
            variant="default"
            onClick={() => {
              const form = document.getElementById(
                'createShippingZone'
              ) as HTMLFormElement | null;
              if (form) {
                form.dispatchEvent(
                  new Event('submit', {
                    cancelable: true,
                    bubbles: true
                  })
                );
              }
            }}
          >
            {_("Save")}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export { ZoneForm };
