import { Suspense } from 'react';
import { Seo, Image } from '@shopify/hydrogen';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types'

// Components
import { Layout } from '../components/Layout.server';
import { useContentfulQuery } from '../api/useContentfulQuery';
import { GET_CONTENTFUL_QUERY } from '../api/query/query';

export default function About() {

    const { data: contentfulData } = useContentfulQuery({
        query: GET_CONTENTFUL_QUERY,
    });

    const title = contentfulData.about.title;
    const introText = contentfulData.about.introText;
    const image = contentfulData.about.image.url;

    // console.log(documentToReactComponents("content"));

    console.log('ABOUT PAGE!');

    const RICHETXT_OPTIONS = {
        renderNode: {
            [BLOCKS.HEADING_2]: (node, children) => {
                return <h2 className='text-2xl md:text-3xl xl:text-5xl pb-4 font-medium'>{children}</h2>
            },
            [BLOCKS.HEADING_3]: (node, children) => {
                return <h3 className='text-lg md:text-2xl xl:text-3xl pb-2 font-medium'>{children}</h3>
            },
            [BLOCKS.HEADING_4]: (node, children) => {
                return <h4 className='pb-2 pl-6 font-medium md:text-lg xl:text-2xl'>{children}</h4>
            },
            [BLOCKS.PARAGRAPH]: (node, children) => {
                return <p className='mb-6 md:text-lg xl:text-xl'>{children}</p>
            },
            [BLOCKS.HEADING_5]: (node, children) => {
                return <p className='text-sm md:text-base xl:text-xl pb-6 pl-6'>{children}</p>
            }
        }
    }

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
            <header className='px-2 lg:px-48 xl:px-80 mt-8'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4'>
                    {title}
                </h1>
                <p className='mb-8 md:text-lg xl:text-xl'>{introText}</p>
            </header>
            <main className='border-t border-black '>
                <div>
                    <Image
                        className='pt-8 px-2 overflow-clip inline-block object-cover h-[375px] lg:h-[500px]'
                        width={'100%'}
                        height={'100%'}
                        alt={`Image of bathtub with big glas windows behind`}
                        src={image}
                        loading='lazy'
                    />
                </div>
                <div className='mt-12 px-2 lg:px-48 xl:px-80'>
                    {documentToReactComponents(contentfulData.about.paragraph.json, RICHETXT_OPTIONS)}
                </div>
            </main>
        </Layout>
    );
}

