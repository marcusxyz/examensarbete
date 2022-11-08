const SPACE_ID = Oxygen.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = Oxygen.env.CONTENTFUL_ACCESS_TOKEN;
const CONTENTFUL_URL = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`;

export const fetchContentfulQuery = async (query) => {
  const response = await fetch(CONTENTFUL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json());

  //   console.log(response);
  return response;
};
