import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import { Legend } from "@/components/form";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { SubmitHandler, useForm } from "react-hook-form";

export interface FormValues {
  phone: string;
  name: string;
  sajangnim: boolean;
}

export function FormStep({
  defaultValues = {},
  next,
  pass,
}: {
  defaultValues?: Partial<FormValues>;
  next: (values: FormValues) => void;
  pass: () => void;
}) {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    defaultValues,
  });
  const { isSubmitting, isValidating, isValid } = formState;

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    next(values);
  };

  return (
    <Scaffold
      topBar={<AppAction backButton={<BackButton />} />}
      content={
        <main className="p-4">
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <Legend
              content="이름과 전화번호를\n알려주세요"
              description="서비스가 출시되면 알림을 보내드릴게요"
            />
            <fieldset className="flex flex-col gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">이름</span>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  defaultValue={defaultValues.name}
                  placeholder="이름"
                  className="bg-gray-100 focus:bg-[#E4ECF9] outline-none border border-gray-200 rounded-xl p-3"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">휴대폰 번호</span>
                <input
                  type="tel"
                  {...register("phone", {
                    required: true,
                    pattern: /^((\+?82)[ -]?)?0?1([0|1|6|7|8|9]{1})[ -]?\d{3,4}[ -]?\d{4}$/,
                  })}
                  defaultValue={defaultValues.phone}
                  placeholder="휴대폰 번호"
                  className="bg-gray-100 focus:bg-[#E4ECF9] outline-none border border-gray-200 rounded-xl p-3"
                />
              </label>
              <label className="ml-auto flex gap-2">
                <span className="text-sm text-gray-700">사장님 회원이에요</span>
                <input
                  type="checkbox"
                  {...register("sajangnim")}
                  defaultChecked={defaultValues.sajangnim}
                  className="w-5 h-5 rounded bg-gray-100 border border-gray-200"
                />
              </label>
            </fieldset>
          </form>
        </main>
      }
      bottomBar={
        <section
          // role="group"
          // aria-disabled={!isValid || isSubmitting || isValidating}
          id="cta"
          className="aria-disabled:hidden"
        >
          <button type="button" onClick={pass} className="block addition">
            알림을 받고 싶지 않아요 <ChevronRightIcon width={16} height={16} />
          </button>
          <button
            aria-busy={isSubmitting || isValidating}
            disabled={!isValid || isSubmitting || isValidating}
            type="submit"
            form="form"
            className="btn-cta clickarea"
          >
            완료
          </button>
        </section>
      }
    />
  );
}
