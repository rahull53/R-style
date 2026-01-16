import Navigation from "@/components/Navigation";
import HeroBento from "@/components/HeroBento";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#000000' }}>
      <Navigation />

      <HeroBento />

      <FeaturedProducts />

      <Footer />
    </main>
  );
}
