"use client";
import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import { Legend } from "@/components/form";
import Image, { type ImageProps } from "next/image";
import sushi from "./_resources/sushi.png";
import graduationCap from "./_resources/graduation-cap.png";
import arm from "./_resources/arm.png";
import shoe from "./_resources/shoe.png";
import scissors from "./_resources/scissors.png";
import balanceScale from "./_resources/balance-scale.png";
import bakerWoman from "./_resources/baker-woman.png";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { sendGAEvent } from "@next/third-parties/google";
import { useOverlay } from "@toss/use-overlay";
import { Sheet } from "@/components/with-overlay";

export function AvailabilityStep({ next }: { defaultValue?: string; next: () => void }) {
  const overlay = useOverlay();

  const openSelfEmployedSheet = () => {
    sendGAEvent({ event: "funnel_step", step: "self_employed" });
    overlay.open((ov) => (
      <Sheet
        {...ov}
        handle
        content={
          <div className="p-4 flex flex-col">
            <Legend content="모든 매장에서\n사용할 수 있어요" />
            <div className="mb-4">
              <strong>스마트폰, 공동인증서</strong>만 있으면
              <br />
              사장님도 가입 후 바로 결제할 수 있어요
            </div>
            <div className="flex items-center justify-center">
              <Image src={bakerWoman} width={256} height={256} alt="bakerWomen" />
            </div>
          </div>
        }
        cta={
          <button
            type="button"
            onClick={() =>
              window.navigator.share({
                title: "카드 나눠 결제하기",
                text: "카드 나눠 결제하기. 분할결제로 과소비 없이 실적 채워요. 앱 설치만 하면 사장님, 손님 모두 바로 결제 가능해요.",
                url: window.location.pathname,
              })
            }
            className="btn-cta"
          >
            사장님한테 공유하기
          </button>
        }
      />
    ));
  };

  return (
    <Scaffold
      topBar={<AppAction className="bg-white" backButton={<BackButton />} />}
      content={
        <main className="flex flex-col">
          <section className="p-4">
            <Legend title content="분할 결제가\n필요한 순간" />
            <div className="grid grid-cols-2 gap-x-3 gap-y-12">
              <Category
                src={sushi}
                onClick={openSelfEmployedSheet}
                className="bg-amber-200"
                name="오마카세 먹고"
              />
              <Category
                src={graduationCap}
                onClick={openSelfEmployedSheet}
                className="from-slate-200 to-slate-300"
                name="학원비 낼 때"
              />
              <Category
                src={arm}
                onClick={openSelfEmployedSheet}
                className="bg-red-200"
                name="헬스장 등록할 때"
              />
              <Category
                src={shoe}
                onClick={openSelfEmployedSheet}
                className="bg-blue-200"
                name="명품 쇼핑하고"
              />
              <Category
                src={scissors}
                onClick={openSelfEmployedSheet}
                className="bg-violet-200"
                name="단골 헤어숍에서"
              />
              <Category
                src={balanceScale}
                onClick={openSelfEmployedSheet}
                className="bg-yellow-200"
                name="변호사 수임료 낼 때"
              />
            </div>
          </section>
          <div className="px-4 pt-4 mt-8">
            <button type="button" onClick={openSelfEmployedSheet} className="btn-alt clickarea">
              어떤 매장에서 가능한가요?
            </button>
          </div>
        </main>
      }
      bottomBar={
        <section id="cta">
          <button type="button" onClick={next} className="btn-cta clickarea">
            확인
          </button>
        </section>
      }
    />
  );
}

export const Category = ({
  src,
  className,
  name,
  onClick,
}: {
  src: ImageProps["src"];
  className: string;
  name: string;
  onClick?: () => void;
}) => (
  <div className="flex flex-col gap-4">
    <div
      className={`aspect-square relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br ${className} p-6`}
    >
      <Image src={src} width={120} height={120} alt="name" />
    </div>
    <div>
      <p className="text-lg font-bold">{name}</p>
      <button type="button" onClick={onClick} className="flex text-blue-500 items-center">
        선택 <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
);
