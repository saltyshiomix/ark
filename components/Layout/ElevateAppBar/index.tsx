import {
  ReactElement,
  cloneElement,
} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@material-ui/core';

interface ElevateAppBarProps {
  children: ReactElement;
}

const ElevationScroll = (props: ElevateAppBarProps) => {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

export const ElevateAppBar = () => {
  return (
    <>
      <ElevationScroll>
        <AppBar>
          <Toolbar>
            <Typography variant="h6">ARK</Typography>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </>
  );
};
