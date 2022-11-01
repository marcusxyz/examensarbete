import {
  ProductOptionsProvider,
  MediaFile,
  useProductOptions,
  ProductPrice,
  AddToCartButton,
} from '@shopify/hydrogen';

import { useState } from 'react';

import { Drawer, useDrawer } from '../Cart/Drawer.client';
import { CartDetails } from '../Cart/CartDetails.client';

export default function ProductDetails({ product }) {
  console.log(product);

  return (
    <ProductOptionsProvider data={product}>
      <section className='w-full overflow-x-hidden gap-4 md:gap-8 grid border-b border-black'>
        <div className='grid items-start md:grid-cols-2 lg:grid-cols-3 divide-x divide-black'>
          <div className='grid md:grid-flow-row gap-[1px] md:p-0 md:overflow-x-auto md:grid-cols-2 md:w-full lg:col-span-2 bg-black'>
            <div className='md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw]'>
              <ProductGallery media={product.media.nodes} />
            </div>
          </div>
          <div className='sticky grid px-[10px] pt-6 md:pt-16 md:px-6 bg-white'>
            <div className='pb-8 md:pb-14'>
              <h1 className='text-[32px] md:text-7xl font-medium whitespace-normal'>
                {product.title}
              </h1>
              {/* <h2 className='mt-4 font-medium text-2xl'>{product.vendor}</h2> */}
              <PriceVariants />
            </div>
            <ProductForm product={product} />
            <div className='mt-8'>
              <div
                className='prose border-t border-black pt-6 text-black text-md'
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </ProductOptionsProvider>
  );
}

// Change layout for price and product variants

function ProductForm({ product }) {
  // const { options, selectedVariant } = useProductOptions();
  const { options, selectedVariant } = useProductOptions();

  const productPrice = product.variants.nodes[0].priceV2.amount;
  let price = Math.trunc(productPrice);

  return (
    <form className='grid gap-4'>
      {
        <div className='grid gap-4'>
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div key={name} className='flex flex-col gap-6'>
                <legend className='whitespace-pre-wrap max-w-prose font-bold text-[20px] text-lead min-w-[4rem]'>
                  {name}
                </legend>
                <div className='grid items-baseline gap-2'>
                  <OptionRadio name={name} values={values} />
                </div>
              </div>
            );
          })}
        </div>
      }
      {/* <div>
        {productPrice === '0.0' ? (
          <div className='font-semibold'>FREE</div>
        ) : (
          <ProductPrice
            className='text-gray-900 text-lg font-semibold'
            variantId={selectedVariant.id}
            data={product}
            valueType='min'
          />
        )}
      </div> */}
      <div className='grid items-stretch gap-4'>
        <PurchaseButton />
      </div>
    </form>
  );
}

function PriceVariants() {
  const { selectedVariant } = useProductOptions();

  return (
    <h2 className='mt-4 font-medium text-2xl'>
      ${Math.trunc(selectedVariant.priceV2.amount)}
    </h2>
  );
}

function PurchaseButton() {
  const { selectedVariant } = useProductOptions();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const initialText = 'Add to cart';
  const [buttonText, setButtonText] = useState(initialText);

  function handleClick() {
    setButtonText('Adding to cart...');

    setTimeout(() => {
      setButtonText(initialText);
      openDrawer();
    }, 1000); // change text back after 1 second
  }

  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}>
        <div className='grid'>
          <Drawer.Title>
            <p className='sr-only'>Cart Drawer</p>
          </Drawer.Title>
          <CartDetails onClose={closeDrawer} />
        </div>
      </Drawer>
      <AddToCartButton
        className='bg-black text-white flex items-center py-6 h-14 md:h-[78px] justify-center w-auto font-medium text-xl uppercase rounded-sm text-center  leading-none'
        type='button'
        variantId={selectedVariant.id}
        quantity={1}
        accessibleAddingToCartLabel='Adding item to your cart'
        onClick={handleClick}
      >
        <span>{buttonText}</span>
      </AddToCartButton>
    </>
  );
}

function OptionRadio({ values, name }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();
  return (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;

        // console.log(value);

        return (
          <label key={id} htmlFor={id}>
            <input
              className='sr-only'
              type='radio'
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`flex flex-col leading-none rounded-sm px-6 py-6 border-[2px] bg-[#F5F5F5] cursor-pointer transition-all duration-200 ${
                checked ? 'border-black' : 'border-[#f5f5f5]'
              }`}
            >
              <p className='font-medium'>{value}</p>
            </div>
          </label>
        );
      })}
    </>
  );
}

function ProductGallery({ media }) {
  if (!media.length) {
    return null;
  }

  return (
    <div
      className={`grid gap-[1px] overflow-x-scroll grid-flow-col md:grid-flow-row  md:p-0 md:overflow-x-auto md:grid-cols-2 w-screen md:w-full lg:col-span-2`}
    >
      {media.map((med, i) => {
        let extraProps = {};

        if (med.mediaContentType === 'MODEL_3D') {
          extraProps = {
            interactionPromptThreshold: '0',
            ar: true,
            loading: 'eager',
            disableZoom: true,
          };
        }

        const data = {
          ...med,
          image: {
            ...med.image,
            altText: med.alt || 'Product image',
          },
        };

        return (
          <div
            className={`${
              i % 3 === 0 ? 'md:col-span-1' : 'md:col-span-1'
            } snap-center card-image bg-white aspect-square md:w-full w-[80vw]`}
            key={med.id || med.image.id}
          >
            <MediaFile
              tabIndex='0'
              className={`w-full h-full aspect-square object-cover`}
              data={data}
              options={{
                crop: 'center',
              }}
              {...extraProps}
            />
          </div>
        );
      })}
    </div>
  );
}
