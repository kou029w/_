import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import routes from "../routes";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const TopAppBar = () => {
  const router = useRouter();
  const currentPathname = React.useMemo(
    () =>
      router.pathname.startsWith(basePath)
        ? router.pathname.slice(basePath.length)
        : router.pathname,
    [router.pathname]
  );
  const tabPathname = React.useMemo(
    () =>
      routes.reduce(
        (prev, { pathname }) =>
          pathname === currentPathname ? pathname : prev,
        "/"
      ),
    [currentPathname]
  );
  return (
    <AppBar color="default">
      <Tabs
        value={tabPathname}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        {routes.map(({ pathname, icon }, index) => (
          <Tab
            key={index}
            value={pathname}
            icon={icon}
            component={React.forwardRef<HTMLAnchorElement, {}>((props, ref) => (
              <Link href={pathname}>
                <a ref={ref} href={[basePath, pathname].join("")} {...props} />
              </Link>
            ))}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};
export default TopAppBar;
