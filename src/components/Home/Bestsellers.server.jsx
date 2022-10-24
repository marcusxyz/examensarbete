import { gql, useShopQuery, CacheLong } from '@shopify/hydrogen';
import ProductCard from '../Product/ProductCard.server';

import { ButtonLarge } from '../Elements/ButtonLarge';

export default function Bestsellers() {
  const {
    data: { collection },
  } = useShopQuery({
    query: BESTSELLER_QUERY,
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
  return (
    <section className='w-full grid pb-24'>
      <div className='flex flex-row justify-between items-center px-[10px] md:px-6 py-8 border-y border-black'>
        <h2 className='font-medium text-2xl md:text-[32px]'>Our bestsellers</h2>
        {/* <ButtonLarge to={'/textures'} btnName={'All textures'}></ButtonLarge> */}
      </div>
      <div className='grid-flex-row grid grid-cols-2 gap-[1px] pb-[1px] bg-black md:grid-cols-3 lg:grid-cols-4'>
        {collection.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
const BESTSELLER_QUERY = gql`
  query Bestsellers {
    products(first: 4) {
      edges {
        node {
          # Get id, title and handle of the product
    collection(handle: "textures") {
      title
      handle
      products(first: 4) {
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


