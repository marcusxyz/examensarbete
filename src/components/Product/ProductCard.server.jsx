import { Link, Image, Money } from '@shopify/hydrogen';

export default function ProductCard({ product }) {
  const { priceV2: price, compareAtPriceV2: compareAtPrice } =
    product.variants?.nodes[0] || {};

  const isDiscounted = compareAtPrice?.amount > price?.amount;

  return (
    <Link
      to={`products/${product.handle}`}
      className='last:border-r border-black'
    >
      <div className='grid border-b border-black'>
        <div className='relative'>
          {isDiscounted && (
            <label className='subpixel-antialiased absolute top-0 right-0 m-4 text-right text-notice bg-red-600 text-white py-1 px-2 text-xs'>
              Sale
            </label>
          )}
          <Image
            className='aspect-[4/5] overflow-hidden'
            data={product.variants.nodes[0].image}
            alt='Alt Tag'
          />
        </div>
        <div className='grid gap-1 px-6 py-4 '>
          <h3 className='max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis'>
            {product.title}
          </h3>
          <div className='flex gap-4'>
            <span className='max-w-prose whitespace-pre-wrap inherit text-copy flex'>
              $<Money withoutTrailingZeros withoutCurrency data={price} />
              {isDiscounted && (
                <Money
                  className='line-through opacity-50'
                  withoutTrailingZeros
                  withoutCurrency
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
