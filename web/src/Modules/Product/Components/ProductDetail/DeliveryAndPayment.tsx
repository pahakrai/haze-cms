import React from "react";

import { usePagesSectionResult } from "~/src/Modules/Page/hooks";
import { PageSection } from "~/src/Modules/Page/Components";

export const DeliveryAndPayment = () => {
  const pagesResult = usePagesSectionResult({
    prefix: "product",
    sections: ["delivery-and-payment"]
  });

  return (
    <PageSection
      prefix="product"
      section="delivery-and-payment"
      pagesResult={pagesResult}
      loadRes={{ height: 50 }}
    />
  );
};

export default DeliveryAndPayment;
