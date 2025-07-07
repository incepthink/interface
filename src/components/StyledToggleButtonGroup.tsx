import { styled, ToggleButtonGroup, ToggleButtonGroupProps } from '@mui/material';

const CustomToggleGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>({
  backgroundColor: '#383D51',
  border: '1px solid rgba(0, 245, 224, 0.2)', // Updated to use your cyan color
  padding: '4px',
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: '4px',
    color: '#A5A8B6',
    backgroundColor: 'transparent',
    position: 'relative', // Added for absolute positioning of overlay
    '&:hover': {
      backgroundColor: 'rgba(0, 245, 224, 0.08)', // Cyan hover with transparency
      color: '#00F5E0',
    },
    '&.Mui-selected': {
      backgroundColor: '#00F5E0', // Your main cyan color
      color: '#000000', // Black text for contrast
      fontWeight: 500,
      '&:hover': {
        backgroundColor: '#00C4B5', // Darker cyan on hover
        color: '#000000',
      },
    },
    '&.Mui-disabled': {
      color: '#00F5E0',
      backgroundColor: '#00F5E0',
      opacity: 1, // Keep full opacity for selected disabled state
      // Add the black text overlay for disabled buttons
      '&::after': {
        content: 'attr(data-text)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#000000',
        fontWeight: 500,
        fontSize: 'inherit',
        fontFamily: 'inherit',
        pointerEvents: 'none',
        zIndex: 1,
      },
    },
  },
}) as typeof ToggleButtonGroup;

const CustomTxModalToggleGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.header,
  padding: '2px',
  height: '36px',
  width: '100%',
  border: '1px solid rgba(0, 245, 224, 0.2)', // Updated border color
  '& .MuiToggleButton-root': {
    border: 'none',
    borderRadius: '2px',
    color: '#A5A8B6',
    backgroundColor: 'transparent',
    position: 'relative', // Added for absolute positioning of overlay
    '&:hover': {
      backgroundColor: 'rgba(0, 245, 224, 0.08)',
      color: '#00F5E0',
    },
    '&.Mui-selected': {
      backgroundColor: '#00F5E0',
      color: '#000000',
      fontWeight: 500,
      '&:hover': {
        backgroundColor: '#00C4B5',
        color: '#000000',
      },
    },
    '&.Mui-disabled': {
      color: '#00F5E0',
      backgroundColor: '#00F5E0',
      opacity: 1,
      // Add the black text overlay for disabled buttons
      '&::after': {
        content: 'attr(data-text)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#000000',
        fontWeight: 500,
        fontSize: 'inherit',
        fontFamily: 'inherit',
        pointerEvents: 'none',
        zIndex: 1,
      },
    },
  },
})) as typeof ToggleButtonGroup;

export function StyledTxModalToggleGroup(props: ToggleButtonGroupProps) {
  return <CustomTxModalToggleGroup {...props} />;
}

export default function StyledToggleGroup(props: ToggleButtonGroupProps) {
  return <CustomToggleGroup {...props} />;
}
