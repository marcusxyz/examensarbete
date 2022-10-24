import { Link } from '@shopify/hydrogen';

export function ButtonSmall({ to, btnName }) {
    return (
        <Link to={to} className='w-auto border border-black px-5 py-3 text-md'>
            {btnName}
        </Link>
    );
}
