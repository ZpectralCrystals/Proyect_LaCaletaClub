import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotdog, faBurger, faUtensils, faCheese, faWineGlassEmpty, faIceCream, faBookmark,faCertificate } from '@fortawesome/free-solid-svg-icons';


const Menu: React.FC = () => {
  return (
    <main className='bg-[#f7f6f2]'>
      <div className='flex py-12 justify-around' id='container'>
        <ul className='flex flex-row gap-10'>
          <li className="text-center relative group ">
            <div className="text-xl text-brown-700 group-hover:text-red-700 relative z-10 bg-[#f7f6f2]">
              <FontAwesomeIcon icon={faHotdog} />
            </div>
            <div className="text-lg font-medium text-gray-800 group-hover:text-red-700 bg-[#f7f6f2] border-b border-gray-300 py-3 w-full relative z-10">
              Desayuno
            </div>
            <div className="absolute left-0 right-0 bottom-[-30px] text-[#a1bd57] group-hover:text-red-700 group-hover:translate-y-[20px] transition-transform duration-[300ms] ease-in-out z-0">
              <FontAwesomeIcon icon={faBookmark} style={{ width: "100%", height: "60px" }} />
            </div>
          </li>
          <li className="text-center relative group ">
            <div className="text-xl text-brown-700 group-hover:text-red-700 relative z-10 bg-[#f7f6f2]">
              <FontAwesomeIcon icon={faBurger} />
            </div>
            <div className="text-lg font-medium text-gray-800 group-hover:text-red-700 bg-[#f7f6f2] border-b border-gray-300 py-3 w-full relative z-10">
              Almuerzo
            </div>
            <div className="absolute left-0 right-0 bottom-[-30px] text-[#a1bd57] group-hover:text-red-700 group-hover:translate-y-[20px] transition-transform duration-[300ms] ease-in-out z-0">
              <FontAwesomeIcon icon={faBookmark} style={{ width: "100%", height: "60px" }} />
            </div>
          </li>
          <li className="text-center relative group ">
            <div className="text-xl text-brown-700 group-hover:text-red-700 relative z-10 bg-[#f7f6f2]">
              <FontAwesomeIcon icon={faUtensils} />
            </div>
            <div className="text-lg font-medium text-gray-800 group-hover:text-red-700 bg-[#f7f6f2] border-b border-gray-300 py-3 w-full relative z-10">
              Cena
            </div>
            <div className="absolute left-0 right-0 bottom-[-30px] text-[#a1bd57] group-hover:text-red-700 group-hover:translate-y-[20px] transition-transform duration-[300ms] ease-in-out z-0">
              <FontAwesomeIcon icon={faBookmark} style={{ width: "100%", height: "60px" }} />
            </div>
          </li>
          <li className="text-center relative group ">
            <div className="text-xl text-brown-700 group-hover:text-red-700 relative z-10 bg-[#f7f6f2]">
              <FontAwesomeIcon icon={faCheese} />
            </div>
            <div className="text-lg font-medium text-gray-800 group-hover:text-red-700 bg-[#f7f6f2] border-b border-gray-300 py-3 w-full relative z-10">
              Postres
            </div>
            <div className="absolute left-0 right-0 bottom-[-30px] text-[#a1bd57] group-hover:text-red-700 group-hover:translate-y-[20px] transition-transform duration-[300ms] ease-in-out z-0">
              <FontAwesomeIcon icon={faBookmark} style={{ width: "100%", height: "60px" }} />
            </div>
          </li>
          <li className="text-center relative group ">
            <div className="text-xl text-brown-700 group-hover:text-red-700 relative z-10 bg-[#f7f6f2]">
              <FontAwesomeIcon icon={faWineGlassEmpty} />
            </div>
            <div className="text-lg font-medium text-gray-800 group-hover:text-red-700 bg-[#f7f6f2] border-b border-gray-300 py-3 w-full relative z-10">
              Bebidas
            </div>
            <div className="absolute left-0 right-0 bottom-[-30px] text-[#a1bd57] group-hover:text-red-700 group-hover:translate-y-[20px] transition-transform duration-[300ms] ease-in-out z-0">
              <FontAwesomeIcon icon={faBookmark} style={{ width: "100%", height: "60px" }} />
            </div>
          </li>
          <li className="text-center relative group ">
            <div className="text-xl text-brown-700 group-hover:text-red-700 relative z-10 bg-[#f7f6f2]">
              <FontAwesomeIcon icon={faIceCream} />
            </div>
            <div className="text-lg font-medium text-gray-800 group-hover:text-red-700 bg-[#f7f6f2] border-b border-gray-300 py-3 w-full relative z-10">
              Helados
            </div>
            <div className="absolute left-0 right-0 bottom-[-30px] text-[#a1bd57] group-hover:text-red-700 group-hover:translate-y-[20px] transition-transform duration-[300ms] ease-in-out z-0">
              <FontAwesomeIcon icon={faBookmark} style={{ width: "100%", height: "60px" }} />
            </div>
          </li>
        </ul>
      </div>
      <div className='flex flex-col mx-auto py-12 w-[60%]'>
        <div className="text-[#a1bd57] flex flex-col gap-10 border-b border-gray-300 py-3">
          Desayuno
        </div>
        <div className='flex flex-row gap-1'>
          <div className='w-[50%] flex flex-col '>
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
          </div>
          <div className='w-[50%] flex flex-col '>
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col mx-auto py-12 w-[60%]'>
        <div className="text-[#a1bd57] flex flex-col gap-10 border-b border-gray-300 py-3">
          Almuerzo
        </div>
        <div className='flex flex-row gap-1'>
          <div className='w-[50%] flex flex-col '>
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
          </div>
          <div className='w-[50%] flex flex-col '>
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-5 group'>
              <div className="relative w-[237px] h-auto content-center">
                <span className="absolute top-6 left-0 z-0 h-[100px] w-[100px] rotate-7 border-1 bg-[#dad6cf] border-[#c2b59d]"></span>
                <img src="menu.jpg" alt="" className="relative z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d]"/>
              </div>
              <div>
                <div className='flex flex-row pb-2 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                  <div className="relative">
                    <FontAwesomeIcon icon={faCertificate} className="text-[#a1bd57] group-hover:text-[#a44823]" style={{ width: "60px", height: "50px" }}/>
                    <p className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
                      25.00
                    </p>
                  </div>

                </div>
                <div className='py-2'>
                  Roin a bibendum nibh. Nunc fermentum sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col mx-auto py-12 w-[60%]'>
        <div className="text-[#a1bd57] flex flex-col gap-10 border-b border-gray-300 py-3">
          Helados
        </div>
        <div className='flex flex-row gap-5'>
          <div className='w-[50%] flex flex-col'>
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-3 group'>
              <div className=" w-[140px] h-auto content-center ">
                <img src="menu.jpg" alt="" className=" z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d] rounded-full group-hover:rounded-none"/>
              </div>
              <div>
                <div className='flex flex-row pb-1 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                </div>
                <div className='py-2'>
                  Sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis
                </div>
              </div>
              <div>
                <p className="flex items-center justify-center font-bold text-sm text-[#a1bd57]">
                  25.00
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-3 group'>
              <div className=" w-[140px] h-auto content-center ">
                <img src="menu.jpg" alt="" className=" z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d] rounded-full group-hover:rounded-none"/>
              </div>
              <div>
                <div className='flex flex-row pb-1 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                </div>
                <div className='py-2'>
                  Sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis
                </div>
              </div>
              <div>
                <p className="flex items-center justify-center font-bold text-sm text-[#a1bd57]">
                  25.00
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-3 group'>
              <div className=" w-[140px] h-auto content-center ">
                <img src="menu.jpg" alt="" className=" z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d] rounded-full group-hover:rounded-none"/>
              </div>
              <div>
                <div className='flex flex-row pb-1 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                </div>
                <div className='py-2'>
                  Sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis
                </div>
              </div>
              <div>
                <p className="flex items-center justify-center font-bold text-sm text-[#a1bd57]">
                  25.00
                </p>
              </div>
            </div>
          </div>
          <div className='w-[50%] flex flex-col'>
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-3 group'>
              <div className=" w-[140px] h-auto content-center ">
                <img src="menu.jpg" alt="" className=" z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d] rounded-full group-hover:rounded-none"/>
              </div>
              <div>
                <div className='flex flex-row pb-1 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                </div>
                <div className='py-2'>
                  Sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis
                </div>
              </div>
              <div>
                <p className="flex items-center justify-center font-bold text-sm text-[#a1bd57]">
                  25.00
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-3 group'>
              <div className=" w-[140px] h-auto content-center ">
                <img src="menu.jpg" alt="" className=" z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d] rounded-full group-hover:rounded-none"/>
              </div>
              <div>
                <div className='flex flex-row pb-1 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                </div>
                <div className='py-2'>
                  Sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis
                </div>
              </div>
              <div>
                <p className="flex items-center justify-center font-bold text-sm text-[#a1bd57]">
                  25.00
                </p>
              </div>
            </div>
            <div className="border-t border-gray-300 my-3" />
            <div className='flex py-5 w-full my-[21px] mx-[6px] gap-3 group'>
              <div className=" w-[140px] h-auto content-center ">
                <img src="menu.jpg" alt="" className=" z-10  p-1 border-1 bg-[#dad6cf] border-[#c2b59d] rounded-full group-hover:rounded-none"/>
              </div>
              <div>
                <div className='flex flex-row pb-1 gap-6'>
                  <div className='text-[#d35a2b] group-hover:text-[#a44823] font-bold content-center text-lg'>
                    Tomato Special Fry - 2 Plate
                  </div>
                </div>
                <div className='py-2'>
                  Sit amet mi nec consequat. Praesent porttitor nulla sit amet dui lobortis
                </div>
              </div>
              <div>
                <p className="flex items-center justify-center font-bold text-sm text-[#a1bd57]">
                  25.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Menu;
