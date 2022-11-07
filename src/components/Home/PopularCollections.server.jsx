import { Link, gql, useShopQuery, CacheLong } from '@shopify/hydrogen';
import '../../index.css';

export default function PopularCollections() {
  const {
    data: { collections },
  } = useShopQuery({
    query: QUERY,
    cache: CacheLong(),
  });
  // console.log('💫👾💫 DEBUGGING IN PROGRESS 💫👾💫');
  // console.log(collections.nodes[0]);

  return (
    <section className='w-full py-20 px-[10px] md:px-6 md:py-40'>
      <h2 className='text-md lg:text-xl'>POPULAR CATEGORIES</h2>
      <div className='mt-10 max-w-md md:max-w-lg lg:max-w-3xl xl:max-w-6xl'>
        {collections.nodes.map((collection) => {
          return (
            <Link
              key={collection.id}
              to={`/collections/${collection.handle}`}
              className="inline-block after:content-[',\00a0\00a0'] after:text-black text-4xl lg:text-5xl xl:text-6xl font-medium last:after:content-['']"
            >
              <span className='link link-underline link-underline-black leading-tight'>
                {collection.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const QUERY = gql`
  query Collections {
    collections(first: 8, sortKey: RELEVANCE) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
