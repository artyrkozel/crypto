import { useState, useEffect } from 'react';

type ResponsiveLayoutType = 'inline-label-left' | 'label-top' | 'small-top';
type ResponsiveBtnSizeType = 'big' | 'medium' | 'small';

export const WIDTH_NORMAL = 1024;
export const WIDTH_SMALL = 480;
export const WIDTH_XXXL = 1921;
export const WIDTH_XXL = 1440;
export const WIDTH_XL = 1280;

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  const responsiveLayout: ResponsiveLayoutType = width > WIDTH_NORMAL
    ? 'inline-label-left'
    : width > WIDTH_SMALL
      ? 'label-top'
      : 'small-top';

  const responsiveBtnSize: ResponsiveBtnSizeType = width > WIDTH_NORMAL ? 'big' : width > WIDTH_SMALL ? 'medium' : 'small';

  const smallLayout = width < WIDTH_NORMAL;
  const xsLayout = width < WIDTH_SMALL;
  const XXXLLayout = width < WIDTH_XXXL;
  const XXLLayout = width < WIDTH_XXL;
  const isVertical = width < height;
  const XLLayout = width < WIDTH_XL;

  return {
    isVertical,
    width,
    height,
    responsiveLayout,
    responsiveBtnSize,
    smallLayout,
    xsLayout,
    XXXLLayout,
    XXLLayout,
    XLLayout,
  };
}

export default function useWindowDimensions() {
  const [dimensions, setDimensions] = useState(() => getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setDimensions(getWindowDimensions());

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
