import { Fragment } from "react";

export const convertNewlineToJSX = (str: string) =>
  str
    .replace(/\\n/g, "\n")
    .split("\n")
    .map((line, index) => (
      <Fragment key={index}>
        {index > 0 ? <br /> : null}
        {line}
      </Fragment>
    ));
