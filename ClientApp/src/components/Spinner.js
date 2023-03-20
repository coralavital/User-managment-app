import CircularProgress from '@mui/material/CircularProgress'
import { makeStyles } from '@mui/styles';
import styled from 'styled-components';
import React, { memo } from 'react'

const SpinnerContainer = styled.div`
  position: relative;
  max-width: 60px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  margin-bottom: 16px;
`

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    maxWidth: 60,
    margin: 'auto 16px auto 16px',
    // backgroundColor: theme.palette.background.paper
  },
}));

function Spinner() {

  const classes = useStyles();

  return (
    <SpinnerContainer className={classes.container}>
      <CircularProgress/>
    </SpinnerContainer>
  )
};

export default memo(Spinner);

export const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
`;