import { Typography } from "@material-ui/core";
import React from "react";
import i18next from "i18next";

export default function NoData() {
  const NO_DATA_MESSAGE = i18next.t("NO_DATA_MESSAGE", { returnObjects: true });

  return (
    <>
      <Typography variant="h4">{NO_DATA_MESSAGE}</Typography>
    </>
  );
}
