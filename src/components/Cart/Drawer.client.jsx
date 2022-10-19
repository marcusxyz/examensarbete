import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

/**
 * Docs https://headlessui.com/
 * A Drawer component that opens on user click.
 * @param open - Boolean state. If `true`, then the drawer opens.
 * @param onClose - Function should set the open state.
 * @param children - React children node.
 */

function Drawer({ open, onClose, children }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 left-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='fixed inset-y-0 right-0 flex max-w-full pl-0 md:pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-300 sm:duration-500'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-300 sm:duration-500'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                {/* Dialog is for building custom modals. Below is for our Cart modal. */}
                <Dialog.Panel className='max-w-lg transform text-left align-middle shadow-xl transition-all antialiased bg-neutral-50'>
                  <header className='sticky w-96 px-[10px] md:w-104 h-14 md:h-[86px] border-b border-black flex items-center justify-between md:px-11'>
                    <h2
                      id='cart-contents'
                      className='whitespace-pre-wrap max-w-prose font-medium text-copy'
                    >
                      Cart
                    </h2>
                    <button
                      type='button'
                      className='p-[10px] md:p-0 transition text-primary hover:text-primary/50'
                      onClick={onClose}
                    >
                      <IconClose aria-label='Close panel' />
                    </button>
                  </header>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export { Drawer };

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}

function IconClose() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 20 20'
      className='w-5 h-5'
    >
      <title>Close</title>
      <line
        x1='4.44194'
        y1='4.30806'
        x2='15.7556'
        y2='15.6218'
        stroke='currentColor'
        strokeWidth='1.25'
      />
      <line
        y1='-0.625'
        x2='16'
        y2='-0.625'
        transform='matrix(-0.707107 0.707107 0.707107 0.707107 16 4.75)'
        stroke='currentColor'
        strokeWidth='1.25'
      />
    </svg>
  );
}
