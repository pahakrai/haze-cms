interface IStore {
  _id: string;
  workspace?: IWorkspace;
  address?: IAddress;
  status?: number;
  deprecatedDate?: string;
  workSchedule?: IWorkSchedule;
  createdAt?: string;
  updatedAt?: string;
}

interface IStoreSearchModel {
  q?: string;
  status?: number;
}

interface IWorkSchedule {
  worktime: WorkScheduleWorktime;
  workdays: [String];
}

interface IStoreSearchVariables {
  query: IStoreSearchModel;
  paginate?: Paginate;
  options?: IQueryOptions;
}

interface IQueryOptions {
  sort?: any;
  limit?: number;
}
