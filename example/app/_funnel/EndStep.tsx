import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import moneyWithWings from "./_resources/money-with-wings.png";
import Image from "next/image";

export function EndStep() {
  const share = () =>
    window.navigator.share({
      url: window.location.pathname + "?utm_source=share",
      title: "분할결제 서비스 론칭",
      text: "부족한 카드실적 과소비없이 나누어 결제해요",
    });

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
          <button type="button" onClick={share} className="btn-cta clickarea">
            공유하기
          </button>
        </section>
      }
    />
  );
}
