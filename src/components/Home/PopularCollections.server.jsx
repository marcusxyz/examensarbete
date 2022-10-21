import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";

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
        <section className="w-full my-20 px-2">
            <h2 className="text-md">
                POPULAR CATEGORIES
            </h2>
            <div className='mt-10 max-w-md'>
                {collections.nodes.map((collection) => {
                    return (
                        <Link
                            key={collection.id}
                            to={`/collections/${collection.handle}`}
                            className="inline-block after:content-[','] after:mr-2 after:text-black text-4xl font-medium last:after:content-['']"
                        >
                            <span className=''>{collection.title}</span>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

const QUERY = gql`
  query Collections {
    collections(first: 8, sortKey: UPDATED_AT) {
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
