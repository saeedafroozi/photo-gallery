import * as React from 'react'

interface MenuProps {
    category: Category[];
    selectedCategory: number;
    onClick: (id: number) => void;
}

const Menu = ({ category, selectedCategory, onClick }: MenuProps) => {
    return (<div className="sidebar">
        <div className="menu">
            {category.map((item, index) => {
                return <a
                    key={item.id}
                    className={item.id === selectedCategory ? "active" : null}
                    onClick={() => onClick(item.id)}
                >
                    <b>{item.name}</b>
                </a>
            })}

        </div>
    </div>)
}

export default Menu;