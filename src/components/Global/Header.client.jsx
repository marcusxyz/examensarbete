import { useUrl, Link, useCart } from '@shopify/hydrogen';

// import components
import { CartDrawer } from '../Cart/CartDrawer.client';
import { MenuDrawer } from './MenuDrawer.client';
import { useDrawer } from '../Cart/Drawer.client';

export default function Header({
  shop,
  navItemText1,
  navItemLink1,
  navItemText2,
  navItemLink2,
  navItemText3,
  navItemLink3,
  socialLink1,
  socialText1,
  socialLink2,
  socialText2,
  socialLink3,
  socialText3,
}) {
  const {
    isOpen: isCartOpen,
    openDrawer: openCart,
    closeDrawer: closeCart,
  } = useDrawer();
  const {
    isOpen: isMenuOpen,
    openDrawer: openMenu,
    closeDrawer: closeMenu,
  } = useDrawer();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navItemLink1={navItemLink3}
        navItemText1={navItemText3}
        navItemLink2={navItemLink2}
        navItemText2={navItemText2}
        navItemLink3={navItemLink1}
        navItemText3={navItemText1}
        socialLink1={socialLink1}
        socialText1={socialText1}
        socialLink2={socialLink2}
        socialText2={socialText2}
        socialLink3={socialLink3}
        socialText3={socialText3}
      />
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

          <div className='hidden md:flex gap-8'>
            <Link className='font-medium' to={navItemLink3}>
              {navItemText3}
            </Link>
            <Link className='font-medium' to={navItemLink2}>
              {navItemText2}
            </Link>

            <Link className='font-medium' to={navItemLink1}>
              {navItemText1}
            </Link>
          </div>
          <div className='flex items-center gap-4'>
            <button
              onClick={openCart}
              className='relative flex items-center justify-center'
            >
              <div className='flex items-center justify-center gap-1'>
                <span className='hidden md:block font-medium'>Cart</span>
                <IconBag />
                <CartBadge className='block md:hidden' />
              </div>
            </button>
            <button
              onClick={openMenu}
              className='relative flex items-center justify-center md:hidden'
            >
              <IconMenu />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function CartBadge() {
  const { totalQuantity } = useCart();

  if (totalQuantity < 1) {
    return (
      <div className='hidden md:block text-black bg-white font-medium'>
        <span>(0)</span>
      </div>
    );
  }
  return (
    <div className='hidden md:block text-black bg-white font-medium'>
      <span>({totalQuantity})</span>
    </div>
  );
}

function IconMenu() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='black'
      stroke='black'
      className={'w-6 h-6'}
    >
      <title>Menu</title>
      <line x1='3' y1='6.375' x2='17' y2='6.375' strokeWidth='1.25' />
      <line x1='3' y1='10.375' x2='17' y2='10.375' strokeWidth='1.25' />
      <line x1='3' y1='14.375' x2='17' y2='14.375' strokeWidth='1.25' />
    </svg>
  );
}

function IconBag() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      fill='black'
      className={'w-6 h-6 md:hidden'}
    >
      <title>Bag</title>
      <path
        fillRule='evenodd'
        d='M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z'
      />
    </svg>
  );
}
