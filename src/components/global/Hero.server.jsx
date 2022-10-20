import { Suspense } from 'react';
import { gql, useShopQuery, CacheLong, Image } from '@shopify/hydrogen';
import heroimg from '/hero-img.png';
import { ButtonLarge } from '../elements/ButtonLarge';

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
        <section className='grid grid-cols-1 md:grid-cols-2'>
          <Image
            className='overflow-clip inline-block object-cover h-[375px] md:h-[600px]'
            width={'100%'}
            height={'100%'}
            alt={`Image of brown kitchen`}
            src={heroimg}
          />

          <div className='flex flex-col md:justify-between gap-4 px-2 lg:px-4 py-4 lg:py-6 md:border-l md:border-b border-black'>
            <div>
              <h1 className='text-4xl lg:text-5xl xl:text-6xl'>
                Achieve photorealism with high-resolution textures
              </h1>
              <p className='text-lg lg:w-[75%] mt-4'>
                Let’s get close and personal. Our quality texture maps allow you
                to capture stunning close-ups or epic wide-shots in your scenes.
                Giving you the freedom to create the renders you want.
              </p>
            </div>

            <div className='my-4'>
              <ButtonLarge to='/' btnName='Explore high quality textures' />
            </div>
          </div>
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
