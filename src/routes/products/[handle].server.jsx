import { useRouteParams } from '@shopify/hydrogen';

import { Layout } from '../../components/Layout.server';

export default function Product() {
  const { handle } = useRouteParams();

  return (
    <Layout>
      <section className='py-6'>
        <h1 className='px-[10px] md:px-6'>
          This will be the product page for <strong>{handle}</strong>
        </h1>
      </section>
    </Layout>
  );
}
