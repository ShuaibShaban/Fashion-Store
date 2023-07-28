import React, {useEffect, useState} from 'react'
import {
    UilEstate,
    UilClipboardAlt,
    UilUsersAlt,
    UilPackage,
    UilChart,
    UilSignOutAlt,
    UilUsdSquare,
    UilMoneyWithdrawal,
} from '@iconscout/react-unicons';

import './sidebar.css';

import ProductTable from '../../features/products/components';
import UserTable from '../../features/users/components';
import OrdersTable from '../../features/orders/components';
import UserReview from './UserReview';

const Sidebar = () => {
  

    const SidebarData = [
        {
            icon:UilEstate,
            heading:'Products'
        },
        {
            icon:UilClipboardAlt,
            heading:'Roles',
        },
        {
            icon:UilUsersAlt,
            heading:'Customers',
        },
        // {
        //     icon:UilPackage,
        //     heading:'Products',
        // },
        {
            icon:UilChart,
            heading:'Analytics'
        }
    ]
  const [selected, setSelected] = useState(0);
  // const [expanded, setExpanded] = useState(true);
  function handleSelected(index, item){
    setSelected(index)
    

  }
   return (
    <div className='admin-panel'>
    <div className='Sidebar'>
      <div className='logo'>
        
        <span>
          Fashion
        </span>
      </div>
      {/* Menu */}

      <div className='menu'>
      {SidebarData.map((item,index)=>{
        return(
          <div className={selected===index?'menuItem active':'menuItem'}
             key={index}
             onClick={()=>handleSelected(index, item)}
             >
             <item.icon/>
                 <span>
                  {item.heading}
                 </span>                
          </div>
        )
      })}
      <div className='menuItem'>
        <UilSignOutAlt/>
      </div>
      </div>
    </div>
    <div className='userTable'>
      {selected === 2 && <UserTable /> }
      {selected === 3 && <UserReview /> }
      {selected === 1 && <OrdersTable /> }
      {selected === 0 && <ProductTable /> }
      
    </div>
    </div>
  )
}

export default Sidebar