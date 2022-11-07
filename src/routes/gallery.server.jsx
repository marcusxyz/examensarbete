import { Suspense } from 'react';
import { useShopQuery, CacheLong, gql, Seo } from '@shopify/hydrogen';

// Components
import { Layout } from '../components/Global/Layout.server';

export default function Gallery() {
  //   const {
  //     data: { seo },
  //   } = useShopQuery({
  //     query: SEO_QUERY,
  //     cache: CacheLong(),
  //     preload: true,
  //   });

  console.log('GALLERY PAGE!');

  return (
    <Layout>
      <Suspense>
        <Seo
          type='page'
          data={{
            title: 'Gallery',
          }}
        />
      </Suspense>
      <header className='grid w-full gap-8 py-8 lg:justify-items-start border-b border-black'>
        <h1 className='text-7xl whitespace-pre-wrap font-bold inline-block px-[10px] md:px-6'>
          Gallery page
        </h1>

        <div className='flex items-baseline justify-between w-full'>
          <div className=''>
            <p className='max-w-lg whitespace-pre-wrap inherit text-copy inline-block px-[10px] md:px-6'>
              Hard coded Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Nemo exercitationem vitae, officia maiores saepe ratione
              veritatis sunt voluptate modi voluptates blanditiis sit, iure ipsa
              nostrum molestias totam unde reprehenderit cupiditate.
            </p>
          </div>
        </div>
      </header>
    </Layout>
  );
}

// const SEO_QUERY = gql`
//   query seo {
//     page(handle: "gallery") {
//       seo {
//         title
//         description
//       }
//     }
//   }
// `;
