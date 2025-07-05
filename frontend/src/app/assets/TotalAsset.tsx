import React, { useMemo, useState } from "react";

import { Amount, Button } from "../Zakah/common/Common";
import { calculateZakah } from "@/utils/helper";
import { IAsset } from "../types";
import { ConfirmationModal } from "@/UICommon/Modal";
import { getCurrentMonth, getCurrentYear } from "../Zakah/common/helper";
import { api } from "@/utils/api";
import { notifications, notify } from "../Zakah/common/notification";

const ModalBody = ({ amount, zakah }: { amount: number; zakah: number }) => {
  const year = getCurrentYear();
  const month = getCurrentMonth();
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>
        Do you wish to convert your asset to zakah on{" "}
        <span className="font-semibold text-green-600 font-con">
          {month} {year}
        </span>
        ?
      </h1>
      <h2 className="mt-2">
        <pre>
          <p>
            Asset <Amount fontColor="text-green-600" amount={amount} />
          </p>
          <p>
            Zakah <Amount fontColor="text-amber-600" amount={zakah} />
          </p>
        </pre>
      </h2>
    </div>
  );
};

const TotalAsset = ({ assets }: { assets: IAsset[] }) => {
  const [open, setOpen] = useState(false);
  const totalAsset = useMemo(() => {
    return assets.reduce(
      (acc: number, curr) =>
        Number(acc.toString().trim()) + Number(curr.amount.toString().trim()),
      0,
    );
  }, [assets]);
  const zakah = calculateZakah(totalAsset);

  const handleConvert = async () => {
    try {
      await api.post("/api/zakah-years/create/", {
        year: getCurrentYear().toString(),
        month: getCurrentMonth().toString(),
        total_amount: zakah,
        calculation_breakdown: assets,
      });
      notify.success(
        notifications.convert_asset.success.message,
        notifications.convert_asset.success.id,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Cannot convert zakah due to ", error);
      }
      notify.error(
        notifications.convert_asset.failed.message,
        notifications.convert_asset.failed.id,
      );
    }
  };

  return (
    <section>
      <div className="flex justify-center items-center flex-col">
        <pre>
          <p>
            Total Assets:{" "}
            <Amount fontColor="text-green-600" amount={totalAsset} />
          </p>
          <p>
            Estimated Zakah:{" "}
            <Amount fontColor="text-amber-600" amount={zakah} />
          </p>
        </pre>
        <Button twStyle="mt-4" onClick={() => setOpen(true)} disabled={false}>
          Convert
        </Button>
      </div>
      <ConfirmationModal
        open={open}
        setOpen={setOpen}
        body={<ModalBody amount={totalAsset} zakah={zakah} />}
        onConfirm={handleConvert}
      />
    </section>
  );
};

export default TotalAsset;
