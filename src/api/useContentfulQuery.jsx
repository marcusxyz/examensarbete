import { useQuery } from '@shopify/hydrogen';

const SPACE_ID = Oxygen.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = Oxygen.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

export const useContentfulQuery = ({ query, variables, key = [] }) => {
  const { data } = useQuery(key, async () => {
    const response = await fetch(CONTENTFUL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    });
    return response.json();
  });

  return data;
};
