"use client";
import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import { Legend } from "@/components/form";
import Image, { type ImageProps } from "next/image";
import sushi from "./sushi.png";
import graduationCap from "./graduation-cap.png";
import arm from "./arm.png";
import shoe from "./shoe.png";
import barber from "./barber.png";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export function AvailabilityStep({ next }: { defaultValue?: string; next: () => void }) {
  return (
    <Scaffold
      topBar={<AppAction className="bg-white" backButton={<BackButton />} />}
      content={
        <main className="flex flex-col">
          <section className="p-4">
            <Legend content="사용 가능한 매장을\n알려드려요" />
            <div className="grid grid-cols-2 gap-x-3 gap-y-12">
              <Category src={sushi} className="bg-amber-200" name="맛있는 오마카세 먹고" />
              <Category
                src={graduationCap}
                className="from-slate-200 to-slate-300"
                name="아이 학원비 낼 때"
              />
              <Category src={arm} className="bg-red-200" name="헬스장 등록할 때" />
              <Category src={shoe} className="bg-blue-200" name="명품 쇼핑한 후" />
              <Category src={barber} className="bg-violet-200" name="동네 미용실에서" />
            </div>
          </section>
          <div className="px-4 pt-4">
            <button type="button" className="btn-alt clickarea">
              원하는 매장이 없나요?
            </button>
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

export const Category = ({
  src,
  className,
  name,
}: {
  src: ImageProps["src"];
  className: string;
  name: string;
}) => (
  <div className="flex flex-col gap-4">
    <div
      className={`aspect-square relative flex flex-col items-center justify-center gap-2.5 bg-gradient-to-br ${className} p-6`}
    >
      <Image src={src} width={120} height={120} alt="name" />
    </div>
    <div>
      <p className="text-lg font-bold">{name}</p>
      <Link href="#사장님" className="flex text-blue-500 items-center">
        카드 나눠 결제하기 <ChevronRightIcon className="w-4 h-4" />
      </Link>
    </div>
  </div>
);
