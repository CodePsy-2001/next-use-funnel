"use client";
import { StartStep } from "./StartStep";
import { AvailabilityStep } from "./AvailabilityStep";
import { FormStep } from "./FormStep";
import { EndStep } from "./EndStep";
import useFunnel from "next-use-funnel";

export { StartStep, AvailabilityStep };

type FunnelState = {
  name: string;
  phone: string;
};

export default function ExampleFunnel() {
  const [Funnel, state, setState] = useFunnel(["start", "availability", "form", "end"] as const, {
    initialStep: "start",
  }).withState<FunnelState>({});

  return (
    <Funnel>
      <Funnel.Step name="start">
        <StartStep next={() => setState({ step: "availability" })} />
      </Funnel.Step>
      <Funnel.Step name="availability">
        <AvailabilityStep
          defaultValue={state.phone}
          next={() => setState((prev) => ({ ...prev, step: "form" }))}
        />
      </Funnel.Step>
      <Funnel.Step name="form">
        <FormStep
          defaultValues={state}
          next={({ phone, name }) => setState((prev) => ({ ...prev, phone, name, step: "end" }))}
        />
      </Funnel.Step>
      <Funnel.Step name="end">
        <EndStep />
      </Funnel.Step>
    </Funnel>
  );
}
