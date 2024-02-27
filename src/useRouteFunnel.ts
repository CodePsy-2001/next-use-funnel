import { assert } from "@toss/assert";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, useMemo } from "react";
import {
  Funnel as _Funnel,
  FunnelProps as _FunnelProps,
  Step as _Step,
  StepProps as _StepProps,
} from "./Funnel";
import type { ISteps } from "./utils";

export type RouteFunnel<Steps extends ISteps> = (
  props: Omit<_FunnelProps<Steps>, "steps" | "step">,
) => ReactElement;
export type RouteFunnelStep<Steps extends ISteps> = (props: _StepProps<Steps>) => ReactElement;

export interface RouteFunnelOptions<Steps extends ISteps> {
  initialStep?: Steps[number];
}

export const DEFAULT_STEP_KEY = "funnel-step";

export const useRouteFunnel = <Steps extends ISteps>(
  steps: Steps,
  options: RouteFunnelOptions<Steps> = {},
) => {
  const { initialStep } = options;
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = searchParams.get(DEFAULT_STEP_KEY) ?? initialStep;
  assert(step, `현재 step을 찾을 수 없습니다. URL에 step을 적거나, initialStep을 지정해주세요.`);

  const setStep = (step: Steps[number]) => {
    const sp = new URLSearchParams(searchParams);
    sp.set(DEFAULT_STEP_KEY, step);
    router.push(`?${sp}`);
  };

  const Funnel = useMemo(() => {
    const FunnelComponent: RouteFunnel<Steps> = (props) => _Funnel({ steps, step, ...props });
    const StepComponent: RouteFunnelStep<Steps> = _Step<Steps>;
    return Object.assign(FunnelComponent, { Step: StepComponent });
  }, [steps, step]);

  return [Funnel, setStep] as const as [
    RouteFunnel<Steps> & { Step: RouteFunnelStep<Steps> },
    (step: Steps[number]) => void,
  ];
};
