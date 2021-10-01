import React from 'react'
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

function TestSidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-container'>
        <div className='menutab-container'>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.classname}>
                <Link to={item.path}>
                  <ul><span>{item.title}</span></ul>
                </Link>
              </li>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default TestSidebar
