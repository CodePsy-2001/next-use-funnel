import { assert } from "@toss/assert";
import type { ReactElement, ReactNode } from "react";
import { isValidElement, useEffect } from "react";
import { type ISteps, toArray } from "./utils";
import React from "react";

export interface FunnelProps<Steps extends ISteps> {
  steps: Steps;
  step: Steps[number];
  children: ReactElement<StepProps<Steps>>[] | ReactElement<StepProps<Steps>>;
}

export interface StepProps<Steps extends ISteps> {
  name: Steps[number];
  onEnter?: () => void;
  children: ReactNode;
}

export const Funnel = <Steps extends ISteps>({ steps, step, children }: FunnelProps<Steps>) => {
  const validChildren = toArray(children)
    .filter(isValidElement<StepProps<Steps>>)
    .filter((i) => steps.includes(i.props.name ?? ""));

  const targetStep = validChildren.find((child) => child.props.name === step);

  assert(targetStep, `${step} 스텝 컴포넌트를 찾지 못했습니다.`);

  return targetStep;
};

export const Step = <Steps extends ISteps>({
  onEnter,
  children,
}: StepProps<Steps>): ReactElement => {
  useEffect(() => onEnter?.(), [onEnter]);
  return <>{children}</>;
};
