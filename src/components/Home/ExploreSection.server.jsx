import { Suspense } from 'react';
import { Link, Image } from '@shopify/hydrogen';
import bathimg from '/bathroom.png';
import kitchimg from '/kitchen.png';
import { ButtonSmall } from '../elements/ButtonSmall';
import { useContentfulQuery } from '../../api/useContentfulQuery';
import { GET_CONTENTFUL_QUERY } from '../../api/query/query';

export default function ExploreSection() {
  const { data: contentfulData } = useContentfulQuery({
    query: GET_CONTENTFUL_QUERY,
  });

  const communityRenders = contentfulData.inspirationSection1Collection.items;
  const aboutSection = contentfulData.inspirationSection2Collection.items;

  return (
    <>
      <Suspense>
        <section className='w-full py-8 lg:py-4 border-t border-black'>
          {communityRenders.map((item) => (
            <div className='pb-8 lg:pb-4 px-2 grid grid-cols-1 lg:grid-cols-2'>
              <div className='lg:order-last'>
                <Image
                  className='overflow-clip inline-block object-cover h-[375px] xl:h-[700px]'
                  width={'100%'}
                  height={'100%'}
                  alt={`Image of bathtub with big glas windows behind`}
                  src={item.image.url}
                  loading='lazy'
                />
              </div>
              <div className='lg:order-first lg:relative'>
                <h3 className='mt-4 lg:mt-0 text-2xl lg:text-3xl xl:text-5xl lg:mb-4'>
                  {item.title}
                </h3>
                <p className='mb-8 lg:text-lg xl:text-2xl'>{item.subtitle}</p>

                <ButtonSmall to={item.buttonLink} btnName={item.buttonText} />

                <div className='hidden lg:absolute bottom-0 right-4 lg:flex flex-col items-end'>
                  <h4 className='font-medium xl:text-2xl'>
                    {item.imageTakenFrom}
                  </h4>
                  <Link to={item.imageTextureLink} target='_blank'>
                    {item.imageTextureLink}
                  </Link>
                  <p>Using: {item.imageTextureName}</p>
                </div>
              </div>
            </div>
          ))}
          {aboutSection.map((item) => (
            <>
              <div className='pt-8 lg:pt-4 border-t border-black'>
                <Image
                  className='overflow-clip inline-block object-cover h-[375px] lg:h-[500px] xl:h-[800px]'
                  width={'100%'}
                  height={'100%'}
                  alt={`Image of light brown kitchen`}
                  src={item.image.url}
                  loading='lazy'
                />

                <div className='px-2 lg:flex items-start justify-between lg:mt-4 '>
                  <div>
                    <h3 className='mt-4 lg:mt-0 text-2xl lg:text-3xl xl:text-5xl'>
                      {item.title}
                    </h3>
                    <p className='mb-8 lg:mb-0 lg:text-lg xl:text-2xl xl:mt-2'>
                      {item.subtitle}
                    </p>
                  </div>

                  <ButtonSmall to={item.buttonLink} btnName={item.buttonText} />
                </div>
              </div>
              <div className='mt-8 lg:mt-4 px-2 pt-8 lg:py-4 border-t border-black'>
                <p className='lg:max-w-[70%] xl:max-w-[50%]'>
                  {item.paragraph}
                </p>
              </div>
            </>
          ))}
        </section>
      </Suspense>
    </>
  );
}
