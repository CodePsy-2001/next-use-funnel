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
            icon={
              <Image
                unoptimized
                className="rounded-xl"
                width={120}
                height={120}
                src={CardGrabHand}
                alt="image"
              />
            }
            content="카드 나눠 결제하기"
            description="분할결제로 과소비 없이 실적 채워요"
          />
          <div className="flex flex-col gap-10">
            <Info icon="🍽" description="어느 곳이든 할 수 있어요" />
            <Info icon="💳" description="모든 카드로 할 수 있어요" />
            <Info icon="📱" description="기종 상관없이 QR로 결제해요" />
          </div>
        </main>
      }
      bottomBar={
        <section id="cta">
          <button type="button" onClick={next} className="btn-cta clickarea">
            분할결제 신청하기
          </button>
        </section>
      }
    />
  );
}
