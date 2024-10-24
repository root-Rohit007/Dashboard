import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect } from 'react';
import { Iconify } from 'src/components/iconify'; // Adjust the path as necessary
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';

import { NavUpgrade } from '../components/nav-upgrade';
import { WorkspacesPopover } from '../components/workspaces-popover';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';



// ----------------------------------------------------------------------

export type NavContentProps = {
  data: {
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Logo */}
      <Box display="flex" justifyContent="space-evenly" alignItems="center" my={2}>
        <Box
          component="img"
          src="/assets/icons/Eagle_RGB_Cyan_Large.svg"
          alt="Eagle Logo"
          sx={{
            width: 24,
            height: 24,
          }}
        />

        <Typography variant="h4" color="var(--layout-nav-item-color)">Personal Banking</Typography>
      </Box>



      {slots?.topArea}

      <Box display="flex" flexDirection="column" alignItems="center" my={2}>
        <Box
          component="img"
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt="Profile Picture"
          sx={{
            width: 120,
            height: 120,
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />
        <Box component="span" mt={1} sx={{ typography: 'h6', color: 'var(--layout-nav-item-color)' }}>
          John Doe
        </Box>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        my={2}
        p={2}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 1,
          bgcolor: 'background.paper',
          width: '100%',
        }}
      >
        <Typography variant="h6" gutterBottom>
          Chat with AI
        </Typography>
        <Box
          component="div"
          sx={{
            width: '100%',
            p: 1,
            borderRadius: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
            color: 'text.primary',
            minHeight: '50px',
            mb: 2,
          }}
        >
          {/* This is where the AI response will be displayed */}
        </Box>
        <Box
          component="textarea"
          placeholder="Type your message..."
          rows={2}
          sx={{
            width: '100%',
            p: 1,
            borderRadius: 1,
            borderColor: 'divider',
            bgcolor: 'background.default',
            color: 'text.primary',
            '&:focus': {
              outline: 'none',
              borderColor: 'primary.main',
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, alignSelf: 'flex-end' }}
        >
          Send
        </Button>
      </Box>



      {/* <WorkspacesPopover data={workspaces} sx={{ my: 2 }} /> */}

      {/* <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0.5} display="flex" flexDirection="column">
            {data.map((item) => {
              const isActived = item.path === pathname;

              return (
                <ListItem disableGutters disablePadding key={item.title}>
                  <ListItemButton
                    disableGutters
                    component={RouterLink}
                    href={item.path}
                    sx={{
                      pl: 2,
                      py: 1,
                      gap: 2,
                      pr: 1.5,
                      borderRadius: 0.75,
                      typography: 'body2',
                      fontWeight: 'fontWeightMedium',
                      color: 'var(--layout-nav-item-color)',
                      minHeight: 'var(--layout-nav-item-height)',
                      ...(isActived && {
                        fontWeight: 'fontWeightSemiBold',
                        bgcolor: 'var(--layout-nav-item-active-bg)',
                        color: 'var(--layout-nav-item-active-color)',
                        '&:hover': {
                          bgcolor: 'var(--layout-nav-item-hover-bg)',
                        },
                      }),
                    }}
                  >
                    <Box component="span" sx={{ width: 24, height: 24 }}>
                      {item.icon}
                    </Box>

                    <Box component="span" flexGrow={1}>
                      {item.title}
                    </Box>

                    {item.info && item.info}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </Box>
        </Box>
      </Scrollbar> */}

      <Card variant='outlined' sx={{
        width: { xs: '100%', sm: '100%' },  // Full width on mobile, half width on larger screens
        minWidth: { xs: 'auto', sm: 200 },  // Allow full width on mobile
        p: 2,
        mb: { xs: 2, sm: 0 },  // Add bottom margin on mobile for spacing
        backgroundImage: 'url(https://picsum.photos/800/600)',  // Fetch a random image from Picsum
        backgroundSize: 'cover',  // Ensure the image covers the entire card
        backgroundPosition: 'center',  // Center the image
        color: 'white',  // Change text color for better contrast
        position: 'relative',  // Ensure positioning context
        overflow: 'hidden',  // Hide overflow to ensure image visibility
      }}>
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Add a semi-transparent overlay for better text contrast
        }} />
        <Typography variant="subtitle2" sx={{ mb: 1, position: 'relative', zIndex: 1 }}>
          Introducing The Amazon Barclaycard
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, position: 'relative', zIndex: 1 }}>
          <img src="https://img.icons8.com/ios-filled/50/ffffff/amazon.png" alt="Amazon" style={{ width: 48, height: 48 }} />


          <Button
            size="large"
            variant="text"
            sx={{ minWidth: 'auto', p: 0 }}
          >
            <Iconify icon="logos:visa" style={{ width: 48, height: 48 }} />
          </Button>
        </Box>
        <Typography variant="body2" sx={{ position: 'relative', zIndex: 1 }}>
          **** **** **** 3456
        </Typography>
      </Card>




      {slots?.bottomArea}



      {/* <NavUpgrade /> */}
    </>
  );
}
