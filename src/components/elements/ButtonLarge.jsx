import { Link } from '@shopify/hydrogen';

export function ButtonLarge({ to, btnName }) {
  return (
    <Link to={to} className='w-auto border border-black px-8 py-6 text-copy'>
      {btnName}
    </Link>
  );
}
