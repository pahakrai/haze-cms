interface PaginationResult<T> {
  nodes: T[];
  __typename?: string;
}
interface Paginate {
  first?: number;
  last?: number;
  after?: string;
  before?: string;
  skip?: number;
}
