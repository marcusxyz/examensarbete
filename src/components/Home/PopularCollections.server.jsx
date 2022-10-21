import { Link, Image, gql, useShopQuery, CacheLong } from "@shopify/hydrogen";

export default function PopularCollections() {
    const {
        data: { collections },
    } = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
    });
    console.log('💫👾💫 DEBUGGING IN PROGRESS 💫👾💫');
    console.log(collections.nodes[0]);
    return (
        <section className="w-full">
            <h2 className="whitespace-pre-wrap max-w-prose text-lead">
                POPULAR CATEGORIES
            </h2>
            <div className="">
                {collections.nodes.map((collection) => {
                    return (
                        <Link key={collection.id} to={`/collections/${collection.handle}`}>
                            <div className="">
                                <h2 className="">
                                    {collection.title}
                                </h2>
                            </div>
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
