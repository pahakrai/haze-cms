import Common from "@golpasal/common";

import { useAddMyAddress } from "~/src/Modules/Address/Hooks/useAddMyAddress";
import { useUpdateMyAddress } from "~/src/Modules/Address/Hooks/useUpdateMyAddress";

export const useSubmitAddressHooks = () => {
  const onCompleted = () => {};
  const onError = () => {};

  const { addMyAddress, loading: addMyAddressLoading } = useAddMyAddress({
    onCompleted,
    onError
  });
  const { updateMyAddress, loading: updateMyAddressLoading } =
    useUpdateMyAddress({ onCompleted, onError });

  return {
    addMyAddress,
    addMyAddressLoading,
    updateMyAddress,
    updateMyAddressLoading
  };
};
