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
  stepQueryKey?: string;
  onStepChange?: (step: Steps[number]) => void;
}

interface SetStepOptions {
  stepChangeType?: "push" | "replace";
  preserveQuery?: boolean;
  query?: Record<string, string | string[]>;
}

export const DEFAULT_STEP_KEY = "funnel-step";

export const useRouteFunnel = <Steps extends ISteps>(
  steps: Steps,
  options: RouteFunnelOptions<Steps> = {},
) => {
  const { initialStep, stepQueryKey = DEFAULT_STEP_KEY, onStepChange } = options;
  const router = useRouter();
  const searchParams = useSearchParams();

  const step = searchParams.get(DEFAULT_STEP_KEY) ?? initialStep;
  assert(step, `현재 step을 찾을 수 없습니다. URL에 step을 적거나, initialStep을 지정해주세요.`);

  const setStep = (step: Steps[number], options: SetStepOptions = {}) => {
    const { stepChangeType = "push", preserveQuery = true, query = {} } = options;
    const sp = preserveQuery ? new URLSearchParams(searchParams) : new URLSearchParams();
    sp.set(stepQueryKey, step);
    Object.entries(query ?? {}).forEach(([key, value]) => {
      if (Array.isArray(value)) value.forEach((v) => sp.append(key, v));
      else sp.set(key, value);
    });
    onStepChange?.(step);
    return stepChangeType === "push" ? router.push(`?${sp}`) : router.replace(`?${sp}`);
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
