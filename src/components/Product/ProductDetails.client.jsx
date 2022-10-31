import {
  ProductOptionsProvider,
  MediaFile,
  useProductOptions,
  ProductPrice,
  AddToCartButton,
} from '@shopify/hydrogen';

export default function ProductDetails({ product }) {
  return (
    <ProductOptionsProvider data={product}>
      <section className='w-full overflow-x-hidden gap-4 md:gap-8 grid border-b border-black'>
        <div className='grid items-start md:grid-cols-2 lg:grid-cols-3 divide-x divide-black'>
          <div className='grid md:grid-flow-row gap-[1px] md:p-0 md:overflow-x-auto md:grid-cols-2 md:w-full lg:col-span-2 bg-black'>
            <div className='md:col-span-2 snap-center card-image aspect-square md:w-full w-[80vw]'>
              <ProductGallery media={product.media.nodes} />
            </div>
          </div>
          <div className='sticky h-full grid px-[10px] pt-6 md:pt-16 md:px-6 bg-white'>
            <div className='pb-8 md:pb-14'>
              <h1 className='text-[32px] md:text-7xl font-medium whitespace-normal'>
                {product.title}
              </h1>
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
  const { options, selectedVariant } = useProductOptions();

  // console.log(product.variants.nodes[0].priceV2);
  const productPrice = product.variants.nodes[0].priceV2.amount;

  return (
    <form className='grid gap-10'>
      {
        <div className='grid gap-4'>
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className='flex flex-wrap items-baseline justify-start gap-6'
              >
                <legend className='whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]'>
                  {name}
                </legend>
                <div className='flex flex-wrap items-baseline gap-4'>
                  <OptionRadio name={name} values={values} />
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        {productPrice === '0.0' ? (
          <div className='font-semibold'>FREE</div>
        ) : (
          <ProductPrice
            className='text-gray-900 text-lg font-semibold'
            variantId={selectedVariant.id}
            data={product}
          />
        )}
      </div>
      <div className='grid items-stretch gap-4'>
        <PurchaseButton />
      </div>
    </form>
  );
}

function PurchaseButton() {
  const { selectedVariant } = useProductOptions();

  return (
    <>
      <AddToCartButton
        type='button'
        variantId={selectedVariant.id}
        quantity={1}
        accessibleAddingToCartLabel='Adding item to your cart'
      >
        <span className='bg-black text-white inline-block rounded-sm font-medium text-center py-6 max-w-xl leading-none w-full'>
          Add to cart
        </span>
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
              className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${
                checked ? 'border-red' : 'border-neutral-50'
              }`}
            >
              {value}
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
