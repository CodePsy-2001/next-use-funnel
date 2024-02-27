import { withState as _withState } from "./withState";
import { useCallback } from "react";
import { type RouteFunnelOptions, useRouteFunnel } from "./useRouteFunnel";
import type { ISteps } from "./utils";

export function useFunnel<Steps extends ISteps>(
  steps: Steps,
  options: RouteFunnelOptions<Steps> = {},
) {
  const [Funnel, setStep] = useRouteFunnel<Steps>(steps, options);
  const withState = useCallback(_withState<Steps>([Funnel, setStep]), [Funnel, setStep]);
  return Object.assign([Funnel, setStep], { withState });
}
