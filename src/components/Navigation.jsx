import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { Menu, Close } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: 'Accueil', path: '/' },
    { label: 'Tarification', path: '/pricing' },
    { label: 'Support', path: '/support' }
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const drawer = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#2563eb' }}>
          ChatOne
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} onClick={() => handleNavigation(item.path)} sx={{ cursor: 'pointer' }}>
            <ListItemText 
              primary={item.label}
              sx={{
                textAlign: 'center',
                '& .MuiListItemText-primary': {
                  fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                  color: location.pathname === item.path ? '#2563eb' : '#1e293b'
                }
              }}
            />
          </ListItem>
        ))}
        <ListItem sx={{ flexDirection: 'column', gap: 2, mt: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() => handleNavigation('/login')}
            sx={{
              borderColor: '#2563eb',
              color: '#2563eb',
              '&:hover': { borderColor: '#1d4ed8', bgcolor: 'rgba(37, 99, 235, 0.1)' }
            }}
          >
            Connexion
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleNavigation('/register')}
            sx={{
              bgcolor: '#2563eb',
              '&:hover': { bgcolor: '#1d4ed8' }
            }}
          >
            Commencer
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        sx={{ 
          bgcolor: 'white', 
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid #e2e8f0'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: '#2563eb',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            ChatOne
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ color: '#1e293b' }}
            >
              <Menu />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: location.pathname === item.path ? '#2563eb' : '#64748b',
                    fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    '&:hover': { color: '#2563eb', bgcolor: 'rgba(37, 99, 235, 0.1)' },
                    textTransform: 'none',
                    fontSize: '1rem'
                  }}
                >
                  {item.label}
                </Button>
              ))}
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  ml: 2,
                  borderColor: '#2563eb',
                  color: '#2563eb',
                  '&:hover': { borderColor: '#1d4ed8', bgcolor: 'rgba(37, 99, 235, 0.1)' },
                  textTransform: 'none'
                }}
              >
                Connexion
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  ml: 1,
                  bgcolor: '#2563eb',
                  '&:hover': { bgcolor: '#1d4ed8' },
                  textTransform: 'none'
                }}
              >
                Commencer
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navigation;
