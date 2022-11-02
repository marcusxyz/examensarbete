import { Suspense } from 'react';
import { useShopQuery, CacheLong, gql, Seo } from '@shopify/hydrogen';
import { useContentfulQuery } from '../api/useContentfulQuery';

// Components
import { Layout } from '../components/Layout.server';
import Hero from '../components/Home/Hero.server';
import Bestsellers from '../components/Home/Bestsellers.server';
import PopularCollections from '../components/Home/PopularCollections.server';
import ExploreSection from '../components/Home/ExploreSection.server';

export default function Home() {
  const { data: homePageData } = useContentfulQuery({
    query: HOMEPAGE_QUERY,
    preload: true,
  });

  // console.log('💫👾💫 DEBUGGING IN HOMEPAGE 💫👾💫');
  // console.log(homePageData);

  console.log('💫 HERO DATA 💫');
  console.log(homePageData.hero);
  const heroTitle = homePageData.hero.title;
  const paragraph = homePageData.hero.paragraph;

  console.log('💫 EXPLORE DATA 💫');
  console.log(homePageData.hero);
  const exploreTitle = homePageData.inspirationSection1.title;

  const {
    data: { seo },
  } = useShopQuery({
    query: SEO_QUERY,
    cache: CacheLong(),
    preload: true,
  });
  return (
    <Layout>
      <Suspense>
        <Seo type='homepage' data={seo} />
      </Suspense>
      <Suspense fallback={`Loading content...`}>
        <Hero sectionTitle={heroTitle} paragraph={paragraph} />
        <Bestsellers />
        <PopularCollections />
        <ExploreSection sectionTitle={exploreTitle} />
      </Suspense>
    </Layout>
  );
}

const SEO_QUERY = gql`
  query seo {
    shop {
      name
      description
    }
  }
`;

const HOMEPAGE_QUERY = gql`
  query GetHomePageContent {
    hero(id: "Pc3BhSyg4U69g0xxfvYBb") {
      title
      paragraph
      buttonText
      buttonLink
      image {
        url
      }
    }
    inspirationSection1(id: "2khCWARN7L6IiNvhWUmqVq") {
      title
      subtitle
      buttonText
      buttonLink
      imageTextureName
      imageTextureLink
      imageTakenFrom
      image {
        url
      }
    }
    # navigation(id: "48skrxEMPcmg6HHkpuJ8CZ") {
    #   linkText
    #   linkUrl
    # }
  }
`;
