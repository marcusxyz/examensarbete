import { Suspense } from 'react';
import { gql, Seo } from '@shopify/hydrogen';
import { useContentfulQuery } from '../api/useContentfulQuery';
import { GET_CONTENTFUL_QUERY } from '../api/query/query';
import { fetchContentfulQuery } from '../api/fetchContentfulQuery';

// Components
import GalleryCard from '../components/Gallery/GalleryCard.server';
import { Layout } from '../components/Global/Layout.server';

export default function Gallery() {
  const { data: contentfulData } = useContentfulQuery({
    query: GET_CONTENTFUL_QUERY,
  });

  const galleryText = contentfulData.galleryTextCollection.items;

  const firstCol = response.data.firstGalleryColumnCollection.items;
  const secondCol = response.data.secondGalleryColumnCollection.items;
  const thirdCol = response.data.thirdGalleryColumnCollection.items;

  console.log(firstCol);
  console.log(secondCol);
  console.log(thirdCol);

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
            <h1 className='text-3xl pb-4'>{item.title}</h1>
            <p className='text-lg'>{item.introText}</p>
          </div>
        ))}
      </header>

      <section className='mt-5 mb-8 px-[10px] md:px-6'>
        <div className='flex flex-col gap-6 md:flex-row flex-wrap'>
          <div className='md:flex-1'>
            {firstCol.map((item) => (
              <GalleryCard
                src={item.image.url}
                alt='test'
                name={item.author}
                btnText={item.linkText}
                url={item.linkUrl}
                fabric={item.productsUsed}
              />
            ))}
          </div>
          <div className='md:flex-1'>
            {secondCol.map((item) => (
              <GalleryCard
                src={item.image.url}
                alt='test'
                name={item.author}
                btnText={item.linkText}
                url={item.linkUrl}
                fabric={item.productsUsed}
              />
            ))}
          </div>
          <div className='md:flex-1'>
            {thirdCol.map((item) => (
              <GalleryCard
                src={item.image.url}
                alt='test'
                name={item.author}
                btnText={item.linkText}
                url={item.linkUrl}
                fabric={item.productsUsed}
              />
            ))}
          </div>
        </div>
      </section>

      {galleryText.map((item) => (
        <div className='border-t border-black py-5 px-3'>
          <h3 className='text-2xl pb-2'>{item.outroTitle}</h3>
          <p>{item.outroText}</p>
        </div>
      ))}
    </Layout>
  );
}

const GALLERY_QUERY = `{
  firstGalleryColumnCollection(order: sys_publishedAt_ASC)  {
    items {
      image {
        url
      }
      author
      linkText
      linkUrl
      productsUsed
    }
  }
  secondGalleryColumnCollection(order: sys_publishedAt_ASC) {
    items {
      image {
        url
      }
      author
      linkText
      linkUrl
      productsUsed
    }
  }
  thirdGalleryColumnCollection(order: sys_publishedAt_ASC) {
    items {
      image {
        url
      }
      author
      linkText
      linkUrl
      productsUsed
    }
  }
}`;

const response = await fetchContentfulQuery(GALLERY_QUERY);
console.log(' 🤎🤎🤎 NEW FETCH IN GALLERY 🤎🤎🤎');
console.log(response.data);
