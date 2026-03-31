import React from 'react';
import Grid from '@mui/material/Grid';
import SchoolCreate from './SchoolCreate';
import SchoolMapView from './SchoolMapView';

const SchoolMap = () => {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid size={{ xs: 12, md: 6 }}>
        <SchoolCreate />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <SchoolMapView />
      </Grid>
    </Grid>
  );
};

export default SchoolMap;
