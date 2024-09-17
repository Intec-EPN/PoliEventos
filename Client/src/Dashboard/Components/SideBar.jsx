import "../Styles/SideBar.css"
import { SidebarItem } from "./SideBarItem"

const menuItems = [
    {
        title: 'Categorizaciones',
        options: []
    },
    {
        title: 'Roles',
        options: [
            { label: 'Lista de Roles', link: '#view-profile' },
            { label: 'Crear un Rol', link: '#edit-profile' },
        ],
    },
    {
        title: 'Permisos',
        options: []
    },
    {
        title: 'Logs',
        options: []
    },
];

export const SideBar = () => {
    return (
        <>
            <div className="sidebar">
                <h2 className="sidebar-title">Dashboard</h2>
                <div>
                    <img src="" alt="" />
                    <h4 className="">Administración</h4>
                </div>
                {menuItems.map((item, index) => (
                    <SidebarItem key={index} title={item.title} options={item.options} />
                ))}
            </div>
        </>
    )
}
