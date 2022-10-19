import { useUrl, Link, useCart } from "@shopify/hydrogen";
import { Drawer, useDrawer } from "./Drawer.client";
import { CartDetails } from "./CartDetails.client";
import { MenuDrawer } from './global/MenuDrawer.client';

export default function Header({ shop, menu }) {
    const { pathname } = useUrl();
    const { isOpen, openDrawer, closeDrawer } = useDrawer();

    const {
        isOpen: isMenuOpen,
        openDrawer: openMenu,
        closeDrawer: closeMenu,
    } = useDrawer();

    const isHome = pathname === "/";
    return (
        <>

            <MenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menu={menu} />
            <Drawer open={isOpen} onClose={closeDrawer} title="Cart">
                <div className="grid">
                    <CartDetails onClose={closeDrawer} />
                </div>
            </Drawer>
            <header
                role="banner"
                className={`flex items-center h-14 p-4 md:p-8 lg:p-12 sticky backdrop-blur-lg z-40 top-0 justify-between w-full leading-none gap-4 antialiased transition shadow-sm "
                    `}
            >

                <div className="">
                    <Link className="font-bold" to="/">
                        {shop.name}
                    </Link>
                </div>

                <nav className="lg:flex gap-8 hidden">
                    {/* Top level menu items */}
                    {(menu?.items || []).map((item) => (
                        <Link key={item.id} to={item.to} target={item.target}>
                            {item.title}
                        </Link>
                    ))}
                </nav>

                <div className="flex gap-2 lg:hidden">
                    <button
                        onClick={openDrawer}
                        className="relative flex items-center justify-center w-8 h-8"
                    >
                        <IconBag />
                        <CartBadge dark={isHome} />
                    </button>

                    <button onClick={openMenu} className="">
                        <IconMenu />
                    </button>
                </div>
            </header>
        </>
    );
}

function IconBag() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
        >
            <title>Bag</title>
            <path
                fillRule="evenodd"
                d="M8.125 5a1.875 1.875 0 0 1 3.75 0v.375h-3.75V5Zm-1.25.375V5a3.125 3.125 0 1 1 6.25 0v.375h3.5V15A2.625 2.625 0 0 1 14 17.625H6A2.625 2.625 0 0 1 3.375 15V5.375h3.5ZM4.625 15V6.625h10.75V15c0 .76-.616 1.375-1.375 1.375H6c-.76 0-1.375-.616-1.375-1.375Z"
            />
        </svg>
    );
}

function IconMenu() {
    return (
        <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="14" height="1.5" fill="black" />
            <rect y="7" width="14" height="1.5" fill="black" />
        </svg>

    );
}

function CartBadge({ dark }) {
    const { totalQuantity } = useCart();

    if (totalQuantity < 1) {
        return null;
    }
    return (
        <div
            className={`${dark ? "text-black bg-white" : "text-white bg-black"
                } absolute bottom-1 right-1 text-[0.625rem] font-medium subpixel-antialiased h-3 min-w-[0.75rem] flex items-center justify-center leading-none text-center rounded-full w-auto px-[0.125rem] pb-px`}
        >
            <span>{totalQuantity}</span>
        </div>
    );
}
