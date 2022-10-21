import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';

export default function GetCollection() {
  const {
    data: { collection },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  return (
    <section className='w-full gap-4 md:gap-8 grid p-6 md:p-8 lg:p-12'>
      <div className='grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false'>
        <Link key={collection.id} to={`/${collection.handle}`}>
          <div className='grid gap-4'>
            <h2 className='whitespace-pre-wrap max-w-prose font-medium text-copy'>
              See our {collection.handle}
            </h2>
          </div>
        </Link>
      </div>
    </section>
  );
}
const QUERY = gql`
  query GetCollection {
    collection(handle: "textures") {
      title
      handle
      products(first: 50) {
        edges {
          node {
            handle
          }
        }
      }
    }
  }
`;
