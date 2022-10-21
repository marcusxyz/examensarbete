import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';

export default function Bestsellers() {
  const {
    data: { products },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });


  // console.log('💫👾💫 DEBUGGING IN PROGRESS 💫👾💫');
  // console.log(products.edges[0].node.variants.edges[0].node);
  // console.log(products.edges);

  return (
    <section className='w-full'>
      <h2 className='text-2xl my-4'>
        Our bestsellers
      </h2>

      <div className='grid grid-flow-row gap-y-6 grid-cols-2 false sm:grid-cols-4'>
        {products.edges.map((product) => {
          const productTitle = product.node.title;
          const price = product.node.variants.edges[0].node.priceV2.amount;
          return (
            <Link key={product.node.id} to={`/products/${product.node.handle}`} className='odd:border-r border-y border-black'>
              <div className='grid gap-2'>
                {product?.node.variants.edges[0].node.image && (
                  <Image
                    className='overflow-clip inline-block object-cover'
                    width={'100%'}
                    height={336}
                    alt={`Image of ${product.node.title}`}
                    data={product?.node.variants.edges[0].node.image}
                  />
                )}
                <div className='px-2 pb-2'>
                  <h2 className='text-sm mb-2'>
                    {productTitle}
                  </h2>
                  <p className='text-md'>${price}</p>
                </div>
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
    products(first: 4) {
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


