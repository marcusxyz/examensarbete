import {
    gql,
    useShopQuery,
    useServerAnalytics,
    useRouteParams,
    ShopifyAnalyticsConstants,
    Seo,
} from "@shopify/hydrogen";
import { Suspense } from "react";

import { Layout } from "../../components/Layout.server";
import ProductDetails from "../../components/ProductDetails.client";

export default function Product({ params }) {
    const { handle } = useRouteParams();

    const {
        data: { product },
    } = useShopQuery({
        query: PRODUCT_QUERY,
        variables: {
            handle,
        },
    });

    useServerAnalytics({
        shopify: {
            pageType: ShopifyAnalyticsConstants.pageType.product,
            resourceId: product.id,
        },
    });

    return (
        <Layout>
            <Suspense>
                <Seo type="product" data={product} />
            </Suspense>
            <ProductDetails product={product} />
        </Layout>
    );
}

// Retrieve product media in preparation for the next step in the tutorial:
// Step 4: Add a product gallery
const PRODUCT_QUERY = gql`
    fragment MediaFields on Media {
      mediaContentType
      alt
      previewImage {
        url
      }
      ... on MediaImage {
        id
        image {
          url
          width
          height
        }
      }
      ... on Video {
        id
        sources {
          mimeType
          url
        }
      }
      ... on Model3d {
        id
        sources {
          mimeType
          url
        }
      }
      ... on ExternalVideo {
        id
        embedUrl
        host
      }
    }
    query Product($handle: String!) {
      product(handle: $handle) {
        id
        title
        vendor
        descriptionHtml
        media(first: 7) {
          nodes {
            ...MediaFields
          }
        }
        variants(first: 100) {
          nodes {
            id
            availableForSale
            compareAtPriceV2 {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              id
              url
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            sku
            title
            unitPrice {
              amount
              currencyCode
            }
          }
        }
        seo {
          description
          title
        }
      }
    }
  `;
