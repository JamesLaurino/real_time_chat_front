import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Fade
} from '@mui/material';
import { 
  ChevronLeft, 
  ChevronRight, 
  FiberManualRecord 
} from '@mui/icons-material';

function Carousel({ 
  children, 
  autoPlay = true, 
  autoPlayInterval = 4000,
  showDots = true,
  showArrows = true,
  itemsPerView = { xs: 1, sm: 2, md: 3 },
  spacing = 2,
  height = 'auto'
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (isMobile) return itemsPerView.xs;
    if (isTablet) return itemsPerView.sm;
    return itemsPerView.md;
  };

  const itemsCount = React.Children.count(children);
  const itemsPerViewCount = getItemsPerView();
  const maxIndex = Math.max(0, itemsCount - itemsPerViewCount);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isHovered && itemsCount > itemsPerViewCount) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, autoPlayInterval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, isHovered, maxIndex, autoPlayInterval, itemsCount, itemsPerViewCount]);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleDotClick = (index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };

  const translateX = -(currentIndex * (100 / itemsPerViewCount));

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main carousel container */}
      <Box
        sx={{
          display: 'flex',
          transform: `translateX(${translateX}%)`,
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          height: '100%'
        }}
      >
        {React.Children.map(children, (child, index) => (
          <Box
            key={index}
            sx={{
              flex: `0 0 ${100 / itemsPerViewCount}%`,
              px: spacing / 2,
              height: '100%'
            }}
          >
            <Fade in={true} timeout={600}>
              <Box sx={{ height: '100%' }}>
                {child}
              </Box>
            </Fade>
          </Box>
        ))}
      </Box>

      {/* Navigation Arrows */}
      {showArrows && itemsCount > itemsPerViewCount && (
        <>
          <IconButton
            onClick={handlePrevious}
            sx={{
              position: 'absolute',
              left: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              width: 48,
              height: 48,
              opacity: isHovered ? 1 : 0.7,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                transform: 'translateY(-50%) scale(1.05)'
              },
              zIndex: 2
            }}
          >
            <ChevronLeft sx={{ fontSize: 28, color: '#2563eb' }} />
          </IconButton>

          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              right: -20,
              top: '50%',
              transform: 'translateY(-50%)',
              bgcolor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              width: 48,
              height: 48,
              opacity: isHovered ? 1 : 0.7,
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: 'white',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                transform: 'translateY(-50%) scale(1.05)'
              },
              zIndex: 2
            }}
          >
            <ChevronRight sx={{ fontSize: 28, color: '#2563eb' }} />
          </IconButton>
        </>
      )}

      {/* Dot Indicators */}
      {showDots && itemsCount > itemsPerViewCount && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            gap: 1
          }}
        >
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <IconButton
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                p: 0.5,
                minWidth: 'auto',
                transition: 'all 0.3s ease'
              }}
            >
              <FiberManualRecord
                sx={{
                  fontSize: currentIndex === index ? 12 : 8,
                  color: currentIndex === index ? '#2563eb' : '#cbd5e1',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: '#2563eb',
                    transform: 'scale(1.2)'
                  }
                }}
              />
            </IconButton>
          ))}
        </Box>
      )}

      {/* Progress bar (optional visual enhancement) */}
      {autoPlay && !isHovered && itemsCount > itemsPerViewCount && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: 2,
            bgcolor: 'rgba(37, 99, 235, 0.2)',
            width: '100%'
          }}
        >
          <Box
            sx={{
              height: '100%',
              bgcolor: '#2563eb',
              width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
              transition: 'width 0.3s ease'
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default Carousel;
