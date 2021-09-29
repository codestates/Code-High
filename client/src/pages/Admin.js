import React from 'react';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import NavBar from '../components/basic/navbar/NavBar';
import AdminGraph from '../components/admin/graph/Graph';
import AdminTable from '../components/admin/table/Table';

const Admin = () => {
    return (
        <div>
            {/* <AdminGraph/> */}
            <AdminTable/>
            <WhiteFooter/>           
        </div>
    );
};

export default Admin;