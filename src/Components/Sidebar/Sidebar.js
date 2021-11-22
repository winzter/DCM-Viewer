import React from 'react'
import './Sidebar.css'
import Tree from './Tree';

function Sidebar() {
    return (
        <div  className='Sidebar'>
            <ul className='SidebarList'>
                <Tree/>
            </ul>
        </div>
    );
}
export default Sidebar;