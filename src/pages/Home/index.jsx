// ============================================================
// Home Page — DevOpsX Learning Platform (Reference Design)
// ============================================================

import Hero from '../../components/sections/Hero';
import {
  TrustedBy,
  ExploreCategories,
  FeaturedBooksAndCourses,
  SubscriptionBanner,
  Testimonials,
  FAQ,
  Newsletter,
} from '../../components/sections/HomeSections';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <ExploreCategories />
      <FeaturedBooksAndCourses />
      <SubscriptionBanner />
      <Testimonials />
      <FAQ />
      <Newsletter />
    </main>
  );
}
