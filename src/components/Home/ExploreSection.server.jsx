import { Link, Image } from '@shopify/hydrogen';
import bathimg from '/bathroom.png';
import kitchimg from '/kitchen.png';
import { ButtonSmall } from '../elements/ButtonSmall';
import { useContentfulQuery } from '../../api/useContentfulQuery';
import { GET_CONTENTFUL_QUERY } from '../../api/query/query';

export default function ExploreSection() {

  const { data: contentfulData } = useContentfulQuery({
    query: GET_CONTENTFUL_QUERY
  });

  console.dir(contentfulData, { depth: 5 });
  // console.log('💫👾💫 DEBUGGING IN PROGRESS 💫👾💫');
  // console.log(contentfulData.inspirationSection1Collection.items[0].title);

  const firstTitle = contentfulData.inspirationSection1Collection.items[0].title;
  const firstSubtitle = contentfulData.inspirationSection1Collection.items[0].subtitle;
  const firstBtnText = contentfulData.inspirationSection1Collection.items[0].buttonText;
  const firstImg = contentfulData.inspirationSection1Collection.items[0].image.url;
  const imageTextureName = contentfulData.inspirationSection1Collection.items[0].imageTextureName;
  const imageTextureLink = contentfulData.inspirationSection1Collection.items[0].imageTextureLink;
  const imageTakenFrom = contentfulData.inspirationSection1Collection.items[0].imageTakenFrom;

  const secondTitle = contentfulData.inspirationSection2Collection.items[0].title;
  const secondSubtitle = contentfulData.inspirationSection2Collection.items[0].subtitle;
  const secondImg = contentfulData.inspirationSection2Collection.items[0].image.url;
  const secondBtnText = contentfulData.inspirationSection2Collection.items[0].buttonText;
  const secondBtnLink = contentfulData.inspirationSection2Collection.items[0].buttonLink;
  const paragraph = contentfulData.inspirationSection2Collection.items[0].paragraph;

  return (
    <section className='w-full py-8 lg:py-4 border-t border-b border-black'>
      <div className='pb-8 lg:pb-4 px-2 grid grid-cols-1 lg:grid-cols-2'>
        <div className='lg:order-last'>
          <Image
            className='overflow-clip inline-block object-cover h-[375px] xl:h-[700px]'
            width={'100%'}
            height={'100%'}
            alt={`Image of bathtub with big glas windows behind`}
            src={firstImg}
            loading='lazy'
          />
        </div>
        <div className='lg:order-first lg:relative'>
          <h3 className='mt-4 lg:mt-0 text-2xl lg:text-3xl xl:text-5xl lg:mb-4'>
            {firstTitle}
          </h3>
          <p className='mb-8 lg:text-lg xl:text-2xl'>
            {firstSubtitle}
          </p>

          <ButtonSmall to='' btnName={firstBtnText} />

          <div className='hidden lg:absolute bottom-0 right-4 lg:flex flex-col items-end'>
            <h4 className='font-medium xl:text-2xl'>{imageTakenFrom}</h4>
            <Link to='https://www.bloorise.com/'>{imageTextureLink}</Link>
            <p>Using: {imageTextureName}</p>
          </div>
        </div>
      </div>

      <div className='pt-8 lg:pt-4 border-t border-black'>
        <Image
          className='overflow-clip inline-block object-cover h-[375px] lg:h-[500px] xl:h-[800px]'
          width={'100%'}
          height={'100%'}
          alt={`Image of light brown kitchen`}
          src={kitchimg}
          loading='lazy'
        />

        <div className='px-2 lg:flex items-start justify-between lg:mt-4 '>
          <div>
            <h3 className='mt-4 lg:mt-0 text-2xl lg:text-3xl xl:text-5xl'>
              {secondTitle}
            </h3>
            <p className='mb-8 lg:mb-0 lg:text-lg xl:text-2xl xl:mt-2'>
              {secondSubtitle}
            </p>
          </div>

          <ButtonSmall to={secondBtnLink} btnName={secondBtnText} />
        </div>
      </div>

      <div className='mt-8 lg:mt-4 px-2 pt-8 lg:py-4 border-t border-black'>
        <p className='lg:max-w-[70%] xl:max-w-[50%]'>
          {paragraph}
        </p>
      </div>
    </section>
  );
}

