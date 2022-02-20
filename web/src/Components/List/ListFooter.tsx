import React, { useState, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface ListFooterProps {
  loadMore?(): any;
  loading?: boolean;
  isEnd?: boolean;
  total?: number;
}
export const ListFooter = ({
  loadMore,
  loading,
  isEnd,
  total
}: ListFooterProps) => {
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const classes = useClasses();

  const _loadMore = useCallback(async () => {
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);
  }, [loadMore]);

  const _loading = loading || isLoadingMore;

  return (
    <div className={classes.container}>
      {!isEnd && (
        <Button
          variant="contained"
          color="primary"
          onClick={_loadMore}
          disabled={_loading}
        >
          {_loading && (
            <CircularProgress size={20} className={classes.loading} />
          )}
          <span>
            <FormattedMessage
              id={_loading ? "display_loading" : "display_load_more"}
            />
          </span>
        </Button>
      )}
      {isEnd && (
        <div className={classes.record}>
          <FormattedMessage id="display_total_record" values={{ n: total }} />
        </div>
      )}
    </div>
  );
};
const useClasses = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end"
  },
  record: {
    fontSize: 14,
    fontWeight: 600,
    color: "#565656",
    lineHeight: "20px"
  },
  loading: {
    marginRight: 5
  }
}));

export default ListFooter;
