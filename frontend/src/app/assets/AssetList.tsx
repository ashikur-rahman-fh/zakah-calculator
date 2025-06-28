"use client";
import React from "react";

import { IAsset } from "../types";
import { Amount } from "../Zakah/common/Common";

const AssetList = ({ assets }: { assets: IAsset[] }) => {

  return (
    <section className="mt-8">
      <div>
        {assets.map((asset) => {
          return (
            <div key={asset.name} className="grid grid-cols-12 mb-2">
              <div className="col-span-9 font-semibold">
                {asset.name}
              </div>
              <div className="col-span-3">
                <pre>
                  <Amount fontColor="text-green-600 font-semibold" amount={asset.amount} />
                </pre>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AssetList;
