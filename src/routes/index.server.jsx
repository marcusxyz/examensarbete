import { Suspense } from 'react';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/Home/Hero.server';
import Bestsellers from '../components/Home/Bestsellers.server';
import Collection from '../components/Home/Collections.server';

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={`Loading content...`}>
        <Bestsellers />
        <Collection />
      </Suspense>
    </Layout>
  );
}
