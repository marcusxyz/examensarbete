import { Link } from '@shopify/hydrogen';


export default function Footer() {

    const marqueeStyle = `
    mx-2 font-medium lg:mx-4 text-2xl lg:text-4xl xl:text-6xl after:content-['/'] after:pl-2 lg:after:pl-4
    `
    return (
        <>

            <div className='mt-16 pb-6 text-center'>
                <h2 className='text-6xl md:text-[115px] lg:text-[160px] xl:text-[230px]'>Texture Supply</h2>
            </div>

            <div className='bg-[#F5F5F5] w-full'>
                <div className="relative flex overflow-x-hidden">
                    <div className="py-12 animate-marquee whitespace-nowrap">
                        <span className={marqueeStyle}>Floor</span>
                        <span className={marqueeStyle}>Carpet </span>
                        <span className={marqueeStyle}>Wood </span>
                        <span className={marqueeStyle}>Fabric </span>
                        <span className={marqueeStyle}>Leather </span>
                        <span className={marqueeStyle}>Floor </span>
                        <span className={marqueeStyle}>Carpet </span>
                        <span className={marqueeStyle}>Wood </span>
                        <span className={marqueeStyle}>Fabric </span>
                        <span className={marqueeStyle}>Leather </span>
                    </div>

                    <div className="absolute top-0 py-12 animate-marquee2 whitespace-nowrap">
                        <span className={marqueeStyle}>Floor </span>
                        <span className={marqueeStyle}>Carpet </span>
                        <span className={marqueeStyle}>Wood </span>
                        <span className={marqueeStyle}>Fabric </span>
                        <span className={marqueeStyle}>Leather </span>
                        <span className={marqueeStyle}>Floor </span>
                        <span className={marqueeStyle}>Carpet </span>
                        <span className={marqueeStyle}>Wood </span>
                        <span className={marqueeStyle}>Fabric </span>
                        <span className={marqueeStyle}>Leather </span>
                    </div>
                </div>

                <div className='grid grid-col-1 lg:grid-cols-3 gap-6 lg:gap-48 xl:gap-96 justify-items-center py-8 border-t border-black'>
                    <div className='flex gap-8 lg:col-start-2'>
                        <Link to='' className='font-medium'>Instagram</Link>
                        <Link to='' className='font-medium'>Facebook</Link>
                        <Link to='' className='font-medium'>LinkedIn</Link>
                    </div>

                    <Link to='' className='font-medium lg:col-start-3'>Become a patron</Link>

                    <p className='font-medium lg:col-start-1 lg:row-start-1'>© 2022 Texture Supply</p>
                </div>
            </div>


        </>
    );

}
