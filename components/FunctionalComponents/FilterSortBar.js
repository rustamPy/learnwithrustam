'use client';
import { Select, Option } from "@material-tailwind/react";

export default function FilterSortBar({
    onCategoryChange,
    onSortOrderChange,
    selectedCategory,
    sortOrder,
    onDateChange,
    categories,
    label
}) {

    const COLOR_MAP = {
        'Easy': '#00b8a2',
        'Medium': '#fec01d',
        'Hard': '#f5385d'
    }

    return (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">

                <Select
                    color="blue"
                    value={selectedCategory}
                    label={label}
                    onChange={(value) => onCategoryChange(value)}
                >
                    {categories.map((category) => (
                        <Option key={category} value={category} ><span style={{ color: COLOR_MAP[category] }}>{category}</span></Option>
                    ))}
                </Select>
            </div>
            <div className="flex items-center space-x-2">
                <Select
                    color="purple"
                    value={sortOrder}
                    onChange={(value) => onSortOrderChange(value)}
                    label="Sort by:"
                >
                    <Option value="asc">Title (A-Z)</Option>
                    <Option value="desc">Title (Z-A)</Option>
                </Select>
            </div>
        </div>
    );
}
