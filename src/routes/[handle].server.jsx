import { Suspense } from 'react';
import {
  gql,
  useShopQuery,
  useRouteParams,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';

// Import components
import { Layout } from '../components/Layout.server';
import ProductCard from '../components/Product/ProductCard.server';

// Product list page i.e '/textures'
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
        <h1 className='text-7xl whitespace-pre-wrap font-bold inline-block px-[10px] md:px-6'>
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

      <section className='w-full grid pb-24'>
        <div className='grid-flex-row grid grid-cols-2 divide-x divide-black md:grid-cols-3 lg:grid-cols-4'>
          {collection.products.nodes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </Layout>
  );
}

// Add a Graphql query that retrieves a collection by its handle.
const QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      title
      handle
      description
      seo {
        title
        description
      }
      products(first: 12) {
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
