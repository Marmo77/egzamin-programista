import Hero from "./Home/Hero";
import Offer from "./Home/Offer";
import Support from "./Home/Support";
import Faq from "./Home/Faq";
import SEO from "./SEO";

const Home = () => {
  return (
    <>
      <SEO />
      <section className="max-w-6xl gap-8 mx-auto flex flex-col justify-center items-center my-12">
        <Hero />
        <Offer />
        <Support />
        <Faq />
      </section>
    </>
  );
};

export default Home;
