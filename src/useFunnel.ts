import { withState as _withState } from "./withState";
import { useCallback } from "react";
import { useRouteFunnel } from "./useRouteFunnel";
import type { ISteps } from "./utils";

export function useFunnel<Steps extends ISteps>(
  ...params: Parameters<typeof useRouteFunnel<Steps>>
) {
  const [Funnel, setStep] = useRouteFunnel<Steps>(...params);
  const withState = useCallback(_withState<Steps>([Funnel, setStep]), [Funnel, setStep]);
  return Object.assign([Funnel, setStep], { withState });
}
