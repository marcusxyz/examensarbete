import { useUrl, Link, useCart, fetchSync, gql } from '@shopify/hydrogen';

// import components
import { Drawer, useDrawer } from './Cart/Drawer.client';
import { CartDetails } from './Cart/CartDetails.client';

export default function Header({ shop }) {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

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
            <Link className='font-medium' to='/textures'>
              Textures
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
            className='relative flex items-center justify-center w-16 h-16'
          >
            <div className='flex items-center justify-center gap-1'>
              <span className='font-medium'>Cart</span>
              {/* <IconBag /> */}
              <CartBadge />
            </div>
          </button>
        </div>
      </header>
    </>
  );
}

function CartBadge() {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return (
      <div className='text-black bg-white font-medium'>
        <span>(0)</span>
      </div>
    );
  }
  return (
    <div className='text-black bg-white font-medium'>
      <span>({totalQuantity})</span>
    </div>
  );
}
