import { css } from "@stitches/core";

const styles = css({
  color: "white",
  backgroundColor: "blue",
  borderRadius: "9999px",
  fontSize: "16px",
  fontWeight: "bolder",
  border: 0,
  "&:hover": {
    boxShadow: "0 0 10px black",
    transitionDuration: "100ms",
  },
});

const button = document.createElement("button");
button.textContent = "青いボタン";
button.classList.add(styles());

document.body.append(button);
