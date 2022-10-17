import {
  useShopQuery,
  CacheLong,
  gql,
  useUrl,
  Link,
  Seo,
} from '@shopify/hydrogen';

/**
 * A server component that defines a structure and organization of a page that can be used in different parts of the Hydrogen app
 */

export function Layout({ children }) {
  const { pathname } = useUrl();
  const isHome = pathname === '/';

  const {
    data: { shop },
  } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
    preload: true,
  });

  return (
    <>
      <Seo
        type='defaultSeo'
        data={{ title: shop.name, description: shop.description }}
      />

      <div className='flex flex-col min-h-screen antialiased bg-neutral-50'>
        <div className=''>
          <a href='#mainContent' className='sr-only'>
            Skip to content
          </a>
        </div>
        <nav
          role='navigation'
          className={`flex items-center h-14 md:h-[86px] p-[10px] md:p-6 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased border-b border-black ${
            isHome
              ? 'bg-white/80 text-black no-underline'
              : 'bg-white/80 underline'
          }`}
        >
          <div className='flex justify-between w-full'>
            <div className=''>
              <Link className='font-medium' to='/'>
                {shop.name}
              </Link>
            </div>
            <div className='flex gap-8'>
              <Link className='font-medium' to='/'>
                Texture
              </Link>
              <Link className='font-medium' to='/'>
                Gallery
              </Link>
              <Link className='font-medium' to='/'>
                About
              </Link>
            </div>
            <div className=''>
              <Link className='font-medium' to='/'>
                Cart (0)
              </Link>
            </div>
          </div>
        </nav>

        <main role='main' id='mainContent' className='flex-grow'>
          {children}
        </main>
      </div>
    </>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;
