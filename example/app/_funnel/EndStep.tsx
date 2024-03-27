import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import smile from "./_resources/smile.png";
import Image from "next/image";

export function EndStep() {
  return (
    <Scaffold
      topBar={<AppAction backButton={<BackButton />} />}
      content={
        <main className="p-4 flex flex-col">
          <div className="flex items-center grow justify-center">
            <div className="flex flex-col gap-4 items-center">
              <Image src={smile} alt="smile" width={120} height={120} />
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
          <div className="grid grid-cols-2 gap-2.5">
            <button type="button" className="btn-alt clickarea">
              닫기
            </button>
            <button type="button" className="btn-cta clickarea">
              공유하기
            </button>
          </div>
        </section>
      }
    />
  );
}
