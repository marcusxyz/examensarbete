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
            <div className='w-full h-[80vw] md:h-[60vw] lg:h-[50vw] object-cover'>
              <video className='h-full object-cover' autoPlay muted loop>
                <source src={item.videoTesting.url} type='video/mp4' />
              </video>
            </div>

            <div className='flex flex-col md:justify-between gap-4 px-2 lg:px-4 py-4 lg:py-6 border-b md:border-l md:border-b-0 border-black'>
              <div>
                <h1 className='text-4xl font-medium lg:text-5xl xl:text-7xl'>
                  {item.title}
                </h1>
                <p className='text-lg lg:w-[50%] mt-4'>{item.paragraph}</p>
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
console.log('💜💜💜 NEW FETCH IN HERO 💜💜💜');
console.log(response.data);
