import React, { useState } from 'react';
import '../Styles/SidebarItem.css'; // Asegúrate de crear este archivo CSS también

export const SidebarItem = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
    setIsSelected(!isSelected);
  };

  return (
    <div className={`sidebar-item ${isSelected ? 'selected' : ''}`}>
      <div onClick={handleClick} className="sidebar-item-title">
        {title}
      </div>
      {isOpen && (
        <ul className="sidebar-submenu">
          {options.map((option, index) => (
            <li key={index} className="sidebar-submenu-item">
              <a href={option.link}>{option.label}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

