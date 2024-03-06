import { useFunnel } from "./useFunnel";
import { beforeEach, expect, describe, it } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import memoryRouter from "next-router-mock";
import { safeSessionStorage } from "@toss/storage";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  memoryRouter.setCurrentUrl("/");
  cleanup();
  safeSessionStorage.clear();
});

const STEPS = ["name", "age"] as const;
const getRemoteState = () => JSON.parse(safeSessionStorage.get("funnel-state__/") ?? "{}");

describe("useFunnel의 정상 동작", () => {
  it("`.withState()` 를 붙이거나 떼어서 사용할 수 있다", () => {
    function TestPage() {
      const _ = useFunnel(STEPS, { initialStep: "name" });
      const __ = useFunnel(STEPS, {
        initialStep: "age",
      }).withState({
        name: "John",
        age: 20,
      });
      return <main>hello</main>;
    }

    render(<TestPage />);

    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("퍼널의 초기 상태를 설정할 수 있다.", () => {
    function TestPage() {
      const [_, state, __] = useFunnel(STEPS, { initialStep: "name" }).withState({
        age: 20,
      });
      return <main>my age: {state.age}</main>;
    }

    render(<TestPage />);

    expect(screen.getByText("my age: 20")).toBeInTheDocument();
  });

  it("퍼널의 상태를 바꿀 수 있다. 퍼널의 상태는 원격 상태와 동기화된다.", async () => {
    const user = userEvent.setup();
    memoryRouter.setCurrentUrl("/?funnel-step=시작");

    function TestPage() {
      const [Funnel, state, setState] = useFunnel(["시작", "다음"] as const).withState({
        count: 0,
      });
      return (
        <Funnel>
          <Funnel.Step name="시작">
            <시작
              onConfirm={() =>
                setState((prev) => ({ ...prev, count: (prev.count ?? 0) + 1, step: "다음" }))
              }
            />
          </Funnel.Step>
          <Funnel.Step name="다음">
            <다음 requiredProp={state.count ?? 0} />
          </Funnel.Step>
        </Funnel>
      );
    }
    const 시작 = ({ onConfirm }: { onConfirm: () => void }) => (
      <div>
        시작 <button onClick={onConfirm}>확인</button>
      </div>
    );
    const 다음 = ({ requiredProp }: { requiredProp: number }) => (
      <div>
        끝 <span>{requiredProp}</span>
      </div>
    );

    render(<TestPage />);

    expect(getRemoteState()).toEqual({});

    const button = screen.getByRole("button", { name: "확인" });
    await user.click(button);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(getRemoteState()).toEqual({ count: 1, step: "다음" });
  });
});
