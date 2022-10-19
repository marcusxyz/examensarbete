import {
    useLocalization,
    useShopQuery,
    Seo,
    useServerAnalytics,
    ShopifyAnalyticsConstants,
    gql,
} from '@shopify/hydrogen';
import { Suspense } from 'react';


export default function Page({ params }) {

    const { handle } = params;
    const {
        data: { page },
    } = useShopQuery({
        query: PAGE_QUERY,
        variables: { handle },
    });


    useServerAnalytics({
        shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.page,
            resourceId: page.id,
        },
    });

    return (
        <Layout>
            <Suspense>
                <Seo type="page" data={page} />
            </Suspense>
            <h1>{page.title}</h1>
        </Layout>
    );
}

const PAGE_QUERY = gql`
    query PageDetails($handle: String!)
    {
      page(handle: $handle) {
        id
        title
        body
        seo {
          description
          title
        }
    }
  `;
