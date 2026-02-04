import { Layout } from "../../components/layout/public/Layout";
import { HeroSection } from "../../components/home/HeroSection";
import { ServicesPreview } from "../../components/home/ServicesPreview";
import { CTASection } from "../../components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <CTASection />
    </Layout>
  );
};

export default Index;
