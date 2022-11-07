import { Suspense } from 'react';
import { Seo } from '@shopify/hydrogen';
import secondImg from '/bathroom.png'

// Components
import GalleryCard from '../components/Gallery/GalleryCard.server';
import { Layout } from '../components/Global/Layout.server';

export default function Gallery() {

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
      <header className='mt-8 pb-6 px-2 border-b border-black'>
        <h1 className='text-3xl pb-4'>Gallery</h1>
        <p className='text-lg'>We’re fortunate enough to have gotten to know several very talented arch-viz wizards during our journey. And some of them have even agreed to let us show off some of the great realistic renders they’ve created with our textures.

          So we’re just going to take a step back and let you enjoy the work of these artists.</p>
      </header>

      <section className='mt-5 mb-8 px-3'>
        <div className='mb-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-16 gap-6 md:gap-x-3'>

          <div className='grid lg:row-start-1 lg:col-start-1 lg:row-span-2'>
            <GalleryCard src={secondImg} />
          </div>
          <div className='grid lg:row-start-1 lg:col-start-2 lg:row-span-6'>
            <GalleryCard src={secondImg} />
          </div>
          <div className='grid lg:row-start-1 lg:col-start-3 lg:row-span-6'>
            <GalleryCard src={secondImg} />
          </div>
          <div className='grid lg:row-start-3 lg:col-start-1 lg:row-span-6'>
            <GalleryCard src={secondImg} />
          </div>
          <div className='grid lg:row-start-7 lg:col-start-2 lg:row-span-2'>
            <GalleryCard src={secondImg} />
          </div>
          <div className='grid lg:row-start-7 lg:col-start-3 lg:row-span-4'>
            <GalleryCard src={secondImg} />
          </div>
          <div className='grid lg:row-start-8 lg:col-start-1 lg:row-span-3'>
            <GalleryCard src={secondImg} />
          </div>
          <div className='grid lg:row-start-8 lg:col-start-2 lg:row-span-6'>
            <GalleryCard src={secondImg} />
          </div>
        </div>
      </section>

      <div className='border-t border-black py-5 px-3'>
        <h3 className='text-2xl pb-2'>Arch-viz gurus unite</h3>
        <p>Do you work with visualization? Do you make realistic renders using our high-quality textures? We’re in this together. And we would love to see the fantastic work you create using our textures. Send us your awesome renders, and we might feature you in this gallery or on our social channels.</p>
      </div>

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
