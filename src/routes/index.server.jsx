import { Suspense } from 'react';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/Home/Hero.server';
import FeaturedCollections from '../components/Home/FeaturedCollections.server';

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
