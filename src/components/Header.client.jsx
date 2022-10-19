import { useUrl, Link, useCart } from '@shopify/hydrogen';
import { Drawer, useDrawer } from './Drawer.client';

export default function Header({ shop }) {
  const { pathname } = useUrl();
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const isHome = pathname === '/';

  return (
    <>
      <Drawer open={isOpen} onClose={closeDrawer}></Drawer>
      <header
        role='banner'
        className='flex items-center h-14 md:h-[86px] p-[10px] md:p-6 sticky z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition border-b border-black text-black bg-white'
      >
        <div className='flex justify-between items-center w-full'>
          <div className=''>
            <Link className='font-medium' to='/'>
              {shop.name}
            </Link>
          </div>
          <div className='flex gap-8'>
            <Link className='font-medium' to='/'>
              Texture
            </Link>
            <Link className='font-medium' to='/'>
              Gallery
            </Link>
            <Link className='font-medium' to='/'>
              About
            </Link>
          </div>
          <button
            onClick={openDrawer}
            className='relative flex items-center justify-center w-8 h-8'
          >
            <IconBag />
            <CartBadge />
          </button>
        </div>
      </header>
    </>
  );
}

function IconBag() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='currentColor'
      className='w-5 h-5'
    >
      <title>Bag</title>
      <path
        fillRule='evenodd'
        d='M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z'
      />
    </svg>
  );
}

function CartBadge() {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    <h2>No items added</h2>;
  } else {
    <div className='text-black bg-white absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w[0.75rem] flex items-center justify-center leading-none text-center w-auto px-[0.125rem] pb-px'>
      <span>{totalQuantity}</span>
    </div>;
  }
}
