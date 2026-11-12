import type { Metadata } from "next";
import { FunctionPageView } from "@/components/site/v4/function-page";
import { getFunctionPage } from "@/lib/functions";

const page = getFunctionPage("procurement")!;

export const metadata: Metadata = page.metadata;

export default function Page() {
  return <FunctionPageView page={page} />;
}
