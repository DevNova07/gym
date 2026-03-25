import { Hero } from '@/components/hero/Hero';
import { Features } from '@/components/features/Features';
import { Programs } from '@/components/programs/Programs';
import { Trainers } from '@/components/trainers/Trainers';
import { Pricing } from '@/components/pricing/Pricing';
import { Testimonials } from '@/components/testimonials/Testimonials';
import { Footer } from '@/components/footer/Footer';
import { GoalVisualizer } from '@/components/visualizer/GoalVisualizer';
import { VideoParallax } from '@/components/parallax/VideoParallax';
import { BeforeAfterSlider } from '@/components/interactive/BeforeAfterSlider';
import { ClassSchedule } from '@/components/schedule/ClassSchedule';
import { MerchandiseStore } from '@/components/store/MerchandiseStore';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Hero />
      <Features />
      <VideoParallax />
      <Programs />
      <GoalVisualizer />
      <BeforeAfterSlider />
      <ClassSchedule />
      <Trainers />
      <MerchandiseStore />
      <Pricing />
      <Testimonials />
      <Footer />
    </main>
  );
}
