import { Suspense } from 'react';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/global/Hero.server';
import FeaturedCollections from '../components/global/FeaturedCollections.server';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={`Loading categories...`}>
        <FeaturedCollections />
      </Suspense>
    </Layout>
  );
}
