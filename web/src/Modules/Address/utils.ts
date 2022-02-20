import { useRegions } from "../Region/Hooks/useRegions";
export const useMultilevelRegions = ({
  country,
  state
}: {
  country?: string;
  state?: string;
}): {
  countrys: IRegion[];
  states: IRegion[];
  citys: IRegion[];
  countrysLoading: boolean;
  statesLoading: boolean;
  citysLoading: boolean;
} => {
  const { regions: countrys, regionsLoading: countrysLoading } = useRegions({
    variables: {
      query: { parent: null, isActive: true }
    }
  });
  const { regions: states, regionsLoading: statesLoading } = useRegions({
    variables: {
      query: { parent: country, isActive: true }
    },
    skip: !country
  });
  const { regions: citys, regionsLoading: citysLoading } = useRegions({
    variables: {
      query: { parent: state, isActive: true }
    },
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
