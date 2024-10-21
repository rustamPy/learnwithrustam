import { title } from "process";

export const menuConfig = {
    dashboard: {
        title: "Homeworks",
        icon: "BookOpenCheck",
        component: "HomeworkView"
    },
    wp_course: {
        title: "Website Project",
        icon: "University",
        items: {
            simple: {
                title: "Simple Components",
                items: {
                    sc1: {
                        title: 'Lesson 1',
                        component: 'WPSC1'
                    }

                },
            }
        }
    }
};