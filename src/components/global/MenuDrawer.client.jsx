import { Drawer } from '../Drawer.client';
import { Link } from '@shopify/hydrogen';

export function MenuDrawer({ isOpen, onClose, menu }) {
    return (
        <Drawer open={isOpen} onClose={onClose} openFrom="right" title="Menu">
            <div className="grid w-full">
                <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
                    {/* Top level menu items */}
                    {(menu?.items || []).map((item) => (
                        <Link key={item.id} to={item.to} target={item.target} onClick={onClose}>
                            {item.title}
                        </Link>
                    ))}
                </nav>
            </div>
        </Drawer>
    );
}

// function MenuMobileNav({ menu, onClose }) {
//     return (
//         <nav className="grid gap-4 p-6 sm:gap-6 sm:px-12 sm:py-8">
//             {/* Top level menu items */}
//             {(menu?.items || []).map((item) => (
//                 <Link key={item.id} to={item.to} target={item.target} onClick={onClose}>
//                     {item.title}
//                 </Link>
//             ))}
//         </nav>
//     );
// }
