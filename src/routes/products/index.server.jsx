import { Suspense } from 'react';
import { useShopQuery, gql, Seo } from '@shopify/hydrogen';
import { Layout } from '../../components/Layout.server';



export default function AllProducts() {

    const { data } = useShopQuery({
        query: ALL_PRODUCTS_QUERY,
        preload: true,
    });

    const products = data.products;
    return (
        <Layout>
            <Seo type="page" data={{ title: 'All Products' }} />
            <section>
                <h1>Hejsan</h1>
                <Suspense>
                    <div>
                        {{ products }}
                    </div>
                </Suspense>

            </section>
        </Layout>
    );
}


const ALL_PRODUCTS_QUERY = gql`
  query AllProducts {
    products {
      nodes {
        ...ProductCard
      }
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
