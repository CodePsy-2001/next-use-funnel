"use client";
import { StartStep } from "./StartStep";
import { AvailabilityStep } from "./AvailabilityStep";
import { FormStep } from "./FormStep";
import { EndStep } from "./EndStep";
import useFunnel from "next-use-funnel";
import { sendGAEvent } from "@next/third-parties/google";
import { submit } from "./actions";

export { StartStep, AvailabilityStep };

export type FunnelState = {
  name: string;
  phone: string;
};

export default function ExampleFunnel() {
  const [Funnel, state, setState] = useFunnel(["start", "form", "availability", "end"] as const, {
    initialStep: "start",
    onStepChange: (step) => sendGAEvent({ event: "funnel_step", step }),
  }).withState<FunnelState>({});

  return (
    <Funnel>
      <Funnel.Step name="start">
        <StartStep next={() => setState({ step: "form" })} />
      </Funnel.Step>
      <Funnel.Step name="form">
        <FormStep
          defaultValues={state}
          next={async ({ phone, name }) => {
            if (state.phone !== phone || state.name !== name) await submit({ phone, name });
            return setState((prev) => ({ ...prev, phone, name, step: "availability" }));
          }}
          pass={() => setState((prev) => ({ ...prev, step: "availability" }))}
        />
      </Funnel.Step>
      <Funnel.Step name="availability">
        <AvailabilityStep
          defaultValue={state.phone}
          next={() => setState((prev) => ({ ...prev, step: "end" }))}
        />
      </Funnel.Step>
      <Funnel.Step name="end">
        <EndStep />
      </Funnel.Step>
    </Funnel>
  );
}
