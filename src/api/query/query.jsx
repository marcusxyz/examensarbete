import { gql } from '@shopify/hydrogen';

export const GET_CONTENTFUL_QUERY = gql`
query GetContentful {
  heroCollection {
    items {
      title,
      paragraph,
      buttonText,
      buttonLink,
      image {
        url
      }
    }
  },
  inspirationSection1Collection {
    items {
      title,
      subtitle,
      buttonText,
      buttonLink,
      imageTextureName,
      imageTextureLink,
      imageTakenFrom,
      image {
        url
      }
    }
  },
  inspirationSection2Collection {
    items {
      title,
      subtitle,
      buttonText,
      buttonLink,
      paragraph,
      image {
        url
      }
    }
  }
}
`