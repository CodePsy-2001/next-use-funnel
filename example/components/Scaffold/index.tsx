import type { ReactElement } from "react";
import "./scaffold.css";

export type ScaffoldProps = Partial<{
  topBar: ReactElement;
  content: ReactElement;
  bottomBar: ReactElement;
}>;

export function Scaffold({ content, topBar, bottomBar }: ScaffoldProps) {
  return (
    <div
      id="scaffold"
      className="relative m-auto flex min-h-screen w-full flex-col p-0 outline-none"
    >
      <div className={`z-10 w-full shrink-0 sticky inset-x-0 top-0 ${!topBar ? "hidden" : ""}`}>
        {topBar}
      </div>
      {content}
      <div className="sticky bottom-0 z-[100]">{bottomBar}</div>
    </div>
  );
}
