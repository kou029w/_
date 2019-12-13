import React from "react";
import { useRouter } from "next/router";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import routes from "../routes";

const TopAppBar = () => {
  const router = useRouter();
  const pathname = (
    routes.find(({ pathname }) => pathname === router.pathname) || {
      pathname: "/"
    }
  ).pathname;
  return (
    <AppBar color="default">
      <Tabs
        value={pathname}
        onChange={(_, value) => {
          router.push(value);
        }}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {routes.map(({ pathname, icon }) => (
          <Tab key={pathname} value={pathname} icon={icon} />
        ))}
      </Tabs>
    </AppBar>
  );
};
export default TopAppBar;
