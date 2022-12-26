import { Menu } from "@headlessui/react";
import React, { FC } from "react";

interface DropDown_Props {
  menu_items: String[],
  current_set: String,
  Set_current_set: React.Dispatch<React.SetStateAction<string>>,
}

export const DropDown: FC<DropDown_Props> = ({ menu_items, current_set }) => {
  return (
    <div className=" bg-indigo-100 flex justify-center absolute p-4">
      <Menu as="div" className="relative  w-56">
        {/*Menu Button*/}
        <Menu.Button
          className="inline-flex justify-center w-full rounded-md border border-gray-300
                    shadow-sm px-4 py-2  bg-white text-sm font-medium text-gray-700 hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 
                    focus: ring-indigo-500"
        >
          {current_set}
          <i
            className="fa-solid fa-chevron-down -mr-1 m1-2 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>

        {/*Menu Items*/}
        <Menu.Items
          className="origin-top-right right-0 mt-2 w-full rounded-md shadow-lg
                    bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100
                    focus:outline-none"
        >
          {menu_items.map((item, index) => (
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <h3
                    className={`flex items-center px-4 text-sm 
                                    ${
                                      active
                                        ? "bg-indigo-500 text-white"
                                        : "text-gray-700"
                                    }`}
                  >
                    {item}
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
