import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';
import { GET_CONTENTFUL_QUERY } from '../../api/query/query';
import { useContentfulQuery } from '../../api/useContentfulQuery';
import logo from '/logo.svg';

export default function Footer() {
  const {
    data: { collections },
  } = useShopQuery({
    query: CATEGORY_QUERY,
    cache: CacheLong(),
  });

  const { data: contentfulData } = useContentfulQuery({
    query: GET_CONTENTFUL_QUERY,
  });

  const socialName1 = contentfulData.footerCollection.items[0].socialName1;
  const socialLink1 = contentfulData.footerCollection.items[0].socialLink1;
  const socialName2 = contentfulData.footerCollection.items[0].socialName2;
  const socialLink2 = contentfulData.footerCollection.items[0].socialLink2;
  const socialName3 = contentfulData.footerCollection.items[0].socialName3;
  const socialLink3 = contentfulData.footerCollection.items[0].socialLink3;
  const getCustomerButtonName =
    contentfulData.footerCollection.items[0].getCustomerButtonName;
  const getCustomerButtonLink =
    contentfulData.footerCollection.items[0].getCustomerButtonLink;
  const copyrightText = contentfulData.footerCollection.items[0].copyright;

  const marqueeStyle = `
    font-medium block align-middle px-2 md:px-4 text-2xl md:text-4xl lg:text-7xl after:content-['/'] after:font-light after:inline-block after:md:h-[42px] after:lg:h-[78px] after:align-bottom after:pl-4 md:after:pl-8
    `;

  return (
    <>
      <div className='pt-24 border-t border-black pb-4 px-[10px] md:pt-[160px] md:px-6'>
        <Image
          className='overflow-clip inline-block object-contain'
          width={'100%'}
          height={'100%'}
          alt={`Image of brown kitchen`}
          src={logo}
          loading='lazy'
        />
      </div>

      <div className='bg-[#eaeaea] w-full'>
        <div className='relative flex overflow-x-hidden'>
          <div className='py-12 animate-marquee whitespace-nowrap'>
            {collections.nodes.map((collection) => {
              return (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.handle}`}
                  className='inline-block text-4xl lg:text-5xl xl:text-6xl font-medium'
                >
                  <span className={marqueeStyle}>{collection.title}</span>
                </Link>
              );
            })}
          </div>
          <div className='py-12 animate-marquee whitespace-nowrap'>
            {collections.nodes.map((collection) => {
              return (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.handle}`}
                  className='inline-block text-4xl lg:text-5xl xl:text-6xl font-medium'
                >
                  <span className={marqueeStyle}>{collection.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        <div className='w-auto grid grid-col-1 gap-6 lg:gap-0 lg:grid-cols-3 justify-items-center md:justify-between py-8 px-[10px] md:px-6 border-t border-black'>
          <div className='w-auto flex gap-8 md:col-start-2'>
            <Link to={socialLink1} className='font-medium' target='_blank'>
              {socialName1}
            </Link>
            <Link to={socialLink2} className='font-medium' target='_blank'>
              {socialName2}
            </Link>
            <Link to={socialLink3} className='font-medium' target='_blank'>
              {socialName3}
            </Link>
          </div>

          <Link
            to={getCustomerButtonLink}
            className='w-full text-center md:text-right font-medium md:col-start-3'
          >
            {getCustomerButtonName}
          </Link>

          <p className='w-full text-center md:text-left font-medium md:col-start-1 md:row-start-1'>
            {copyrightText}
          </p>
        </div>
      </div>
    </>
  );
}

const CATEGORY_QUERY = gql`
  query Collections {
    collections(first: 8, sortKey: UPDATED_AT) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
