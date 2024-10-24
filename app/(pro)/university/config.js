export const menuConfig = {
    dashboard: {
        title: "Assignments",
        icon: "BookOpenCheck",
        component: "HomeworkView",
        id: "home"
    },
    wp_course: {
        title: "Website Project",
        icon: "University",
        id: "wp",
        items: {
            simple: {
                title: "Simple Components",
                id: "wp-simple",
                component: `WPSCHome`,
                items: {
                    sc1: {
                        title: 'Lesson 1',
                        component: 'WPSC1',
                        id: "wp-simple-lesson1"
                    }
                },
            },
            advanced: {
                title: "Advanced Components",
                id: "wp-advanced",
                component: `WPACHome`,
                items: {
                    ac1: {
                        title: 'Lesson 1',
                        component: 'WPAC1',
                        id: "wp-advanced-lesson1"
                    }
                },
            }
        }
    }
};

export const findComponentById = (id) => {
    if (id === 'home') {
        return menuConfig.dashboard.component;
    }

    const findInItems = (items) => {
        for (const key in items) {
            const item = items[key];

            if (item.id === id && item.component) {
                return item.component;
            }

            if (item.items) {
                const found = findInItems(item.items);
                if (found) return found;
            }
        }
        return null;
    };

    return findInItems(menuConfig);
};