import { Link } from "@shopify/hydrogen";

export function ButtonLarge({ to, btnName }) {
    return (
        <Link to={to} className="w-36 h-14 border border-black px-6 py-3">{btnName}</Link>
    )
}