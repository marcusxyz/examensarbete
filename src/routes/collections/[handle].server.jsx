import {
  gql,
  useShopQuery,
  useRouteParams,
  Seo,
  useServerAnalytics,
  ShopifyAnalyticsConstants,
} from '@shopify/hydrogen';

import { Layout } from '../../components/Layout.server';

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

  return (
    <Layout>
      <section className='p-[10px] md:p-6'>
        This will be the collection page for <strong>{collection.title}</strong>
      </section>
    </Layout>
  );
}

// A Graphql query that retrieves a collection by its handle.
const QUERY = gql`
  query CollectionDetails($handle: String!) {
    collection(handle: $handle) {
      title
    }
  }
`;
