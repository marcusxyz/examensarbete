import { Suspense } from 'react';
import { useRouteParams, useShopQuery, gql, Link } from '@shopify/hydrogen';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/global/Hero.server';
import FeaturedCollections from '../components/global/FeaturedCollections.server';

export default function Home() {
  const { handle } = useRouteParams();

  const {
    data: { products },
  } = useShopQuery({
    query: AllProducts
  });

  return (
    <Layout>
      <Hero />
      <Suspense fallback={`Loading content...`}>
        <FeaturedCollections />

        {[products].map((product) => {
          return (
            <div>
              {product.id}
              <h1>hej</h1>
            </div>
          );
        })}
      </Suspense>
    </Layout>
  );
}


const AllProducts = gql`
  query AllProducts {
    products(first: 12) {
      edges {
        node {
          id
          title
          vendor
          descriptionHtml
        }
      }
    }
  }
`;

