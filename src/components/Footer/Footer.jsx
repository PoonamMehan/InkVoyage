import {TaglineLogo} from "../index.js"
function Footer() {
  return (
    // <div className="max-w-7xl mx-auto flex font-inter justify-between">
    //     <div className="inline-block items-center"><TaglineLogo/></div>
    //     <div className="flex font-medium text-[#474747]">
    //         <div className="flex flex-col">
    //             <div className="font-semibold text-black">Company</div>
    //             <div>Features</div>
    //             <div>Pricing</div>
    //             <div>Affiliate Program</div>
    //             <div>Press Kit</div>
    //         </div>
    //         <div className="flex flex-col">
    //             <div className="font-semibold text-black">Support</div>
    //             <div>Account</div>
    //             <div>Help</div>
    //             <div>Contact Us</div>
    //             <div>Customer Support</div>
    //         </div>
    //         <div className="flex flex-col">
    //             <div className="font-semibold text-black">Legals</div>
    //             <div>Terms & Conditions</div>
    //             <div>Privacy Policy</div>
    //             <div>Licensing</div>
    //         </div>
    //         </div>        
    // </div>
    
    
<footer className="bg-white text-gray-700 py-12 border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start"> {/* Align items to start */}
        <div className="mb-6 md:mb-0">
            <TaglineLogo className="text-gray-700"/>
        </div>

        <div className="flex flex-col md:flex-row gap-12"> {/* Increased gap */}
            <div>
                <h6 className="font-semibold text-gray-900 mb-4">Company</h6>
                <ul className="text-sm">
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Features</a></li> {/* Increased margin */}
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Pricing</a></li>
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Affiliate Program</a></li>
                    <li className="hover:text-blue-500 transition-colors duration-200"><a href="#">Press Kit</a></li>
                </ul>
            </div>

            <div>
                <h6 className="font-semibold text-gray-900 mb-4">Support</h6>
                <ul className="text-sm">
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Account</a></li>
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Help</a></li>
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Contact Us</a></li>
                    <li className="hover:text-blue-500 transition-colors duration-200"><a href="#">Customer Support</a></li>
                </ul>
            </div>

            <div>
                <h6 className="font-semibold text-gray-900 mb-4">Legals</h6>
                <ul className="text-sm">
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Terms & Conditions</a></li>
                    <li className="mb-3 hover:text-blue-500 transition-colors duration-200"><a href="#">Privacy Policy</a></li>
                    <li className="hover:text-blue-500 transition-colors duration-200"><a href="#">Licensing</a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>

  )
}

export default Footer;