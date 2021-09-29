import React from 'react';
import WhiteFooter from '../components/basic/footer/WhiteFooter';
import NavBar from '../components/basic/navbar/NavBar';
import Graph from '../components/admin/graph/Graph';
import Table from '../components/admin/table/Table';

const AdiminTable = () => {
    return (
        <div>
            <Table/>
            <WhiteFooter/>
        </div>          
    );
};

export default AdiminTable;