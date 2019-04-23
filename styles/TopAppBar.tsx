import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar, IconButton } from "@material-ui/core";
import { Home } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

const TopAppBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar color="default">
        <Toolbar>
          <Link href="/">
            <IconButton>
              <Home />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default TopAppBar;
