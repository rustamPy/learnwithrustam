import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search } from 'lucide-react';
import * as Icons from 'lucide-react';
import Link from 'next/link';


const MenuSearch = ({ onSearch }) => {
    return (
        <div className="px-4 pb-2">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => onSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
};

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

    const linkHref = id ? `/university?id=${id}` : '/university';

    return (
        <Link
            href={linkHref}
            onClick={handleClick}
            className={`
                flex items-center px-4 py-2 text-sm text-gray-700 
                hover:bg-gray-100 cursor-pointer
                ${isActive ? 'bg-gray-100 font-medium' : ''}
            `}
        >
            <div className="flex items-center flex-1">
                {IconComponent && (
                    <IconComponent className="w-4 h-4 mr-2" />
                )}
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
    const [openItems, setOpenItems] = useState(() => {
        const initialState = {};
        const setOpenState = (items) => {
            for (const key in items) {
                const item = items[key];
                if (currentId === item.id ||
                    (item.items && Object.values(item.items).some(subItem =>
                        subItem.id === currentId ||
                        (subItem.items && Object.values(subItem.items).some(grandChild =>
                            grandChild.id === currentId
                        ))
                    ))) {
                    initialState[key] = true;
                }
                if (item.items) {
                    setOpenState(item.items);
                }
            }
        };
        setOpenState(items);
        return initialState;
    });

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


const SideMenu = ({ config, onComponentSelect, currentId }) => {
    const [searchTerm, setSearchTerm] = useState('');

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

    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200">
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            </div>
            <MenuSearch onSearch={setSearchTerm} />
            <nav className="mt-2">
                <SubMenu
                    items={filteredConfig}
                    onComponentClick={onComponentSelect}
                    currentId={currentId}
                />
            </nav>
        </div>
    );
};

const requireComponent = require.context(
    './',
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


export default SideMenu;