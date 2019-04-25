import React, { useState } from "react";
import { withRouter } from "next/router";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Tabs, Tab } from "@material-ui/core";
import routes from "../routes";

const TopAppBar: React.FC<{ router: any }> = ({ router }) => {
  const classes = makeStyles({
    root: {
      flexGrow: 1
    }
  })();
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
    <div className={classes.root}>
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
    </div>
  );
};
export default withRouter(TopAppBar);
