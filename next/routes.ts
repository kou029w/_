import { createElement } from "react";
import { Home, Info } from "@material-ui/icons";

const routes = [
  { pathname: "/", icon: createElement(Home) },
  { pathname: "/about", icon: createElement(Info) },
];
export default routes;
