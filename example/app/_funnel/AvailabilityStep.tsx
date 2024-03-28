"use client";
import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import { Legend } from "@/components/form";
import Image, { type ImageProps } from "next/image";
import sushi from "./_resources/sushi.png";
import graduationCap from "./_resources/graduation-cap.png";
import arm from "./_resources/arm.png";
import shoe from "./_resources/shoe.png";
import barber from "./_resources/barber.png";
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
        content={<사장님안내 />}
        cta={
          <button type="button" onClick={ov.close} className="btn-cta">
            공유하기
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
            <Legend content="사용 가능한 매장을\n알려드려요" />
            <div className="grid grid-cols-2 gap-x-3 gap-y-12">
              <Category
                src={sushi}
                onClick={openSelfEmployedSheet}
                className="bg-amber-200"
                name="맛있는 오마카세 먹고"
              />
              <Category
                src={graduationCap}
                onClick={openSelfEmployedSheet}
                className="from-slate-200 to-slate-300"
                name="아이 학원비 낼 때"
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
                name="명품 쇼핑한 후"
              />
              <Category
                src={barber}
                onClick={openSelfEmployedSheet}
                className="bg-violet-200"
                name="동네 미용실에서"
              />
            </div>
          </section>
          <div className="px-4 pt-4">
            <button type="button" onClick={openSelfEmployedSheet} className="btn-alt clickarea">
              원하는 매장이 없나요?
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
        카드 나눠 결제하기 <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export const 사장님안내 = () => (
  <div className="p-4">
    <div className="flex justify-between">
      <Legend content="사장님께 알려주세요" />
      <div>X</div>
    </div>
    <div>스마트폰, 공동인증서만 있으면 사장님도 가입 후 바로 결제할 수 있어요</div>
  </div>
);
