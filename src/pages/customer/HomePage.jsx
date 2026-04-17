import Navbar from "../../components/common/Navbar";
import HeroSection from "../../components/customer/HeroSection";
import CategoriesSection from "../../components/customer/CategoriesSection";
import NearbyStores from "../../components/customer/NearbyStores";
import FeaturedProducts from "../../components/customer/FeaturedProducts";
import Footer from "../../components/common/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <NearbyStores />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}