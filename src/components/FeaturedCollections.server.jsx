import { Link, Image, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';

export default function FeaturedCollections() {
  const {
    data: { collections },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });

  // Här testar jag att visa olika produktkategorier

  return (
    <section className='w-full gap-4 md:gap-8 grid p-[10px] md:p-6'>
      <h2 className='whitespace-pre-wrap max-w-prose font-bold text-lead text-2xl'>
        Categories
      </h2>
      <div className='grid-flow-row grid gap-2 gap-y-6 md:gap-4 false lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false'>
        {collections.nodes.map((collection) => {
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className='grid gap-4'>
                {collection?.image && (
                  <Image
                    className='overflow-clip inline-block aspect-[3/4] md:aspect-[2/3] object-cover'
                    width={'100%'}
                    height={336}
                    alt={`Image of ${collection.title}`}
                    data={collection.image}
                  />
                )}
                <h3 className='whitespace-pre-wrap max-w-prose font-medium text-copy'>
                  {collection.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const QUERY = gql`
  query FeaturedCollections {
    collections(
      first: 6

      query: "collections_type:smart"
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;
