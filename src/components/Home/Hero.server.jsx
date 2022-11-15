import { Suspense } from 'react';
import { ButtonSmall } from '../elements/ButtonSmall';
import { fetchContentfulQuery } from '../../api/fetchContentfulQuery';

export default function Hero() {
  const hero = response.data.heroCollection.items;

  return (
    <>
      <Suspense>
        {hero.map((item) => (
          <section className='grid grid-cols-1 md:grid-cols-2'>
            <div className='w-full h-[80vw] md:h-[60vw] lg:h-[40vw] object-cover'>
              <video className='h-full object-cover' autoPlay muted loop>
                <source src={item.videoTesting.url} type='video/mp4' />
              </video>
            </div>

            <div className='flex flex-col gap-6 md:justify-between px-[10px] md:px-6 py-8 border-b md:border-l md:border-b-0 border-black'>
              <div className=''>
                <h1 className='text-4xl font-medium lg:text-[4vw] mb-4 md:mb-6 leading-none'>
                  {item.title}
                </h1>
                <p className='text-copy lg:text-[17px] xl:text-lg lg:w-[50%]'>
                  {item.paragraph}
                </p>
              </div>
              <ButtonSmall to={item.buttonLink} btnName={item.buttonText} />
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
      title,
      altText,
      paragraph
      buttonText
      buttonLink,
      videoTesting{
        url
      }
    }
  }
}`;

const response = await fetchContentfulQuery(HERO_QUERY);
