import React from "react"

import { Amount } from "../Zakah/common/Common";
import { calculateZakah } from "@/utils/helper";

const TotalAsset = ({ totalAsset }: { totalAsset: number }) => {
  const zakah = calculateZakah(totalAsset);

  return (
    <section>
      <pre>
        <p>Total Assets:    <Amount fontColor="text-green-600" amount={totalAsset} /></p>
        <p>Estimated Zakah: <Amount fontColor="text-green-600" amount={zakah} /></p>
      </pre>
    </section>
  );
};

export default TotalAsset;
