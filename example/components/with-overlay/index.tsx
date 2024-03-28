"use client";
import { ReactElement } from "react";

export interface OverlayProps {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}

export const Backdrop = ({ close }: { close: () => void }) => (
  <div onClick={close} className="fixed z-10 inset-0 bg-black bg-opacity-50" />
);

interface SheetProps extends OverlayProps {
  className?: string;
  handle?: boolean;
  content?: ReactElement;
  cta?: ReactElement;
}

export const Sheet = ({ className, handle, content, cta, isOpen, close }: SheetProps) => (
  <>
    <>
      {isOpen && <Backdrop close={close} />}
      {isOpen && (
        <section className={`sheet ${className}`}>
          {handle && (
            <div className="h-2">
              <button
                type="button"
                className="w-1/4 h-1 rounded-full bg-gray-500"
                onTouchStart={close}
              />
            </div>
          )}
          {content}
          {cta}
        </section>
      )}
    </>
  </>
);