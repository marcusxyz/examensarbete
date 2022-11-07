import { CartDetails } from './CartDetails.client';
import { Drawer } from './Drawer.client';

export function CartDrawer({ isOpen, onClose }) {
  return (
    <Drawer open={isOpen} onClose={onClose} heading='Cart' openFrom='right'>
      <div className='grid'>
        <Drawer.Title>
          <p className='sr-only'>Cart Drawer</p>
        </Drawer.Title>
        <CartDetails onClose={onClose} />
      </div>
    </Drawer>
  );
}
