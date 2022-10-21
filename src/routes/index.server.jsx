import { Suspense } from 'react';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/Home/Hero.server';
import Bestsellers from '../components/Home/Bestsellers.server';
import PopularCollections from '../components/Home/PopularCollections.server';


export default function Home() {
  return (
    <Layout>
      <Hero />
      <Suspense fallback={`Loading content...`}>
        <Bestsellers />
        <PopularCollections />
      </Suspense>
    </Layout>
  );
}
