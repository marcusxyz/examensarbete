import { Image, Link } from '@shopify/hydrogen';

export default function GalleryCard({ src, alt, name, url, fabric, btnText }) {
  return (
    <div>
      <Image
        className='overflow-clip inline-block object-cover h-[280px] lg:h-[90%]'
        width={'100%'}
        height={'100%'}
        alt={alt}
        src={src}
        loading='lazy'
      />
      <div className='flex justify-between gap-3 h-[10%]'>
        <div className='mt-2'>
          <h2 className='lg:text-sm lg:font-medium'>{name}</h2>
          <Link to={url} className='text-sm'>
            {btnText}
          </Link>
        </div>

        <div className='mt-2.5'>
          <p className='text-sm'>Using: {fabric}</p>
        </div>
      </div>
    </div>
  );
}