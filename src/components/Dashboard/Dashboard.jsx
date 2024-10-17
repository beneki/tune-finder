import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SearchBar } from './../'

const Dashboard = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    return (
        <div className="flex justify-center items-center h-32">
            <SearchBar />
        </div>
    );
};

export default Dashboard;
