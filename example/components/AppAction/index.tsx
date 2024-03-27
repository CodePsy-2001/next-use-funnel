import type { ReactElement, ReactNode } from "react";
import { ActionButton } from "./action-button";
import { BackButton } from "./back-button";

export { BackButton };

export interface ActionItemProps {
  icon: ReactElement;
  onClick?: () => void;
  href?: string;
}

export interface ActionBarProps {
  backButton?: ReactElement;
  /** @default `""` */ title: ReactNode;
  /** @default [] */ actions: ActionItemProps[];
  className?: string;
}

export function AppAction({
  backButton,
  title = "",
  actions = [],
  className = "",
}: Partial<ActionBarProps>) {
  return (
    <header className={`grid select-none grid-cols-[1fr_auto] p-3 px-4 ${className}`}>
      <div className="flex items-center gap-3">
        <div className="mr-auto flex items-center">{backButton}</div>
        <h1 className="flex min-h-8 w-full items-center align-middle text-base font-semibold leading-none">
          {title}
        </h1>
      </div>
      <div className="ml-auto flex items-center gap-4">
        {actions.map((action, idx) => (
          <ActionButton key={action.href ?? idx} {...action} />
        ))}
      </div>
    </header>
  );
}
