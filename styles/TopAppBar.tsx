import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
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
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {routes.map(({ pathname, icon }) => (
          <Tab
            key={pathname}
            value={pathname}
            icon={icon}
            component={props => (
              <Link
                href={pathname}
                as={`${process.env.NEXT_BASE_PATH}${pathname}`}
              >
                <a {...props} />
              </Link>
            )}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};
export default TopAppBar;
