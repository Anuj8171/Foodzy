import Image from "next/image";
import Static from "./component/Static";
import Banner from "./component/Banner";
import PopularProducts from "./sections/PopularProducts";
import DailyBestSells from "./sections/DailyBestSells";
import DealsOfTheDay from "./sections/DealsOfTheDay";
import Static2 from "./component/Static2";
import IconCard from "./component/IconCard";
import Footer from "./component/Footer";
export default function Home() {
  return (
    <>
      <Static/>
      <Banner/>
      <PopularProducts/>
      <DailyBestSells/>
      <DealsOfTheDay/>
      <Static2/>
      <IconCard/>
      <Footer/>
    </>
  );
}

