import { Box, BoxProps } from '@mui/material';
import { ReactNode } from 'react';

interface ListHeaderWrapperProps extends BoxProps {
  px?: 4 | 6;
  children: ReactNode;
}

export const ListHeaderWrapper = ({ px = 4, children, ...rest }: ListHeaderWrapperProps) => {
  return (
    <Box
      {...rest}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        px,
        pt: 4,
        pb: 1.5,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        // borderRadius: '12px',
        backgroundColor: 'rgba(5, 5, 18, 0.6)', // #050512 with 60% opacity
        border: '1px solid rgba(174, 174, 174, 0.2)', // subtle border
        boxShadow: 'inset 0px 4px 34px rgba(0, 255, 233, 0.4)', // neon teal inner glow
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        ...rest.sx,
      }}
    >
      {children}
    </Box>
  );
};
