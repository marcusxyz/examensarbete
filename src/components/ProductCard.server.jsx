import { Link, Image, Money } from '@shopify/hydrogen';

export default function ProductCard({ product }) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link to={`products/${product.handle}`}>
      <div className=''>
        <div className='relative bg-blue-300'>
          {isDiscounted && (
            <label className='subpixel-antialiased top-0 right-0 m-4 text-right text-notice text-red-600 text-xs'></label>
          )}
          <Image
            className='aspect-[3/4] md:aspect-[2/3] object-cover'
            data={product.variants.nodes[0].image}
            alt={`Virtual product of a ${product.title}`}
          />
        </div>
        <div className='grid gap-1 px-6 py-4 bg-red-300'>
          <h3 className='max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis'>
            {product.title}
          </h3>
          <div className='flex gap-4'>
            <span className='max-w-prose whitespace-pre-wrap inherit text-copy flex gap-4'>
              <Money withoutTrailingZeros data={price} />
              {isDiscounted && (
                <Money
                  className='line-through opacity-50'
                  withoutTrailingZeros
                  data={compareAtPrice}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
