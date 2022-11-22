import { Suspense } from 'react';
import { useShopQuery, CacheLong, gql, Seo } from '@shopify/hydrogen';
import { fetchContentfulQuery } from '../../api/fetchContentfulQuery';

/* Component imports */
import Header from './Header.client';
import Footer from './Footer.server';

export function Layout({ children }) {
  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
  });

  const data = response.data;

  const linkText1 = data.navigationCollection.items[0].linkText;
  const linkURL1 = data.navigationCollection.items[0].linkUrl;
  const linkText2 = data.navigationCollection.items[1].linkText;
  const linkURL2 = data.navigationCollection.items[1].linkUrl;
  const linkText3 = data.navigationCollection.items[2].linkText;
  const linkURL3 = data.navigationCollection.items[2].linkUrl;

  const instagramText = data.footerCollection.items[0].socialName1;
  const instagramLink = data.footerCollection.items[0].socialLink1;
  const facebookText = data.footerCollection.items[0].socialName2;
  const facebookLink = data.footerCollection.items[0].socialLink2;
  const linkedInText = data.footerCollection.items[0].socialName3;
  const linkedInLink = data.footerCollection.items[0].socialLink3;

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
      <div className='flex flex-col min-h-screen antialiased bg-white overflow-hidden'>
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
          socialLink1={instagramLink}
          socialText1={instagramText}
          socialLink2={facebookLink}
          socialText2={facebookText}
          socialLink3={linkedInLink}
          socialText3={linkedInText}
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

const NAV_QUERY = `{
  navigationCollection(order: sys_firstPublishedAt_DESC) {
    items {
      linkText
      linkUrl
    }
  }
  footerCollection {
    items {
      socialName1
      socialLink1
      socialName2
      socialLink2
      socialName3
      socialLink3
    }
  }
}`;

const response = await fetchContentfulQuery(NAV_QUERY);
