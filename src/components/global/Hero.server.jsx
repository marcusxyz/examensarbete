import { Suspense } from 'react';
import { gql, useShopQuery, CacheLong } from '@shopify/hydrogen';

export default function Hero() {
  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: true,
  });
  return (
    <>
      <Suspense>
        <section className='p-[10px] md:p-6'>
          <h1 className='font-extrabold mb-4 text-5xl md:text-7xl'>
            Welcome to {shop.name}
          </h1>
          <p>{shop.description}</p>
        </section>
      </Suspense>
    </>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
