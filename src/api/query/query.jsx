import { gql } from '@shopify/hydrogen';

export const GET_CONTENTFUL_QUERY = gql`
query GetContentful {
  heroCollection {
    items {
      title
      paragraph
      buttonText
      buttonLink
      media {
        url
      }
    }
  }
  footerCollection {
    items {
      logo {
        url
      },
      socialName1
      socialLink1
      socialName2
      socialLink2
      socialName3
      socialLink3
      getCustomerButtonName
      getCustomerButtonLink
      copyright
    }
  }
  inspirationSection1Collection {
    items {
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
  }
  inspirationSection2Collection {
    items {
      title
      subtitle
      buttonText
      buttonLink
      paragraph
      image {
        url
      }
    }
  }
  navigationCollection(order: sys_firstPublishedAt_DESC) {
    items {
      linkText
      linkUrl
    }
  }
  about(id: "3nEO1ZTk7pI0AV8GDanIny") {
    title
    introText
    image {
      url
    }
    paragraph {
      json
    }
  },
  galleryCardCollection (order: sys_firstPublishedAt_DESC) {
    items {
      name,
      altText,
      fabric,
      title,
      link,
      buttonText,
      image {
        url
      },
    }
  },
  galleryTextCollection {
    items {
      title,
      introText,
      outroTitle,
      outroText
    }
  }
}
`;
