import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, PanelTopClose } from 'lucide-react';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { Drawer } from "@material-tailwind/react";
import SearchBar from '@/components/pro/FunctionalComponents/SearchBar';


const MenuItem = ({ title, icon, isOpen, onClick, hasChildren, onComponentClick, id, isActive }) => {
    const IconComponent = Icons[icon];

    const handleClick = (e) => {
        if (id) {
            e.preventDefault();
            onComponentClick(id);
        }
        if (hasChildren) {
            onClick();
        }
    };

    return (
        <Link
            href={id ? `/university?id=${id}` : '/university'}
            onClick={handleClick}
            className={`
        flex items-center px-4 py-2 text-sm mr-2 rounded-r-xl
        ${isActive
                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-medium'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }
        cursor-pointer
      `}
        >
            <div className="flex items-center flex-1">
                {IconComponent && <IconComponent className="w-4 h-4 mr-2" />}
                <span>{title}</span>
            </div>
            {hasChildren && (
                <div className="ml-auto">
                    {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                    ) : (
                        <ChevronRight className="w-4 h-4" />
                    )}
                </div>
            )}
        </Link>
    );
};

const SubMenu = ({ items, level = 0, onComponentClick, currentId }) => {
    const [openItems, setOpenItems] = useState({});

    useEffect(() => {
        const initialState = {};
        const setOpenState = (items) => {
            Object.entries(items).forEach(([key, item]) => {
                if (
                    currentId === item.id ||
                    (item.items &&
                        Object.values(item.items).some(subItem =>
                            subItem.id === currentId ||
                            (subItem.items &&
                                Object.values(subItem.items).some(grandChild =>
                                    grandChild.id === currentId
                                )
                            )
                        )
                    )
                ) {
                    initialState[key] = true;
                }
                if (item.items) {
                    setOpenState(item.items);
                }
            });
        };
        setOpenState(items);
        setOpenItems(initialState);
    }, [currentId, items]);

    const toggleItem = (key) => {
        setOpenItems(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="w-full">
            {Object.entries(items).map(([key, item]) => (
                <div key={key}>
                    <div className={`${level > 0 ? 'pl-4' : ''}`}>
                        <MenuItem
                            title={item.title}
                            icon={item.icon}
                            id={item.id}
                            isOpen={openItems[key]}
                            onClick={() => item.items && toggleItem(key)}
                            onComponentClick={onComponentClick}
                            hasChildren={!!item.items}
                            isActive={currentId === item.id}
                        />
                    </div>
                    {item.items && openItems[key] && (
                        <div className="ml-4">
                            <SubMenu
                                items={item.items}
                                level={level + 1}
                                onComponentClick={onComponentClick}
                                currentId={currentId}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const MenuContent = ({ setSearchTerm, filteredConfig, onComponentSelect, currentId, hasResults }) => (
    <div className="h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Menu</h2>
        </div>
        <SearchBar onSearch={setSearchTerm} placeholder={'Search for lesson'}></SearchBar>
        <nav className="mt-2">
            {hasResults ? (
                <SubMenu
                    items={filteredConfig}
                    onComponentClick={onComponentSelect}
                    currentId={currentId}
                />
            ) : (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                    No results found
                </div>
            )}
        </nav>
    </div>
);

const SideMenu = ({ config, onComponentSelect, currentId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const filterMenuItems = (items, term) => {
        const filtered = {};
        Object.entries(items).forEach(([key, item]) => {
            if (item.title.toLowerCase().includes(term.toLowerCase()) ||
                (item.items && Object.values(filterMenuItems(item.items, term)).length > 0)) {
                filtered[key] = { ...item };
                if (item.items) {
                    filtered[key].items = filterMenuItems(item.items, term);
                }
            }
        });
        return filtered;
    };

    const filteredConfig = searchTerm ? filterMenuItems(config, searchTerm) : config;
    const hasResults = Object.keys(filteredConfig).length > 0;
    return (
        <>
            {isMobile ? (
                <>
                    <div className='flex items-start mt-4 ml-2'>
                        <button
                            onClick={() => setIsOpen(true)}
                            className="md:hidden"
                        >
                            <PanelTopClose className='text-gray-700 rotate-90' />
                        </button>
                    </div>

                    <Drawer
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                        placement="left"
                        className="p-0"
                    >
                        <MenuContent setSearchTerm={setSearchTerm} filteredConfig={filteredConfig} currentId={currentId} onComponentSelect={onComponentSelect} hasResults={hasResults} />
                    </Drawer>
                </>
            ) : (
                    <MenuContent setSearchTerm={setSearchTerm} filteredConfig={filteredConfig} currentId={currentId} onComponentSelect={onComponentSelect} hasResults={hasResults} />
            )}
        </>
    );
};

export default SideMenu;

const requireComponent = require.context(
    './lessons',
    true,
    /components\.js$/
);
const AllComponents = {};

requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName);
    Object.keys(componentConfig).forEach(exportedComponent => {
        AllComponents[exportedComponent] = componentConfig[exportedComponent];
    });
});
export { AllComponents };