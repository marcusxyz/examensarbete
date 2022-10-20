import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';

export default function Bestsellers() {
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  console.log('💫👾💫 DEBUGGING IN PROGRESS 💫👾💫');
  // console.log(products.edges);
  console.log(products.edges[0].node.variants.edges[0].node);

  return (
    <section className='w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12'>
      <h2 className='whitespace-pre-wrap max-w-prose font-bold text-lead'>
        Our bestsellers
      </h2>
      <div className='grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false'>
        {products.edges.map((product) => {
          const productTitle = product.node.title;
          const price = product.node.variants.edges[0].node.priceV2.amount;

          return (
            <Link key={product.node.id} to={`/products/${product.node.handle}`}>
              <div className='grid gap-4'>
                {product?.node.variants.edges[0].node.image && (
                  <Image
                    className='rounded shadow-border overflow-clip inline-block aspect-[5/4] md:aspect-[3/2] object-cover'
                    width={'100%'}
                    height={336}
                    alt={`Image of ${product.node.title}`}
                    data={product?.node.variants.edges[0].node.image}
                  />
                )}
                <h2 className='whitespace-pre-wrap max-w-prose font-medium text-copy'>
                  {productTitle}
                </h2>
                <p>${price}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const QUERY = gql`
  query Bestsellers {
    products(first: 3) {
      edges {
        node {
          # Get id, title and handle of the product
          id
          title
          handle
          # Get price and image
          variants(first: 1) {
            edges {
              node {
                id
                image {
                  url
                  altText
                  width
                  height
                }
                priceV2 {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
