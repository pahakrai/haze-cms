import { createContext, useContext, useState } from "react";

const FilterContext: any = createContext({});

interface FilterUpdatesData {
  industries: string[];
  setIndustries: (industries: string[]) => void;
  subjects: string[];
  setSubjects: (subjects: string[]) => void;
  regions: string[];
  setRegions: (regions: string[]) => void;
  organizations: string[];
  setOrganizations: (organizations: string[]) => void;
  createdFr: string;
  setCreatedFr: (date: string) => void;
  createdTo: string;
  setCreatedTo: (date: string) => void;
}

export const useFilters = () => {
  return useContext<FilterUpdatesData>(FilterContext);
};

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  // NOTE: DONT MERGE FILTERS TO SINGLE OBJECT AS REACT BATCHES STATE CONTROL
  const [industries, setIndustries] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [organizations, setOrganizations] = useState<string[]>([]);
  const [createdFr, setCreatedFr] = useState<string>("");
  const [createdTo, setCreatedTo] = useState<string>("");
  return (
    <FilterContext.Provider
      value={{
        industries,
        setIndustries,
        subjects,
        setSubjects,
        regions,
        setRegions,
        organizations,
        setOrganizations,
        createdFr,
        setCreatedFr,
        createdTo,
        setCreatedTo
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

// NOTE: Filter Listener if required
// type FilterListener = (filters: object) => void;
// let filterListener: FilterListener[] = [];
// export const subscribeFiltersChange = (cb: FilterListener) => {
//   const exist = filterListener.find((item) => item === cb);
//   if (exist) {
//     return;
//   } else {
//     filterListener.push(cb);
//   }
// };
// export const unsubscribeFiltersChange = (cb: FilterListener) => {
//   filterListener = filterListener.filter((item) => item !== cb);
// };

// export const changeTheme = (filters: object) => {
//   filterListener.map((item) => {
//     // map listener
//     item(filters);
//   });
// };
