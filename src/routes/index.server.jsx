import { Suspense } from 'react';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/global/Hero.server';
import Bestsellers from '../components/global/Bestsellers.server';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={`Loading content...`}>
        <Bestsellers />
      </Suspense>
    </Layout>
  );
}
