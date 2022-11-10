import { Link } from '@shopify/hydrogen';

export function ButtonSmall({ to, btnName }) {
  return (
    <Link
      to={to}
      className='self-start border border-black px-6 py-3 md:px-8 md:py-4 font-medium text-sm md:text-base bg-white transition-all hover:bg-black hover:text-white'
    >
      {btnName}
    </Link>
  );
}
