import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import moneyWithWings from "./_resources/money-with-wings.png";
import Image from "next/image";
import { share } from "@/utils/share";

export function EndStep() {
  return (
    <Scaffold
      topBar={<AppAction backButton={<BackButton />} />}
      content={
        <main className="p-4 flex flex-col">
          <div className="flex items-center grow justify-center">
            <div className="flex flex-col gap-4 items-center">
              <Image src={moneyWithWings} alt="smile" width={120} height={120} />
              <h1 className="text-2xl font-bold text-center">
                분할결제 소식을
                <br />
                공유해주세요!
              </h1>
            </div>
          </div>
        </main>
      }
      bottomBar={
        <section id="cta">
          <button
            type="button"
            onClick={() =>
              share({
                title: "카드 나눠 결제하기",
                text: "분할결제로 과소비 없이 실적 채워요. 앱 설치만 하면 사장님, 손님 모두 바로 결제 가능해요.",
                url: (() => {
                  const url = new URL(window.location.href);
                  url.search = "?utm_source=share";
                  return url;
                })(),
              })
            }
            className="btn-cta clickarea"
          >
            공유하기
          </button>
        </section>
      }
    />
  );
}
