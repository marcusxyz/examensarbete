import { gql, useShopQuery, CacheLong } from '@shopify/hydrogen';
import ProductCard from '../Product/ProductCard.server';

export default function Bestsellers() {
  const {
    data: { collection },
  } = useShopQuery({
    query: BESTSELLER_QUERY,
    cache: CacheLong(),
  });

  return (
    <section className='w-full grid'>
      <div className='flex flex-row justify-between items-center px-[10px] md:px-6 py-8 border-b md:border-y border-black'>
        <h2 className='font-medium text-2xl md:text-[32px]'>Our bestsellers</h2>
      </div>
      <div className='grid bg-grid-pattern-mobile lg:bg-grid-pattern-desktop pr-[1px] mr-[-1px] gap-[1px] grid-cols-2 lg:grid-cols-4'>
        {collection.products.nodes.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
const BESTSELLER_QUERY = gql`
  query Bestsellers {
    collection(handle: "textures") {
      products(first: 4) {
        nodes {
          id
          title
          handle
          variants(first: 1) {
            nodes {
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
            }
          }
        }
      }
    }
  }
`;
