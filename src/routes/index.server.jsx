import { Suspense } from 'react';
import { useShopQuery, CacheLong, gql, Seo } from '@shopify/hydrogen';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/Home/Hero.server';
import Bestsellers from '../components/Home/Bestsellers.server';
import PopularCollections from '../components/Home/PopularCollections.server';
import ExploreSection from '../components/Home/ExploreSection.server';

export default function Home() {
  const {
    data: { seo },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });
  return (
    <Layout>
      <Suspense>
        <Seo type='homepage' data={seo} />
      </Suspense>
      <Hero />
      <Suspense fallback={`Loading content...`}>
        <Bestsellers />
        <PopularCollections />
        <ExploreSection />
      </Suspense>
    </Layout>
  );
}

const SEO_QUERY = gql`
  query seo {
    shop {
      name
      description
    }
  }
`;
