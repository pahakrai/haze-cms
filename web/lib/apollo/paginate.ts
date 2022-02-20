import { useRef, useEffect } from "react";

export interface IPaginate {
  first?: number;
  last?: number;
  skip?: number;
}

export const usePaginateProps = (
  props: any,
  queryName: any,
  paginate: IPaginate = { first: 5 },
  fetchedEndCursors: Array<any> = []
) => {
  const {
    fetchMore,
    refetch,
    loading,
    error,
    subscribeToMore,
    networkStatus,
    variables,
    data: {
      [queryName]: { nodes, endCursor, isEnd, total: totalNumber } = {
        endCursor: "",
        isEnd: false,
        nodes: [],
        total: 0
      }
    } = {}
  } = props;
  return {
    [`${queryName}`]: nodes,
    [`${queryName}Loading`]: loading,
    [`${queryName}Error`]: error,
    [`${queryName}FetchMore`]: () => {
      if (
        isEnd ||
        !endCursor ||
        networkStatus === 4 ||
        loading ||
        fetchedEndCursors.some((o) => o === endCursor)
      ) {
        return;
      }
      fetchedEndCursors.push(endCursor);
      return fetchMore({
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          const previousObj = previousResult[queryName];
          const newObj = fetchMoreResult[queryName];
          const _nodes = [
            ...(previousObj ? previousObj.nodes : []),
            ...newObj.nodes
          ];
          return {
            [queryName]: {
              __typename: newObj.__typename,
              endCursor: newObj.endCursor,
              isEnd: newObj.isEnd,
              nodeCount: _nodes.length,
              nodes: _nodes,
              startCursor: previousObj.startCursor,
              total: newObj.total
            }
          };
        },
        variables: {
          ...variables,
          paginate: { ...variables.paginate, ...paginate, after: endCursor }
        }
      });
    },
    [`${queryName}Refetch`]: () => {
      fetchedEndCursors.splice(0);
      refetch && refetch();
    },
    [`${queryName}Refetching`]: networkStatus === 4,
    [`${queryName}SubscribeToMore`]: subscribeToMore,
    [`${queryName}IsEnd`]: isEnd,
    [`${queryName}TotalNumber`]: totalNumber
  };
};

export const paginateProps = (
  props: any,
  queryName: any,
  paginate: IPaginate = { first: 5 },
  fetchedEndCursors: Array<any> = []
) => {
  const {
    data: {
      fetchMore,
      refetch,
      loading,
      error,
      subscribeToMore,
      networkStatus,
      variables,
      [queryName]: { nodes, endCursor, isEnd, total: totalNumber } = {
        endCursor: "",
        isEnd: false,
        nodes: [],
        total: 0
      }
    }
  } = props;
  return {
    [`${queryName}`]: nodes,
    [`${queryName}Loading`]: loading,
    [`${queryName}Error`]: error,
    [`${queryName}FetchMore`]: () => {
      if (
        isEnd ||
        !endCursor ||
        networkStatus === 4 ||
        loading ||
        fetchedEndCursors.some((o) => o === endCursor)
      ) {
        return;
      }
      fetchedEndCursors.push(endCursor);
      return fetchMore({
        updateQuery: (previousResult: any, { fetchMoreResult }: any) => {
          const previousObj = previousResult[queryName];
          const newObj = fetchMoreResult[queryName];
          const _nodes = [
            ...(previousObj ? previousObj.nodes : []),
            ...newObj.nodes
          ];
          return {
            [queryName]: {
              __typename: newObj.__typename,
              endCursor: newObj.endCursor,
              isEnd: newObj.isEnd,
              nodeCount: _nodes.length,
              nodes: _nodes,
              startCursor: previousObj.startCursor,
              total: newObj.total
            }
          };
        },
        variables: {
          ...variables,
          paginate: { ...variables.paginate, ...paginate, after: endCursor }
        }
      });
    },
    [`${queryName}Refetch`]: (variables?: any) => {
      fetchedEndCursors.splice(0);
      refetch && refetch(variables);
    },
    [`${queryName}Refetching`]: networkStatus === 4,
    [`${queryName}SubscribeToMore`]: subscribeToMore,
    [`${queryName}IsEnd`]: isEnd,
    [`${queryName}TotalNumber`]: totalNumber
  };
};

export class Paginate {
  protected fetchedEndCursors: string[] = [];
  protected queryName: string = "";
  protected paginate?: IPaginate = undefined;

  constructor(queryName: string, paginate: any) {
    this.queryName = queryName;
    this.paginate = paginate;
    paginate.__proto__ = {
      options: this.options,
      useProps: this.useProps,
      props: this.props,
      reset: this.reset
    };
    return paginate;
  }

  public useProps = (props: any) => {
    return usePaginateProps(
      props,
      this.queryName,
      this.paginate,
      this.fetchedEndCursors
    );
  };

  public reset = () => {
    this.fetchedEndCursors.splice(0);
  };

  public props = (props: any) => {
    return paginateProps(
      props,
      this.queryName,
      this.paginate,
      this.fetchedEndCursors
    );
  };

  public options = (opts = { variables: (props: any) => ({}) }) => (
    props: any
  ) => {
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        ...(opts.variables ? opts.variables(props) : {}),
        paginate: this.paginate
      }
    };
  };
}

export const usePaginate = (queryName: string, paginateOpts: IPaginate) => {
  const paginateRef = useRef(new Paginate(queryName, paginateOpts));
  useEffect(() => {
    paginateRef.current?.reset();
  });
  return paginateRef.current;
};
