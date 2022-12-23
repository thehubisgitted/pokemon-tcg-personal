import { Menu } from "@headlessui/react";

export const DropDown = () => {
  return (
    <div className=" bg-indigo-100 flex justify-end p-4">
      <Menu as="div" className="relative">
        {/*Menu Button*/}
        <Menu.Button
          className="inline-flex justify-center w-full rounded-md border border-gray-300
                    shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50
                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 
                    focus: ring-indigo-500"
        >
          Options Menu
          <i
            className="fa-solid fa-chevron-down -mr-1 m1-2 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>

        {/*Menu Items*/}
        <Menu.Items
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg
                    bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100
                    focus:outline-none"
        >
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <h3
                  className={`group flex items-center px-4 text-sm 
                                    ${
                                      active
                                        ? "bg-indigo-500 text-white"
                                        : " text-gray-700"
                                    }`}
                >
                  Item One
                </h3>
              )}
            </Menu.Item>
          </div>

          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <h3
                  className={`group flex items-center px-4 text-sm 
                                    ${
                                      active
                                        ? "bg-indigo-500 text-white"
                                        : "text-gray-700"
                                    }`}
                >
                  Item Two
                </h3>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  );
};
