'use client';

import React from 'react';
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
    Card,
    Typography,
} from '@material-tailwind/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CursorArrowRaysIcon } from '@heroicons/react/24/solid';



const menuItems = [
    {
        title: 'Student Profile',
        description: 'Description for Student Profile',
        value: 'student'
    },
    {
        title: 'Parent Profile',
        description: 'Description for Parent Profile',
        value: 'parent'
    }
];

export const StatusSelect = ({ placeholder, value, onChange, onSubmit, locked = undefined }) => {
    const [openMenu, setOpenMenu] = React.useState(false);
    const handleSelect = (selectedValue) => {

        onChange(selectedValue);
        onSubmit({ newValue: selectedValue });
        setOpenMenu(false);
    };

    return (
        <Menu open={openMenu} handler={setOpenMenu} allowHover>
            <MenuHandler>
                <Button
                    variant="text"
                    className="flex items-center gap-3 text-base font-normal capitalize tracking-normal"
                >
                    {value || placeholder}{" "}
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3.5 w-3.5 transition-transform ${openMenu ? "rotate-180" : ""}`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                <Card
                    color="gray"
                    shadow={false}
                    className="col-span-3 flex h-full w-full items-center justify-center rounded-2xl p-4"
                >
                    <CursorArrowRaysIcon strokeWidth={1} className="h-10 w-10" />
                    <Typography className="mt-5 text-center" variant="h5">
                        Material Tailwind PRO
                    </Typography>
                </Card>
                <ul className="col-span-4 flex w-full flex-col gap-1">
                    {menuItems.map(({ title, description, value: itemValue }) => (
                        <MenuItem
                            key={itemValue}
                            onClick={() => handleSelect(itemValue)}
                            disabled={locked === 'student'}
                        >

                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                {title}
                            </Typography>
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-normal"
                            >
                                {description}
                            </Typography>
                        </MenuItem>
                    ))}
                </ul>
            </MenuList>
        </Menu>
    );
};
