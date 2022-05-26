import Box from "@material-ui/core/Box";
import React from "react";
import Alert from "@material-ui/lab/Alert";
import i18next from "i18next";

export default function UnderConstructionPage() {
  const UNDER_CONSTRUCTION_MESSAGE = i18next.t("UNDER_CONSTRUCTION_MESSAGE", { returnObjects: true });

  return (
    <>
      <Box sx={{ mt: 25, mx: 50, elevation: 0, boxShadow: 0, textAlign: "center" }}>
        <Alert severity="warning" variant="filled">
          {UNDER_CONSTRUCTION_MESSAGE}
        </Alert>
      </Box>
    </>
  );
}
