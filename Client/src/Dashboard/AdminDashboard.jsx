import React from 'react'
import { SideBar } from './Components/SideBar'
import { Content } from './Components/Content'
import "./Styles/AdminDashboard.css"

export const AdminDashboard = () => {
  return (
    <div className="AdminDashboard">
      <SideBar />
      <Content />
    </div>
  )
}
