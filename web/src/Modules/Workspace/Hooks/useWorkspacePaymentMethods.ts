import { useQuery } from "@apollo/client";
import {
  QUERY_WORKSPACE_PAYMENT_METHODS,
  WORKSPACE_PAYMENT_METHOD_FIELD
} from "../Apollo/gqls";

interface useWorkspacePaymentMethodsArgs {}
interface useWorkspacePaymentMethodsHook {
  workspacePaymentMethods?: IWorkspacePaymentMethod[];
  loading?: boolean;
}
export const useWorkspacePaymentMethods = (
  args?: useWorkspacePaymentMethodsArgs
): useWorkspacePaymentMethodsHook => {
  const { data, loading } = useQuery<{
    workspacePaymentMethods: PaginationResult<IWorkspacePaymentMethod>;
  }>(QUERY_WORKSPACE_PAYMENT_METHODS(WORKSPACE_PAYMENT_METHOD_FIELD), {
    variables: {
      query: { platform: "web" }
    }
  });
  return {
    workspacePaymentMethods: data?.workspacePaymentMethods.nodes,
    loading
  };
};
