import { Trans } from '@lingui/macro';
import { Button, Paper, Typography, useTheme } from '@mui/material';
import Link from 'next/link';
import { useEffect } from 'react';
import { ContentContainer } from 'src/components/ContentContainer';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';
import { MainLayout } from 'src/layouts/MainLayout';
import { useRootStore } from 'src/store/root';

export default function Aave404Page() {
  const theme = useTheme();
  const trackEvent = useRootStore((store) => store.trackEvent);

  useEffect(() => {
    trackEvent('Page Viewed', {
      'Page Name': '404 Error',
    });
  }, [trackEvent]);
  return (
    <>
      <TopInfoPanel />
      <ContentContainer>
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            p: 4,
            flex: 1,
            backgroundColor: theme.palette.mode === 'dark' ? 'transparent' : '',
          }}
        >
          <Typography variant="display1" sx={{ mt: 2 }}>
            <h1 className="text-sm ">404</h1>
            <Trans>Page not found</Trans>
          </Typography>
          <Typography sx={{ mt: 3, mb: 5, maxWidth: 480 }}>
            <Trans>Sorry, we couldn&apos;t find the page you were looking for.</Trans>
            <br />
            <Trans>We suggest you go back to the Dashboard.</Trans>
          </Typography>
          <Link href="/" passHref>
            <Button variant="outlined" color="primary">
              <Trans>Back to Dashboard</Trans>
            </Button>
          </Link>
        </Paper>
      </ContentContainer>
    </>
  );
}

Aave404Page.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
