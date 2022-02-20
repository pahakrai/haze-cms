import { useState, useEffect } from 'react';
import RegionService from '../../../../../Services/APIServices/RegionService';

export const useRegion = ({ _id, skip }) => {
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState('');

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      if (!skip) {
        const data = await RegionService.getRegionById(_id);
        data && data.data && setRegion(data.data);
      }
      setLoading(false);
    };
    request();
  }, [_id, skip]);

  return {
    region,
    loading
  };
};
const useRegions = ({ parent, skip }) => {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      if (!skip) {
        const data = await RegionService.getRegions({
          parent,
          isActive: true,
          isAddress: true
        });
        data && data.data && data.data.length && setRegions(data.data);
      }
      setLoading(false);
    };
    request();
  }, [parent, skip]);

  return {
    regions,
    loading
  };
};
export const useSubmitHooks = (values, intl) => {
  const {
    countrys,
    states,
    citys,
    countrysLoading,
    statesLoading,
    citysLoading
  } = useMultilevelRegions({
    country: values.country,
    state: values.state
  });

  const fields = [
    ['name', 'contact_name_display'],
    [
      'country',
      'display_address_country',
      {
        select: true,
        options:
          countrys.map(v => ({
            value: v._id,
            label: v.name && v.name[intl.locale]
          })) || [],
        loading: countrysLoading
      }
    ],
    [
      'state',
      'display_address_state',
      {
        select: true,
        options:
          states.map(v => ({
            value: v._id,
            label: v.name && v.name[intl.locale]
          })) || [],
        loading: statesLoading,
        grid: {
          xs: 6
        }
      }
    ],
    [
      'city',
      'display_address_city',
      {
        select: true,
        options:
          citys.map(v => ({
            value: v._id,
            label: v.name && v.name[intl.locale]
          })) || [],
        loading: citysLoading,
        grid: {
          xs: 6
        }
      }
    ],
    [
      'address1',
      'display_address_address1',
      { placeholder: 'display_address_address1_placeholder' }
    ],
    [
      'address2',
      'display_address_address2',
      { placeholder: 'display_address_address2_placeholder' }
    ],
    [
      'phone',
      'display_phone',
      {
        grid: {
          xs: 6
        }
      }
    ],
    [
      'postCode',
      'post_code',
      {
        grid: {
          xs: 6
        }
      }
    ]
  ].map(v => ({ name: v[0], label: v[1], props: v[2] }));

  return {
    fields
  };
};
export const useMultilevelRegions = ({ country, state }) => {
  const { regions: countrys, loading: countrysLoading } = useRegions({
    parent: 'null'
  });
  const { regions: states, loading: statesLoading } = useRegions({
    parent: country,
    skip: !country
  });
  const { regions: citys, loading: citysLoading } = useRegions({
    parent: state,
    skip: !state
  });

  return {
    countrys,
    states,
    citys,
    countrysLoading,
    statesLoading,
    citysLoading
  };
};
