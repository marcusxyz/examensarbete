import { Suspense } from 'react';
import { Seo } from '@shopify/hydrogen';
import { fetchContentfulQuery } from '../api/fetchContentfulQuery';

// Components
import GalleryCard from '../components/Gallery/GalleryCard.server';
import { Layout } from '../components/Global/Layout.server';

export default function Gallery() {

  const galleryText = response.data.galleryTextCollection.items;

  const firstCol = response.data.firstGalleryColumnCollection.items;
  const secondCol = response.data.secondGalleryColumnCollection.items;
  const thirdCol = response.data.thirdGalleryColumnCollection.items;

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
      <header className='pt-12 pb-8 px-[10px] md:px-6 md:pt-16'>
        {galleryText.map((item) => (
          <div className='w-auto md:w-[75%] lg:w-[50%] flex flex-col gap-4'>
            <h1 className='font-medium text-[32px] md:text-7xl'>
              {item.title}
            </h1>
            <p className='text-lg'>{item.introText}</p>
          </div>
        ))}
      </header>

      <section className='mt-5 mb-8 px-[10px] md:px-6'>
        <div className='flex flex-col gap-6 lg:flex-row flex-wrap'>
          <div className='md:flex-1'>
            {firstCol.map((item) => (
              <GalleryCard
                src={item.image.url}
                alt={item.image.description}
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
                alt={item.image.description}
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
                alt={item.image.description}
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
        <div className='border-y border-black py-8 md:py-12 px-[10px] md:px-6'>
          <div className='w-auto md:w-[50%]'>
            <h3 className='text-2xl font-medium md:text-[56px] pb-2 leading-tight'>
              {item.outroTitle}
            </h3>
            <p>{item.outroText}</p>
          </div>
        </div>
      ))}
    </Layout>
  );
}

const GALLERY_QUERY = `{
  galleryTextCollection {
    items {
      title
      introText
      outroTitle
      outroText
    }
  }
  firstGalleryColumnCollection(order: sys_publishedAt_ASC)  {
    items {
      image {
        url
        description
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
        description
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
        description
      }
      author
      linkText
      linkUrl
      productsUsed
    }
  }
}`;


