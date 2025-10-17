import Landing from "./components/landing";
import Work from "./components/work";
import Team from "./components/team/team";
import Footer from "./components/footer";
import Contact from "./components/contact";
import { GoogleAnalytics } from "@next/third-parties/google";

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
    <main>
      <Landing />
      <Work />
      <Team />
      <div className="container mx-auto py-12 px-4 snap-section">
        <Contact
          // Optional: provide a custom image
          imageSrc="/images/risc_desk.jpeg"
        />
      </div>
      <Footer />
      <GoogleAnalytics gaId="G-2ETDS1RGWV" />
    </main>
  );
}
