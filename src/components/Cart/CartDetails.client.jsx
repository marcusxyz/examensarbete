import {
  useCart,
  useCartLine,
  CartLineProvider,
  CartShopPayButton,
  CartLineQuantityAdjustButton,
  CartLinePrice,
  CartLineQuantity,
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
    <form className='grid grid-cols-1 grid-rows-[1fr_auto] h-[calc(100vh-6rem)]'>
      <section
        aria-labelledby='cart-contents'
        className='px-[10px] pb-4 overflow-auto transition md:px-6'
      >
        <ul className='grid gap-6 md:gap-10 overflow-y-scroll'>
          {lines.map((line) => {
            return (
              <CartLineProvider key={line.id} line={line}>
                <CartLineItem />
              </CartLineProvider>
            );
          })}
        </ul>
      </section>
      <section
        aria-labelledby='summary-heading'
        className='p-[10px] border-t md:px-6'
      >
        <OrderSummary />
        <CartCheckoutActions />
      </section>
    </form>
  );
}

export function CartEmpty() {
  const { cost } = useCart();
  return (
    <div className='h-screen divide-y divide-black'>
      <div className='flex flex-col space-y-7 pt-6 pb-12 md:py-8 px-[10px] md:px-11'>
        <p className='whitespace-prewrap max-w-prose font-medium text-copy'>
          Your shopping cart is empty
        </p>
      </div>
      {/*Use dl, dt, dd for better semantics https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dl */}
      <dl className='space-y-2'>
        <div className='flex items-center justify-between py-6 px-[10px] md:px-11'>
          <dt className='font-medium text-copy uppercase'>Total</dt>
          <dd className='pr-[10px]'>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '0'
            )}
          </dd>
        </div>
      </dl>
    </div>
  );
}
