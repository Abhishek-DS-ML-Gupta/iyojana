import { createFileRoute } from "@tanstack/react-router";
import { CalculatorPage } from "@/components/site/calculator-page";

export const Route = createFileRoute("/calculator")({
  component: CalculatorPage,
  head: () => ({
    meta: [
      { title: "Financial Calculators — i-Yojana" },
      { name: "description", content: "SIP, Lumpsum, SWP, and Goal calculators to plan your financial future with i-Yojana." },
    ],
  }),
});
