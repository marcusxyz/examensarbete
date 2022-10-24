import {
  useCart,
  useCartLine,
  CartLineProvider,
  CartLinePrice,
  Image,
  Link,
  Money,
} from '@shopify/hydrogen';

export function CartDetails({ onClose }) {
  const { lines } = useCart();

  if (lines.length === 0) {
    return <CartEmpty onClose={onClose} />;
  }

  return (
    <form className='grid grid-cols-1 grid-rows-[1fr_auto] w-auto divide-y divide-black'>
      <section
        aria-labelledby='cart-contents'
        className='overflow-auto transition'
      >
        <ul className='grid overflow-y-scroll divide-y divide-black'>
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>
      <section aria-labelledby='summary-heading'>
        <OrderSummary />
        <CartCheckoutButton />
      </section>
    </form>
  );
}

// Content and styling for empty cart
export function CartEmpty({ onClose }) {
  return (
    <div className='h-screen divide-y divide-black'>
      <div className='flex flex-col space-y-7 pt-6 pb-16 px-[10px] md:px-11'>
        <p className='whitespace-prewrap max-w-prose font-medium text-copy'>
          Your shopping cart is empty
        </p>
      </div>

      <OrderSummary />
      <button
        onClick={onClose}
        width='full'
        className='inline-block font-medium text-center py-6 px-[10px] md:px-11 max-w-xl leading-none bg-black text-white w-full'
      >
        Continue shopping
      </button>
    </div>
  );
}

function CartCheckoutButton() {
  const { checkoutUrl } = useCart();
  return (
    <>
      <div className='flex flex-col items-center'>
        <Link
          to={checkoutUrl}
          width='full'
          className='inline-block font-medium text-center py-6 px-[10px] md:px-11 max-w-xl leading-none bg-black text-white w-full'
        >
          Go to checkout
        </Link>
      </div>
    </>
  );
}

function OrderSummary() {
  const { cost } = useCart();
  return (
    <>
      {/*Use dl, dt, dd for better semantics https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl */}
      <dl className=''>
        <div className='flex items-center justify-between pt-6 pb-8 px-[10px] md:px-11'>
          <dt className='font-medium text-copy uppercase'>Total</dt>
          <dd className='pr-[10px]'>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '$0'
            )}
          </dd>
        </div>
      </dl>
    </>
  );
}

// Content and styling for cart items
export function CartLineItem() {
  const { linesRemove } = useCart();
  const { id: lineId, merchandise } = useCartLine();
  console.log(merchandise.priceV2.amount);
  const productPrice = merchandise.priceV2.amount;

  return (
    <li key={lineId} className='flex gap-2'>
      <div className='flex-shrink-0'>
        <Image
          data={merchandise.image}
          className='object-cover object-center w-[120px] h-[120px]'
          alt={`Product picture of ${merchandise.product.title}`}
        />
      </div>

      <div className='flex grow items-center justify-start pr-[20px] md:pr-11'>
        <div className='w-full relative grid gap-1'>
          <div className='flex flex-row justify-between'>
            <h3 className='font-medium'>
              <Link to={`/products/${merchandise.product.handle}`}>
                {merchandise.product.title}
              </Link>
            </h3>
            <span>
              {productPrice === '0.0' ? (
                <div>FREE</div>
              ) : (
                <CartLinePrice as='span' />
              )}
            </span>
          </div>

          <div className='flex flex-col justify-start'>
            {(merchandise?.selectedOptions || []).map((option) => (
              <span key={option.name}>{option.value}</span>
            ))}
          </div>

          <div className='flex items-center justify-end gap-2 mt-auto'>
            <button
              type='button'
              onClick={() => linesRemove(lineId)}
              className='flex justify-center items-center underline'
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
