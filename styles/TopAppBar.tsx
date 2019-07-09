import React, { useState } from "react";
import { withRouter } from "next/router";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import routes from "../routes";

const TopAppBar = withRouter(({ router }) => {
  const [value, setValue] = useState(
    routes.findIndex(({ pathname }) => pathname === router.pathname)
  );
  router.events.on("routeChangeStart", (url: string) => {
    setValue(
      routes.findIndex(
        ({ pathname }) => pathname === url.replace(/(?<=.)\/$/, "")
      )
    );
  });
  return (
    <AppBar color="default">
      <Tabs
        value={value}
        onChange={(_, value) => {
          router.push(routes[value].pathname);
          setValue(value);
        }}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {routes.map(({ icon }, i) => (
          <Tab key={i} icon={icon} />
        ))}
      </Tabs>
    </AppBar>
  );
});
export default TopAppBar;
