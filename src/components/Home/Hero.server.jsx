import { Suspense } from 'react';
import { Image } from '@shopify/hydrogen';
import { ButtonSmall } from '../elements/ButtonSmall';
import { fetchContentfulQuery } from '../../api/fetchContentfulQuery';

export default function Hero() {
  const hero = response.data.heroCollection.items;

  return (
    <>
      <Suspense>
        {hero.map((item) => (
          <section className='grid grid-cols-1 md:grid-cols-2'>
            <Image
              className='overflow-clip inline-block object-cover h-[375px] md:h-[763px]'
              width={'100%'}
              height={'100%'}
              alt={`Image of brown kitchen`}
              src={item.media.url}
              loading='lazy'
            />
            <div className='flex flex-col md:justify-between gap-4 px-2 lg:px-4 py-4 lg:py-6 border-b md:border-l md:border-b-0 border-black'>
              <div>
                <h1 className='text-4xl lg:text-5xl xl:text-6xl'>
                  {item.title}
                </h1>
                <p className='text-lg lg:w-[75%] mt-4'>{item.paragraph}</p>
              </div>

              <div className='my-4'>
                <ButtonSmall to={item.buttonLink} btnName={item.buttonText} />
              </div>
            </div>
          </section>
        ))}
      </Suspense>
    </>
  );
}

const HERO_QUERY = `{
  heroCollection {
    items {
      title
      paragraph
      buttonText
      buttonLink
      media {
        url
      }
    }
  }
}`;

const response = await fetchContentfulQuery(HERO_QUERY);
console.log('💜💜💜 NEW FETCH IN HERO 💜💜💜');
console.log(response.data);
