import { Link } from '@shopify/hydrogen';
import { Drawer } from '../Cart/Drawer.client';

export function MenuDrawer({
  isOpen,
  onClose,
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
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      heading='Menu'
      openFrom='right'
      title='Menu'
    >
      <div className='flex flex-col justify-between w-full h-[92vh]'>
        <nav className='grid divide-y divide-black border-b border-black'>
          <Link
            className='font-medium px-[10px] py-4'
            to={navItemLink1}
            onClick={onClose}
          >
            {navItemText1}
          </Link>
          <Link
            className='font-medium px-[10px] py-4'
            to={navItemLink2}
            onClick={onClose}
          >
            {navItemText2}
          </Link>
          <Link
            className='font-medium px-[10px] py-4'
            to={navItemLink3}
            onClick={onClose}
          >
            {navItemText3}
          </Link>
        </nav>
        <div className=''>
          <div className='flex flex-col py-6 gap-4 border-y border-black'>
            <Link className='font-medium px-[10px]' to={socialLink1}>
              {socialText1}
            </Link>
            <Link className='font-medium px-[10px]' to={socialLink2}>
              {socialText2}
            </Link>
            <Link className='font-medium px-[10px]' to={socialLink3}>
              {socialText3}
            </Link>
          </div>
          <button className='font-medium text-sm w-full py-4' onClick={onClose}>
            CLOSE MENU
          </button>
        </div>
      </div>
    </Drawer>
  );
}
