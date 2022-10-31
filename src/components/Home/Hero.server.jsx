import { Suspense } from 'react';
import { gql, Image } from '@shopify/hydrogen';
import { ButtonSmall } from '../elements/ButtonSmall';
import { useContentfulQuery } from '../../api/useContentfulQuery';

export default function Hero() {
  const { data: contentfulData } = useContentfulQuery({
    query: HERO_QUERY,
  });

  console.log('💫👾💫 DEBUGGING IN PROGRESS 💫👾💫');
  console.dir(contentfulData, { depth: 5 });
  console.log(contentfulData.headerCollection.items[0].image.url);

  const heroTitle = contentfulData.headerCollection.items[0].text;
  const heroImg = contentfulData.headerCollection.items[0].image.url;

  return (
    <>
      <Suspense>
        <section className='grid grid-cols-1 md:grid-cols-2'>
          <Image
            className='overflow-clip inline-block object-cover h-[375px] md:h-[763px]'
            width={'100%'}
            height={'100%'}
            alt={`Image of brown kitchen`}
            src={heroImg}
            loading='lazy'
          />

          <div className='flex flex-col md:justify-between gap-4 px-2 lg:px-4 py-4 lg:py-6 border-b md:border-l md:border-b-0 border-black'>
            <div>
              <h1 className='text-4xl lg:text-5xl xl:text-6xl'>{heroTitle}</h1>
              <p className='text-lg lg:w-[75%] mt-4'>
                Let’s get close and personal. Our quality texture maps allow you
                to capture stunning close-ups or epic wide-shots in your scenes.
                Giving you the freedom to create the renders you want.
              </p>
            </div>

            <div className='my-4'>
              <ButtonSmall to='/' btnName='Explore high quality textures' />
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
}

const HERO_QUERY = gql`
  query GetHeroContent {
    headerCollection {
      items {
        text
        image {
          url
        }
      }
    }
  }
`;
