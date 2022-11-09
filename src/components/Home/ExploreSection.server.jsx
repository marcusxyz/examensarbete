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
            <div className='px-[10px] md:px-6 py-8 grid grid-cols-1 lg:grid-cols-2'>
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
              <div className='lg:order-first lg:relative'>
                <h3 className='pt-2 md:pt-0 text-2xl lg:text-3xl xl:text-5xl lg:mb-4'>
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
              <div className='pt-8 border-t border-black'>
                <Image
                  className='overflow-clip inline-block object-cover h-[375px] lg:h-[500px] xl:h-[800px]'
                  width={'100%'}
                  height={'100%'}
                  alt={item.altText}
                  src={item.image.url}
                  loading='lazy'
                />

                <div className='px-[10px] md:px-6 lg:flex items-start justify-between lg:mt-4 '>
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
              <div className='mt-8 lg:mt-4 px-[10px] md:px-6 pt-4 pb-8 md:pb-6 border-t border-black'>
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
console.log('💚💚💚 NEW FETCH IN EXPLORE 💚💚💚');
console.log(response.data);
