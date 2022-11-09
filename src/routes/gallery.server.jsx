import { Suspense } from 'react';
import { gql, Seo } from '@shopify/hydrogen';
import { useContentfulQuery } from '../api/useContentfulQuery';
import { GET_CONTENTFUL_QUERY } from '../api/query/query';

// Components
import GalleryCard from '../components/Gallery/GalleryCard.server';
import { Layout } from '../components/Global/Layout.server';

export default function Gallery() {
  const { data: contentfulData } = useContentfulQuery({
    query: GET_CONTENTFUL_QUERY,
  });

  const gallery = contentfulData.galleryCardCollection;
  const galleryText = contentfulData.galleryTextCollection.items;

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
      <header className='mt-8 pb-6 px-2 border-b border-black'>
        {galleryText.map((item) => (
          <div>
            <h1 className='text-3xl lg:text-5xl xl:text-7xl pb-4 font-medium'>{item.title}</h1>
            <p className='text-lg xl:text-xl lg:w-[70%] xl:w-[50%]'>{item.introText}</p>
          </div>
        ))}
      </header>

      <section className='mt-5 mb-8 px-3'>
        <div className='mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-16 gap-6 md:gap-x-3'>
          <div className='grid lg:row-start-1 lg:col-start-1 lg:row-span-2 pb-2'>
            <GalleryCard
              src={gallery.items[7].image.url}
              alt={gallery.items[7].altText}
              name={gallery.items[7].name}
              url={gallery.items[7].link}
            />
          </div>
          <div className='grid lg:row-start-1 lg:col-start-2 lg:row-span-6'>
            <GalleryCard
              src={gallery.items[6].image.url}
              alt={gallery.items[6].altText}
              name={gallery.items[6].name}
              url={gallery.items[6].link}
            />
          </div>
          <div className='grid lg:row-start-1 lg:col-start-3 lg:row-span-6'>
            <GalleryCard
              src={gallery.items[5].image.url}
              alt={gallery.items[5].altText}
              name={gallery.items[5].name}
              url={gallery.items[5].link}
            />
          </div>
          <div className='grid lg:row-start-3 lg:col-start-1 lg:row-span-6'>
            <GalleryCard
              src={gallery.items[4].image.url}
              alt={gallery.items[4].altText}
              name={gallery.items[4].name}
              url={gallery.items[4].link}
            />
          </div>
          <div className='grid lg:row-start-7 lg:col-start-2 lg:row-span-2 pb-2'>
            <GalleryCard
              src={gallery.items[3].image.url}
              alt={gallery.items[3].altText}
              name={gallery.items[3].name}
              url={gallery.items[3].link}
            />
          </div>
          <div className='grid lg:row-start-7 lg:col-start-3 lg:row-span-4'>
            <GalleryCard
              btnText={gallery.items[2].buttonText}
              src={gallery.items[2].image.url}
              alt={gallery.items[2].altText}
              name={gallery.items[2].name}
              url={gallery.items[2].link}
            />
          </div>
          <div className='grid lg:row-start-8 lg:col-start-1 lg:row-span-3'>
            <GalleryCard
              src={gallery.items[1].image.url}
              alt={gallery.items[1].altText}
              name={gallery.items[1].name}
              url={gallery.items[1].link}
            />
          </div>
          <div className='grid lg:row-start-8 lg:col-start-2 lg:row-span-6'>
            <GalleryCard
              src={gallery.items[0].image.url}
              alt={gallery.items[0].altText}
              name={gallery.items[0].name}
              url={gallery.items[0].link}
            />
          </div>
        </div>
      </section>

      {galleryText.map((item) => (
        <div className='border-t border-black py-5 px-3'>
          <h3 className='text-2xl lg:text-4xl xl:text-5xl pb-2'>{item.outroTitle}</h3>
          <p className='lg:text-xl xl:text-2xl lg:w-[70%] xl:w-[50%]'>{item.outroText}</p>
        </div>
      ))}
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
