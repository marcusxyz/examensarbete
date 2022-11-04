import { Suspense } from 'react';
import { useShopQuery, CacheLong, gql, Seo } from '@shopify/hydrogen';
import { useContentfulQuery } from '../api/useContentfulQuery';
import { GET_CONTENTFUL_QUERY } from '../api/query/query';

/* Component imports */
import Header from './Header.client';
import Footer from './Footer.server';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */
export function Layout({ children }) {
  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
  });

  const { data: contentfulData } = useContentfulQuery({
    query: GET_CONTENTFUL_QUERY,
  });

  const linkText1 = contentfulData.navigationCollection.items[0].linkText;
  const linkURL1 = contentfulData.navigationCollection.items[0].linkUrl;
  const linkText2 = contentfulData.navigationCollection.items[1].linkText;
  const linkURL2 = contentfulData.navigationCollection.items[1].linkUrl;
  const linkText3 = contentfulData.navigationCollection.items[2].linkText;
  const linkURL3 = contentfulData.navigationCollection.items[2].linkUrl;

  return (
    <>
      <Suspense>
        <Seo
          type='defaultSeo'
          data={{
            title: shop.name,
            description: shop.description,
          }}
        />
      </Suspense>
      <div className='flex flex-col min-h-screen antialiased bg-neutral-50 overflow-hidden'>
        <div className=''>
          <a href='#mainContent' className='sr-only'>
            Skip to content
          </a>
        </div>
        <Header
          shop={shop}
          navItemLink1={linkURL1}
          navItemText1={linkText1}
          navItemLink2={linkURL2}
          navItemText2={linkText2}
          navItemText3={linkText3}
          navItemLink3={linkURL3}
        />

        <main role='main' id='mainContent' className='flex-grow'>
          <Suspense fallback={null}>{children}</Suspense>
        </main>

        <Footer />
      </div>
    </>
  );
}

const SHOP_QUERY = gql`
  query layout {
    shop {
      name
      description
    }
  }
`;
