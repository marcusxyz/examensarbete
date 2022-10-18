import {
  gql,
  useShopQuery,
  useRouteParams,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';

import { Suspense } from 'react';
import { Layout } from '../../components/Layout.server';
import ProductCard from '../../components/ProductCard.server';

export default function Collection() {
  const { handle } = useRouteParams();

  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    variables: {
      handle,
    },
  });

  useServerAnalytics({
    shopify: {
      pageType: ShopifyAnalyticsConstants.pageType.collection,
      resourceId: collection.id,
    },
  });

  return (
    <Layout>
      <Suspense>
        <Seo type='collection' data={collection} />
      </Suspense>
      <header className='grid w-full gap-8 py-8 border-b border-black  lg:justify-items-start'>
        <h1 className='text-4xl whitespace-pre-wrap font-bold inline-block px-[10px] md:px-6'>
          {collection.title}
        </h1>
        {collection.description && (
          <div className='flex items-baseline justify-between w-full'>
            <div className=''>
              <p className='max-w-lg whitespace-pre-wrap inherit text-copy inline-block px-[10px] md:px-6'>
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>

      <section className='w-full grid'>
        <div className='grid-flex-row grid grid-cols-2 divide-x divide-black md:grid-cols-3 lg:grid-cols-4'>
          {collection.products.nodes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

// A Graphql query that retrieves a collection by its handle.

// The `Seo` component uses the collection's `seo` values, if specified. If not
// specified, then the component falls back to using the collection's `title` and `description`
const QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      id
      title
      description
      seo {
        title
        description
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(first: 13) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                url
                width
                height
                altText
              }
              priceV2 {
                amount
                currencyCode
              }
              compareAtPriceV2 {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
`;
