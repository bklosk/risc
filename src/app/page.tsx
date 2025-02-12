import Landing from "./components/landing";
import Work from "./components/work";

export default function Page() {
  // risc paths! storing here for funsies
  /* 
  const paths = [
    "M207,207h76.5v-49.5h-126v126H207V207z",
    "M233.5,368.5H157V419h127v-64h-50.5V368.5z M158,293h125v48.5h-76.5V355H158V293z",
    "M418,234.5V283H293v-48.5h38.2v-28H293V158 h125v48.5h-38.2v28H418z",
    "M292,419h127v-50.5h-76.5v-26H419V292H292V419z",
  ];
  */

  return (
    <main className="">
      <Landing />
      <Work />
    </main>
  );
}
