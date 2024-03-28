"use server";
import type { FormValues } from "@/app/_funnel/FormStep";
import { sql } from "@vercel/postgres";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { cookies } from "next/headers";

export const submit = async (state: FormValues) => {
  const sid = cookies().get("sid");

  if (!sid) throw new Error("Session ID not found");

  await sql`
    INSERT INTO contacts (sid, name, phone)
    VALUES (${sid.value}, ${state.name}, ${formatPhoneNumber(state.phone)})
    ON CONFLICT (sid)
    DO UPDATE SET name = ${state.name}, phone = ${formatPhoneNumber(state.phone)}
  `;
};
