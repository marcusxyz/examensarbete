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

    //Nedan funkar ej

    // const array = collections.nodes.reduce((a, { collection: { nodes } }) => (
    //     [...a, ...nodes.map(({ id }) => id)]
    // ), []);

    // console.log(array);

    return (
        <section className="w-full my-20 px-2">
            <h2 className="text-md">
                POPULAR CATEGORIES
            </h2>
            <div className="mt-10">
                {collections.nodes.map((collection) => {
                    return (
                        <Link key={collection.id} to={`/collections/${collection.handle}`}>
                            <div className="">
                                <h2 className="text-4xl">
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
