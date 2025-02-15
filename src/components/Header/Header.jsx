import {Logo, LogoutBtn} from "../";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux"
// import { useNavigate } from "react-router-dom";

function Header(){
    const authStatus = useSelector((state)=> state.auth.status);
    // const navigate = useNavigate();
    const navItems = [
        {
           name: 'Home', 
           slug: '/',
           active: true
        },
        {
            name: 'Login', 
           slug: '/login',
           active: !authStatus
        },
        {
            name: 'Signup', 
           slug: '/signup',
           active: !authStatus
        },
        {
            name: 'Add Post', 
           slug: '/add-post',
           active: authStatus
        },
        {
            name: 'All Post', 
           slug: '/all-post',
           active: authStatus
        },
        

    ]

    return(
    // <header className="font-medium flex max-w-7xl items-center justify-between">
    //     <Link to="/">
    //         <Logo/>
    //     </Link>
    //     <nav>
    //         <div className="flex gap-4">
    //             {navItems.map((item)=>(
    //                 item.active? <Link key={item.name} to={item.slug}>{item.name}</Link>: null
    //             ))}
    //             {authStatus && <LogoutBtn/>}
    //         </div>
    //     </nav>
    // </header>
//     <header className="font-medium flex max-w-7xl items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800 fixed w-full top-0 z-50">
//     <Link to="/" className="hover:opacity-80 transition-opacity">
//         <Logo className="h-7 w-auto invert"/> {/* Reduced from h-8 */}
//     </Link>
//     <nav>
//         <div className="flex gap-4 items-center"> {/* Reduced gap from 6 */}
//             {navItems.map((item) => (
//                 item.active && 
//                 <Link 
//                     key={item.name} 
//                     to={item.slug}
//                     className="text-gray-400 hover:text-white transition-colors duration-200 font-medium text-xs uppercase tracking-wide" 
//                     // Reduced: text-sm→xs, tracking-wider→wide
//                 >
//                     {item.name}
//                 </Link>
//             ))}
//             {authStatus && 
//                 <div className="ml-3 pl-3 border-l border-gray-800"> {/* Reduced spacing */}
//                     <LogoutBtn className="text-red-400 hover:text-red-300 transition-colors px-2.5 py-1 rounded-md bg-gray-800/40 hover:bg-gray-800 text-sm" />
//                     {/* Reduced padding and rounded corners */}
//                 </div>
//             }
//         </div>
//     </nav>
// </header>
// <header className="font-medium flex max-w-7xl items-center justify-between py-4 px-6 bg-gray-700 text-white shadow-md">
//     <Link to="/" className="text-2xl font-bold">
//         {/* Assuming Logo component renders an SVG or image that fits well with a dark background */}
//         <Logo />
//     </Link>
//     <nav>
//         <div className="flex gap-6 items-center"> {/* Increased gap for better spacing, aligned items vertically */}
//             {navItems.map((item) => (
//                 item.active ? (
//                     <Link 
//                         key={item.name} 
//                         to={item.slug}
//                         className="hover:text-gray-300 transition-colors duration-200" // Added hover effect
//                     >
//                         {item.name}
//                     </Link>
//                 ) : null
//             ))}
//             {authStatus && <LogoutBtn />}
//         </div>
//     </nav>
// </header> 
<header className="font-medium flex max-w-7xl items-center justify-between mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white border-b border-gray-100">
<Link to="/" className="group hover:opacity-90 transition-opacity">
    <Logo className="h-7 w-auto text-gray-900" /> {/* Assuming Logo component can render a gray logo */}
</Link>
<nav>
    <div className="flex gap-6 items-center">
        {navItems.map((item) => (
            item.active && 
            <Link 
                key={item.name} 
                to={item.slug}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-300 font-medium text-sm uppercase tracking-wide relative group"
            >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
        ))}
        {authStatus && 
            <div className="ml-4 pl-4 border-l border-gray-200">
                <LogoutBtn className="bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md" />
            </div>
        }
    </div>
</nav>
</header>


    )
}

export default Header;