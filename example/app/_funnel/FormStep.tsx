import { Scaffold } from "@/components/Scaffold";
import { AppAction, BackButton } from "@/components/AppAction";
import { Legend } from "@/components/form";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import { SubmitHandler, useForm } from "react-hook-form";

export interface FormState {
  phone: string;
  name: string;
}

export function FormStep({
  defaultValues = {},
  next,
}: {
  defaultValues?: Partial<FormState>;
  next: (values: FormState) => void;
}) {
  const { register, handleSubmit, formState } = useForm<FormState>({
    defaultValues,
  });
  const { isSubmitting, isValidating, isValid } = formState;

  const onSubmit: SubmitHandler<FormState> = (values) => {
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
              description="앱이 출시되면 알림을 보내드릴게요"
            />
            <fieldset className="flex flex-col gap-6">
              <label className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">이름</span>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  defaultValue={defaultValues.name}
                  placeholder="이름"
                  className="bg-gray-100 focus:bg-[#E4ECF9] outline-none text-gray-900 border border-gray-200 rounded-xl p-3"
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
                  className="bg-gray-100 focus:bg-[#E4ECF9] outline-none text-gray-900 border border-gray-200 rounded-xl p-3"
                />
              </label>
            </fieldset>
          </form>
        </main>
      }
      bottomBar={
        <section id="cta">
          <p className="addition">
            알림을 받고 싶지 않아요 <ChevronRightIcon width={16} height={16} />
          </p>
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
