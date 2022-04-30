import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import { getPlacesData } from './api'

import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';


const App = () => {

    const [places, setPlaces] = useState();

    const [ coordinates, setCoordinates ] = useState({});
    const [ bounds, setBounds ] = useState({ });



    // Execute when the component renders at the first by entering []
    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
            setCoordinates({lat: latitude, lng:longitude})
        })
    }, [])

    // Execute when the data in the [] updates
    useEffect(()=>{
        // console.log(coordinates, bounds);

        getPlacesData(bounds.sw, bounds.ne)
            .then((data)=>{
                setPlaces(data);
                // console.log(data)
            })
    }, [coordinates, bounds]);
    // return (
    //     <div>
    //         <h1>Hello, React</h1>
    //     </div>
    // )
    return (
    <>
        <CssBaseline />
        <Header />
        <Grid container spacing={3} style={{width: '100%'}}>
            <Grid item xs={12} md={4}>
                <List places={places} />
            </Grid>
            <Grid item xs={12} md={8}>
                <Map 
                    setCoordinates={setCoordinates}
                    setBounds={setBounds}
                    coordinates={coordinates}
                />
            </Grid>
        </Grid>
    
    
    </>
    )
}

export default App;