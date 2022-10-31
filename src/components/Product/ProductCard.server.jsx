import { Link, Image, Money } from '@shopify/hydrogen';

export default function ProductCard({ product }) {
  const { priceV2: price } = product.variants?.nodes[0] || {};

  // console.log(amount);
  const amount = price?.amount;
  const alternativeImage = product.variants.nodes[0];
  // console.log(alternativeImage);

  return (
    <Link to={`products/${product.handle}`} className='group'>
      <div className='grid '>
        <div className='relative overflow-hidden'>
          <Image
            className='aspect-[4/5] scale-100 group-hover:scale-[1.02] transition-transform duration-[600ms] ease-in-out'
            data={product.variants.nodes[0].image}
            alt={`Product image of ${product.title}`}
            loading='lazy'
          />
        </div>
        <div className='grid gap-1 px-6 py-4 bg-white shadow-[0_0_0_1px_black]'>
          <h3 className='font-medium max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis group-hover:underline'>
            {product.title}
          </h3>
          <div className='flex gap-4'>
            {amount === '0.0' ? (
              <span className='text-2xl font-medium max-w-prose whitespace-pre-wrap inherit text-copy flex'>
                Free
              </span>
            ) : (
              <span className='text-2xl font-medium max-w-prose whitespace-pre-wrap inherit text-copy flex'>
                $<Money withoutTrailingZeros withoutCurrency data={price} />
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
