import React from "react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
// import { on } from "events";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export type Item = {
  key: string;
  label: string;
};
export default function RoboDropdown(props: {
  items: Item[];
  stateFunction: Function;
}) {
  const [selectedKey, setSelectedKey] = React.useState("Global");

  const selectedLabel =
    props.items.find((item) => item.key === selectedKey)?.label || selectedKey;

  React.useEffect(() => {
    props.stateFunction(selectedKey);
  }, [selectedKey]);

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="shadow"
          className="mt-4  flex w-auto rounded-full bg-gradient-to-br from-green-300 to-green-500 px-5 py-2 capitalize text-black transition-[width] transition-all"
        >
          {selectedLabel} <ChevronDownIcon className="ml-2 h-3 w-3" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        className="rounded-md bg-gray-700 px-2 py-2"
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={[selectedKey]}
        //@ts-ignore
        onSelectionChange={([newKey]) => setSelectedKey(newKey)}
      >
        {props.items.map((elm: Item) => (
          <DropdownItem className="py-1" key={elm.key}>
            {elm.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
