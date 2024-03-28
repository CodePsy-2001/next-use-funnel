"use client";
import { ReactElement } from "react";

export interface OverlayProps {
  isOpen: boolean;
  close: () => void;
  exit: () => void;
}

export const Backdrop = ({ close }: { close: () => void }) => (
  <div
    onClick={close}
    className="fixed tablet:max-w-[375px] m-auto z-10 inset-0 bg-black bg-opacity-50"
  />
);

interface SheetProps extends OverlayProps {
  className?: string;
  handle?: boolean;
  content?: ReactElement;
  cta?: ReactElement;
}

export const Sheet = ({ className, handle, content, cta, isOpen, close }: SheetProps) => (
  <>
    {isOpen && <Backdrop close={close} />}
    {isOpen && (
      <div
        className={`fixed tablet:max-w-[375px] m-auto inset-x-0 z-10 bottom-0 bg-white rounded-t-2xl shadow-lg ${className}`}
      >
        {handle && (
          <div className="p-2 flex justify-center items-center">
            <button
              type="button"
              className="w-1/4 h-1.5 rounded-full bg-gray-400"
              onClick={close}
            />
          </div>
        )}
        {content}
        <section className="cta">{cta}</section>
      </div>
    )}
  </>
);
