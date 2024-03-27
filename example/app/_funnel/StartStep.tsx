"use client";
import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import { Legend, Info } from "@/components/form";
import Image from "next/image";
import CardGrabHand from "./_resources/card-grab-hand.png";

export function StartStep({ next }: { next: () => void }) {
  return (
    <Scaffold
      topBar={<AppAction backButton={<BackButton />} />}
      content={
        <main className="p-5 flex flex-col">
          <Legend
            title
            icon={<Image width={80} height={80} className="" src={CardGrabHand} alt="image" />}
            content="분할 결제"
            description="이제 간편결제도 여러 카드로 나누어 결제해요."
          />
          <div className="flex flex-col gap-10">
            <Info icon="🍽" description="어느 곳이든 사용할 수 있어요" />
            <Info icon="💳" description="어떤 카드든 사용할 수 있어요" />
            <Info icon="📱" description="기종 상관없이 QR로 결제해요" />
          </div>
        </main>
      }
      bottomBar={
        <section id="cta">
          <button type="button" onClick={next} className="btn-cta clickarea">
            다음
          </button>
        </section>
      }
    />
  );
}
