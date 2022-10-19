import { Suspense } from 'react';
import { gql, useShopQuery, CacheLong, Image, Link } from '@shopify/hydrogen';
import heroimg from '../../../public/hero-img.png'
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
        <section className='flex flex-col'>
          <Image
            className="shadow-border overflow-clip inline-block aspect-[5/4] md:aspect-[3/2] object-cover"
            width={"100%"}
            height={375}
            alt={`Image of brown kitchen`}
            src={heroimg}
          />

          <div className='flex flex-col gap-4 px-2 py-4'>
            <h1 className="text-4xl">Achieve photorealism with high-resolution textures</h1>
            <p className='text-lg'>Let’s get close and personal. Our quality texture maps allow you to capture stunning close-ups or epic wide-shots in your scenes. Giving you the freedom to create the renders you want.</p>

            <div className='mt-4'>
              <ButtonLarge to="/" btnName="Explore high quality textures" />
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
