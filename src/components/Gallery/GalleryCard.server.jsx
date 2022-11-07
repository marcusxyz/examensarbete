import { gql, Image, Link, useShopQuery } from '@shopify/hydrogen';



export default function GalleryCard({ src, alt, name, url, fabric, className }) {

    console.log("Hejsan");


    return (
        <div className={className}>
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
                    <h2 className='lg:text-sm lg:font-medium'>Jonathan Nicholson</h2>
                    <Link to='hej.se' className='text-sm'>nicholsonvisualization.com</Link>
                </div>

                <div className='mt-2.5'>
                    <p className='text-sm'>Using: Fabric 003, Floor 001</p>
                </div>
            </div>
        </div>
    );
}

