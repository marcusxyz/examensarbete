import { Suspense } from 'react';
import { Image } from '@shopify/hydrogen';
import { ButtonSmall } from '../elements/ButtonSmall';
import { useContentfulQuery } from '../../api/useContentfulQuery';
import { GET_CONTENTFUL_QUERY } from '../../api/query/heroQuery';

export default function Hero() {
  const { data: contentfulData } = useContentfulQuery({
    query: GET_CONTENTFUL_QUERY,
  });

  console.log('💫👾💫 DEBUGGING IN PROGRESS 💫👾💫');
  // console.dir(contentfulData, { depth: 5 });
  // console.log(contentfulData.heroCollection.items[0].image.url);

  const heroTitle = contentfulData.heroCollection.items[0].title;
  const heroParagraph = contentfulData.heroCollection.items[0].paragraph;
  const heroText = contentfulData.heroCollection.items[0].buttonText;
  const heroLink = contentfulData.heroCollection.items[0].buttonLink;
  const heroImg = contentfulData.heroCollection.items[0].image.url;

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
              <p className='text-lg lg:w-[75%] mt-4'>{heroParagraph}</p>
            </div>

            <div className='my-4'>
              <ButtonSmall to={heroLink} btnName={heroText} />
            </div>
          </div>
        </section>
      </Suspense>
    </>
  );
}
