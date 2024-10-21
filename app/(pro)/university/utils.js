import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import * as Icons from 'lucide-react';

const MenuItem = ({ title, icon, isOpen, onClick, hasChildren, onComponentClick, component }) => {
    const IconComponent = Icons[icon];

    const handleClick = () => {
        if (component) {
            onComponentClick(component);
        }
        if (hasChildren) {
            onClick();
        }
    };

    return (
        <div
            onClick={handleClick}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
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
        </div>
    );
};

const SubMenu = ({ items, level = 0, onComponentClick }) => {
    const [openItems, setOpenItems] = useState({});

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
                            component={item.component}
                            isOpen={openItems[key]}
                            onClick={() => item.items && toggleItem(key)}
                            onComponentClick={onComponentClick}
                            hasChildren={!!item.items}
                        />
                    </div>

                    {item.items && openItems[key] && (
                        <div className="ml-4">
                            <SubMenu
                                items={item.items}
                                level={level + 1}
                                onComponentClick={onComponentClick}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

const SideMenu = ({ config, onComponentSelect }) => {
    return (
        <div className="w-64 h-screen bg-white border-r border-gray-200">
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            </div>
            <nav className="mt-2">
                <SubMenu items={config} onComponentClick={onComponentSelect} />
            </nav>
        </div>
    );
};

const requireComponent = require.context(
    // Look for files in the current directory and subdirectories
    './',
    // Include subdirectories
    true,
    // Match .js files that contain "components" in their name
    /components\.js$/
);

const AllComponents = {};

requireComponent.keys().forEach(fileName => {
    // Get the component config
    const componentConfig = requireComponent(fileName);

    // Merge each component export into AllComponents
    Object.keys(componentConfig).forEach(exportedComponent => {
        AllComponents[exportedComponent] = componentConfig[exportedComponent];
    });
});

export { AllComponents };

export default SideMenu;