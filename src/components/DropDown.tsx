import { Menu } from "@headlessui/react";
import React, { FC } from "react";
import { setInformationI } from "../APIUtility";

interface DropDown_Props {
  menu_items: setInformationI[];
  current_set: setInformationI;
  Set_current_set: React.Dispatch<React.SetStateAction<setInformationI>>;
}

export const DropDown: FC<DropDown_Props> = ({
  menu_items,
  current_set,
  Set_current_set,
}) => {
  const select_card_set = (set: setInformationI) => {
    Set_current_set(set);
  };

  return (
    <div className="flex justify-center relative w-full p-4">
      <Menu as="div" className="relative  w-56">
        {/*Menu Button*/}
        <Menu.Button
          className="inline-flex justify-center w-full rounded-md border border-gray-300
                    shadow-sm px-4 py-2  bg-white text-sm font-medium text-gray-700 hover:bg-retro-tan
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100   
                    focus: ring-retro-dark-blue"
        >
        <div className="flex flex-row items-center justify-center">
         <img
         className="object-scale-down h-10 pr-2"
         src={current_set.images.symbol}
         alt="set logo"></img> 
         <h1 className="px-2 text-xl">{current_set.name.toLocaleUpperCase()}</h1>
          <i
            className="fa-solid fa-chevron-down -mr-4 m1-2 h-5 w-5"
            aria-hidden="true"
          />
          </div>
        </Menu.Button>

        {/*Menu Items*/}
        <Menu.Items
          className="origin-top-right right-0 mt-2 w-full rounded-md shadow-lg
                    bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100
                    focus:outline-none max-h-60 overflow-hidden"
        >
          {menu_items.map((item, index) => (
            <div key={index} className="py-1">
              <Menu.Item>
                {({ active }) => (
                
                   
                    <h3
                      className={` text-center block m-auto
                                    ${
                                      active
                                        ? "bg-retro-orange-tan text-white"
                                        : "text-gray-700"
                                    }`}
                      onClick={() => 
                        select_card_set(item)}
                    >
                      {item.name.toLocaleUpperCase()}
                    </h3>
                )}
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};
