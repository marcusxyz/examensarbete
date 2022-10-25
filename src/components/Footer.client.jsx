import { Link } from '@shopify/hydrogen';


export default function Footer() {

    return (
        <>

            <div className='mt-16 pb-6 text-center border-b border-black'>
                <h2 className='text-5xl'>Texture Supply</h2>
            </div>

            <div className='bg-[#F5F5F5] flex flex-col items-center'>
                <div>
                </div>

                <div className=''>
                    <div className='flex gap-3'>
                        <Link to=''>Instagram</Link>
                        <Link to=''>Facebook</Link>
                        <Link to=''>LinkedIn</Link>
                    </div>

                    <Link to=''>Become a patron</Link>

                    <p>© 2022 Texture Supply</p>
                </div>
            </div>


        </>
    );

}
