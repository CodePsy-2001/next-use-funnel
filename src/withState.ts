"use client";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { safeSessionStorage } from "@toss/storage";
import useSWR, { Key } from "swr";
import type { RouteFunnel, RouteFunnelStep, useRouteFunnel } from "./useRouteFunnel";
import type { Action, IState, ISteps } from "./utils";

type FunnelState<State extends IState, Steps extends ISteps> = Partial<State> & {
  step: Steps[number];
};

export const withState =
  <Steps extends ISteps>([Funnel, setStep]: ReturnType<typeof useRouteFunnel<Steps>>) =>
  <State extends IState>(_defaultValue: Partial<State>) => {
    type FState = FunnelState<State, Steps>;
    const defaultValue = _defaultValue as FState;

    const storage = useSessionStorage<FState>();
    const { data: _state = defaultValue, mutate } = useSWR(storage.key, storage.get);

    const state = !_state || !_state?.step ? defaultValue : _state;

    // 항상 storage.set -> mutate -> setStep 순서로 호출해야 함
    const setState = useCallback((action: Action<FState>) => {
      const nextState = typeof action === "function" ? action(state) : action;
      storage
        .set(nextState)
        .then(() => mutate(nextState, false))
        .then(() => setStep(nextState.step));
    }, []);
    const clear = useCallback(() => {
      storage.set({} as FState).then(() => mutate({} as FState, false));
    }, []);

    return [Funnel, state, setState, clear] as const as [
      RouteFunnel<Steps> & { Step: RouteFunnelStep<Steps> },
      FState,
      (action: Action<FState>) => void,
      () => void,
    ];
  };

interface Storage<T> {
  key: Key;
  get: () => Promise<T>;
  set: (value: T) => Promise<void>;
}

const useSessionStorage = <T>(): Storage<T> => {
  const pathname = usePathname();
  const key = `funnel-state__${pathname}`;
  return {
    key,
    get: async () => {
      const value = safeSessionStorage.get(key);
      return value ? (JSON.parse(value) as T) : ({} as T);
    },
    set: async (value) => safeSessionStorage.set(key, JSON.stringify(value)),
  };
};
