import React from "react";

import { GlassCardHeader } from "../Common";

const PayZakah = () => {

  return (
    <section>
      <GlassCardHeader>Pay Zakah</GlassCardHeader>
      <div>
        <input className="bg-white/20" type="text" placeholder="Year" />
        <input type="text" placeholder="amount" />
      </div>
    </section>
  );
};

export default PayZakah;
