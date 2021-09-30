import React from 'react';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import NavBar from '../components/basic/navbar/NavBar';
import Graph from '../components/admin/graph/Graph';
import AdminTable from '../components/admin/table/Table';

const AdminGraph = () => {
    return (
        <>
            <Graph/>
            <WhiteFooter/>           
        </>
    );
};

export default AdminGraph;