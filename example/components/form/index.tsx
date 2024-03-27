import type { ReactNode } from "react";
import { convertNewlineToJSX } from "@/utils/convertNewlineToJSX";

export const Legend = ({
  icon,
  content,
  description,
  title = false,
}: {
  icon?: ReactNode;
  content: string;
  description?: string;
  title?: boolean;
}) => (
  <div className="flex flex-col gap-8 mb-12">
    {icon}
    <div className="flex flex-col gap-2.5">
      <h1 className={`${title ? "text-3xl" : "text-2xl"} font-bold`}>
        {convertNewlineToJSX(content)}
      </h1>
      {description && (
        <p className="text-gray-500 leading-tight">{convertNewlineToJSX(description)}</p>
      )}
    </div>
  </div>
);

export const Info = ({ icon, description }: { icon: ReactNode; description: string }) => (
  <div className="flex gap-6 items-center text-lg">
    <span className="font-toss-face text-xl">{icon}</span>
    <p className="font-semibold">{description}</p>
  </div>
);
