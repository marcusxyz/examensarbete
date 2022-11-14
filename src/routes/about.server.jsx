import { Suspense } from 'react';
import { Seo, Image } from '@shopify/hydrogen';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';

// Components
import { Layout } from '../components/Global/Layout.server';
import { fetchContentfulQuery } from '../api/fetchContentfulQuery';

export default function About() {
  const about = response.data.aboutCollection.items;


  // Style Rich Text from Contenful
  const RICHTEXT_OPTIONS = {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <h2 className='text-2xl md:text-3xl xl:text-5xl pb-4 font-medium'>
            {children}
          </h2>
        );
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return (
          <h3 className='text-lg md:text-2xl xl:text-3xl pb-2 font-medium'>
            {children}
          </h3>
        );
      },
      [BLOCKS.HEADING_4]: (node, children) => {
        return (
          <h4 className='pb-2 pl-6 font-medium md:text-lg xl:text-2xl'>
            {children}
          </h4>
        );
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <p className='pb-6 md:text-lg xl:text-base'>{children}</p>;
      },
      [BLOCKS.HEADING_5]: (node, children) => {
        return (
          <p className='text-sm md:text-base xl:text-copy pb-6 pl-6'>
            {children}
          </p>
        );
      },
    },
  };

  return (
    <Layout>
      <Suspense>
        <Seo
          type='page'
          data={{
            title: 'About',
          }}
        />
      </Suspense>
      <header className='px-[10px] pb-8 md:pb-12 md:px-6 pt-12 md:pt-16 lg:w-[924px] m-auto'>
        {about.map((item) => (
          <div>
            <h1 className='text-[32px] md:text-5xl lg:text-7xl mb-2 md:mb-6 font-medium leading-normal'>
              {item.title}
            </h1>
            {documentToReactComponents(item.introText.json, RICHTEXT_OPTIONS)}
          </div>
        ))}
      </header>
      <main className='border-b border-black px-[10px] md:px-6 pb-12 md:pb-16'>
        {about.map((item) => (
          <div>
            <div className='w-full h-[80vw] m-auto lg:w-[1024px] lg:h-[640px] object-cover overflow-hidden'>
              <video className='w-full object-contain' autoPlay muted loop>
                <source src={item.media.url} type='video/mp4' />
              </video>
            </div>

            <div className='pt-12 lg:w-[924px] m-auto'>
              {documentToReactComponents(item.paragraph.json, RICHTEXT_OPTIONS)}
            </div>
          </div>
        ))}
      </main>
    </Layout>
  );
}

const ABOUT_QUERY = `{
  aboutCollection {
    items {
      title,
      introText {
        json
      }
      altText,
      media {
        url
      },
      paragraph {
        json
      }
    }
    }
}`;

