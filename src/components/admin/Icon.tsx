import React from "react";

/* The full KTK logo at the start of the admin header (Payload calls this
   graphic "Icon"). Payload sizes its slot for a small square mark, so
   custom.scss widens .step-nav__home to fit the wide lockup. */
export const Icon = () => (
  <img
    src="/brand/ktk-logo.png"
    alt="Kaung Thu Kha Group"
    width={1330}
    height={339}
    className="ktk-admin-logo"
  />
);

export default Icon;
