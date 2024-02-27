import { useRouteFunnel } from "./useRouteFunnel";
import { beforeEach, expect, describe, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
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

  it("`setStep`을 통해 사용자의 이벤트로 스텝을 옮길 수 있다", async () => {
    const user = userEvent.setup();

    function TestPage() {
      const [Funnel, setStep] = useRouteFunnel(STEPS);
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

    memoryRouter.setCurrentUrl("/?funnel-step=A");
    render(<TestPage />);

    const button = screen.getByRole("button", { name: "next" });
    await user.click(button);

    expect(memoryRouter.query["funnel-step"]).toBe("B");
    expect(screen.getByText("B")).toBeInTheDocument();
  });

  it("URL에서 초기 스텝을 찾을 수 없으면, 대신 `initialStep`을 사용한다", () => {
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

    memoryRouter.setCurrentUrl("/");
    render(<TestPage />);

    expect(screen.getByText("B")).toBeInTheDocument();
  });
});
