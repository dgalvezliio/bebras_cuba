import { Box, useMantineTheme } from '@mantine/core';  
// import { useScrollPosition } from '@mantine/hooks';  
import { BarNavInicial } from './BarNavInicial';  
import classes from '../styles/BarNavBebras.module.css';  
import { useEffect, useState } from 'react';

export function BarNavBebras() {  
  const theme = useMantineTheme();  
  const [hidden, setHidden] = useState(false);  

//   const scrollPosition = useScrollPosition();  

//   useEffect(() => {  
//     if (scrollPosition.y > 80) {  
//       setHidden(true);  
//     } else {  
//       setHidden(false);  
//     }  
//   }, [scrollPosition.y]);  

  return (  
    <Box  
      className={`${classes.heroSection} ${hidden ? classes.hidden : ''}`}  
      style={{  
        position: 'relative',  
        // zIndex: theme.zIndex.modal,  
      }}  
    >  
      {/* Aquí colocarías la imagen */}  
      <img src="../assets/img/banner.jpg" alt="Hero Image" className={classes.heroImage} />  
      <BarNavInicial />  
    </Box>  
  );  
}