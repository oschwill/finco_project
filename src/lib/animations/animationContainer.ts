import styled, { keyframes } from 'styled-components';
import { fadeIn, zoomIn } from 'react-animations';

const zoomInAnimation = keyframes`${zoomIn}`;

export const ZoomInDynamicDiv = (duration: string, limit: number) => {
  return styled.div`
    animation: ${duration}s ${keyframes`${zoomIn}`} ${limit};
  `;
};

export const StaticZoomInDiv = styled.div`
  animation: 0.25s ${zoomInAnimation};
`;
