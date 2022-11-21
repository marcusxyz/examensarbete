import { Suspense } from 'react';
import { Link, Image } from '@shopify/hydrogen';
import { ButtonSmall } from '../elements/ButtonSmall';
import { fetchContentfulQuery } from '../../api/fetchContentfulQuery';

export default function ExploreSection() {
  const communityRenders = response.data.inspirationSection1Collection.items;
  const aboutSection = response.data.inspirationSection2Collection.items;

  return (
    <>
      <Suspense>
        <section className='w-full border-t border-black'>
          {communityRenders.map((item) => (
            <div className='px-[10px] md:px-6 py-8 grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-6'>
              <div className='lg:order-last'>
                <Image
                  className='overflow-clip inline-block object-cover h-[375px] xl:h-[700px]'
                  width={'100%'}
                  height={'100%'}
                  alt={item.altText}
                  src={item.image.url}
                  loading='lazy'
                />
              </div>
              <div className='lg:order-first flex flex-col justify-between'>
                <div className='flex flex-col gap-4 lg:gap-8'>
                  <div className='flex flex-col md:gap-2'>
                    <h3 className='font-medium pt-2 md:pt-0 text-2xl lg:text-3xl xl:text-5xl'>
                      {item.title}
                    </h3>
                    <p className='lg:text-lg xl:text-2xl'>{item.subtitle}</p>
                  </div>
                  <ButtonSmall to={item.buttonLink} btnName={item.buttonText} />
                </div>

                <div className='hidden lg:flex flex-col items-end'>
                  <h4 className='font-medium xl:text-2xl'>
                    {item.imageTakenFrom}
                  </h4>
                  <Link
                    className='hover:underline'
                    to={item.imageTextureUrl}
                    target='_blank'
                  >
                    {item.imageTextureLink}
                  </Link>
                  <p>Using: {item.imageTextureName}</p>
                </div>
              </div>
            </div>
          ))}
          {aboutSection.map((item) => (
            <>
              <div className='py-8 flex flex-col gap-4 border-t border-black'>
                <Image
                  className='overflow-clip inline-block object-cover h-[375px] lg:h-[500px] xl:h-[800px]'
                  width={'100%'}
                  height={'100%'}
                  alt={item.altText}
                  src={item.image.url}
                  loading='lazy'
                />

                <div className='px-[10px] md:px-6 flex flex-col gap-4 items-start justify-between lg:pt-4 lg:flex-row'>
                  <div>
                    <h3 className='font-medium text-2xl lg:text-3xl xl:text-5xl'>
                      {item.title}
                    </h3>
                    <p className='lg:mb-0 lg:text-lg xl:mt-2'>
                      {item.subtitle}
                    </p>
                  </div>

                  <ButtonSmall to={item.buttonLink} btnName={item.buttonText} />
                </div>
              </div>
              <div className='px-[10px] md:px-6 pt-6 pb-8 md:pb-6 border-y border-black'>
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

const EXPLORE_QUERY = `{
  inspirationSection1Collection {
    items {
      title,
      altText,
      subtitle
      buttonText
      buttonLink
      imageTextureName
      imageTextureLink
      imageTextureUrl
      imageTakenFrom
      image {
        url
      }
    }
  }
  inspirationSection2Collection {
    items {
      title,
      altText,
      subtitle
      buttonText
      buttonLink
      paragraph
      image {
        url
      }
    }
  }
}`;

const response = await fetchContentfulQuery(EXPLORE_QUERY);
