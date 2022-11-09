import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';
import { fetchContentfulQuery } from '../../api/fetchContentfulQuery';

export default function Footer() {
  const {
    data: { collections },
  } = useShopQuery({
    query: CATEGORY_QUERY,
    cache: CacheLong(),
  });

  const footer = response.data.footerCollection.items;

  const marqueeStyle = `
    font-medium block align-middle px-2 md:px-4 text-2xl md:text-4xl lg:text-7xl after:content-['/'] after:font-light after:inline-block after:md:h-[42px] after:lg:h-[78px] after:align-bottom after:pl-4 md:after:pl-8
    `;

  return (
    <>
      <div className='pt-24 pb-4 px-[10px] md:pt-[160px] md:px-6 border-t border-black'>
        {footer.map((item) => (
          <Image
            className='overflow-clip inline-block object-contain'
            width={'100%'}
            height={'100%'}
            alt={item.altText}
            src={item.logo.url}
            loading='lazy'
          />
        ))}
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

        {footer.map((item) => (
          <div className='w-auto grid grid-col-1 gap-6 lg:gap-0 lg:grid-cols-3 justify-items-center md:justify-between py-8 px-[10px] md:px-6 border-t border-black'>
            <div className='w-auto flex gap-8 md:col-start-2'>
              <Link to={item.socialLink1} className='font-medium' target='_blank'>
                {item.socialName1}
              </Link>
              <Link to={item.socialLink2} className='font-medium' target='_blank'>
                {item.socialName2}
              </Link>
              <Link to={item.socialLink3} className='font-medium' target='_blank'>
                {item.socialName3}
              </Link>
            </div>

            <Link
              to={item.getCustomerButtonLink}
              className='w-full text-center md:text-right font-medium md:col-start-3'
              target='_blank'
            >
              {item.getCustomerButtonName}
            </Link>

            <p className='w-full text-center md:text-left font-medium md:col-start-1 md:row-start-1'>
              {item.copyright}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

const CATEGORY_QUERY = gql`
  query Collections {
    collections(first: 8, sortKey: RELEVANCE) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;

const FOOTER_QUERY = `{
  footerCollection {
    items {
      logo {
        url
      }
      altText
      socialName1
      socialLink1
      socialName2
      socialLink2
      socialName3
      socialLink3
      getCustomerButtonName
      getCustomerButtonLink
      copyright
    }
  }
}`;

const response = await fetchContentfulQuery(FOOTER_QUERY);
console.log('🤍🤍🤍 NEW FETCH IN FOOTER 🤍🤍🤍');
console.log(response.data);
