import { useState, useEffect } from "react";
import { useCheckout } from "./useCheckout";
import { useWorkspace } from "~/src/Modules/Workspace/Hooks/useWorkspace";

export const useGetCheckOutUrl = ({
  orderId,
  skip
}: {
  orderId?: string;
  skip?: boolean;
}) => {
  const [url, setUrl] = useState("");
  const { checkout, loading } = useCheckout();
  const { workspace } = useWorkspace();

  useEffect(() => {
    const request = async () => {
      try {
        const result: any = await checkout({ orderId }, false);
        const checkoutId = result?.data?.checkout?._id;

        if (checkoutId) {
          const domain = workspace?.webHost
            ?.replace(/[/]*$/, "")
            .replace(/^http:\/\//, "");
          const http = workspace?.alwaysHttpsWebHost ? "https" : "http";
          setUrl(`${http}://${domain}/order/checkout?id=${checkoutId}`);
        }
      } catch (e) {}
    };
    !skip && orderId && workspace && request();
  }, [skip, orderId, workspace]);

  return { url, loading };
};
