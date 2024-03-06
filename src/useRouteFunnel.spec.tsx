import { useRouteFunnel } from "./useRouteFunnel";
import { beforeEach, expect, describe, it, vi } from "vitest";
import { render, screen, cleanup, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import memoryRouter from "next-router-mock";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  memoryRouter.setCurrentUrl("/");
  cleanup();
});

const STEPS = ["A", "B"] as const;

describe("useRouteFunnel의 정상 동작", () => {
  it("현재 funnel-step만 렌더한다", () => {
    function TestPage() {
      const [Funnel] = useRouteFunnel(STEPS);
      return (
        <Funnel>
          <Funnel.Step name="A">
            <h1>A</h1>
          </Funnel.Step>
          <Funnel.Step name="B">
            <h1>B</h1>
          </Funnel.Step>
        </Funnel>
      );
    }

    memoryRouter.setCurrentUrl("/?funnel-step=B");
    render(<TestPage />);

    expect(memoryRouter.query["funnel-step"]).toBe("B");
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("URL에서 현재 스텝을 찾을 수 없으면, 대신 `initialStep`을 렌더한다", () => {
    function TestPage() {
      const [Funnel] = useRouteFunnel(STEPS, { initialStep: "B" });
      return (
        <Funnel>
          <Funnel.Step name="A">
            <h1>A</h1>
          </Funnel.Step>
          <Funnel.Step name="B">
            <h1>B</h1>
          </Funnel.Step>
        </Funnel>
      );
    }

    render(<TestPage />);

    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("`setStep`을 통해 사용자의 이벤트로 스텝을 옮길 수 있다", async () => {
    const user = userEvent.setup();

    function TestPage() {
      const [Funnel, setStep] = useRouteFunnel(STEPS, { initialStep: "A" });
      return (
        <Funnel>
          <Funnel.Step name="A">
            <h1>A</h1>
            <button onClick={() => setStep("B")}>next</button>
          </Funnel.Step>
          <Funnel.Step name="B">
            <h1>B</h1>
          </Funnel.Step>
        </Funnel>
      );
    }

    render(<TestPage />);

    const button = screen.getByRole("button", { name: "next" });
    await user.click(button);

    expect(memoryRouter.query["funnel-step"]).toBe("B");
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("`onStepChange` 콜백을 통해 스텝 변경 시 동작을 수행할 수 있다", async () => {
    const user = userEvent.setup();
    const onStepChange = vi.fn((step: (typeof STEPS)[number]) => step);

    function TestPage() {
      const [Funnel, setStep] = useRouteFunnel(STEPS, { initialStep: "A", onStepChange });
      return (
        <Funnel>
          <Funnel.Step name="A">
            <h1>A</h1>
            <button onClick={() => setStep("B")}>next</button>
          </Funnel.Step>
          <Funnel.Step name="B">
            <h1>B</h1>
          </Funnel.Step>
        </Funnel>
      );
    }

    render(<TestPage />);

    const button = screen.getByRole("button", { name: "next" });
    await user.click(button);

    await waitFor(() => expect(onStepChange).toHaveBeenCalledWith("B"));
  });

  it("`onEnter` 콜백을 통해 스텝 진입 시 동작을 수행할 수 있다", async () => {
    const user = userEvent.setup();
    const onEnter = vi.fn();

    function TestPage() {
      const [Funnel, setStep] = useRouteFunnel(STEPS, { initialStep: "A" });
      return (
        <Funnel>
          <Funnel.Step name="A">
            <h1>A</h1>
            <button onClick={() => setStep("B")}>next</button>
          </Funnel.Step>
          <Funnel.Step name="B" onEnter={onEnter}>
            <h1>B</h1>
          </Funnel.Step>
        </Funnel>
      );
    }

    render(<TestPage />);

    const button = screen.getByRole("button", { name: "next" });
    await user.click(button);

    await waitFor(() => expect(onEnter).toHaveBeenCalled());
  });
});
