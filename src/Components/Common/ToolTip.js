import React from 'react';
import { Tooltip } from 'react-tooltip';

function ToolTip() {
  return (
    <div>
      <Tooltip
        id='tooltip-info'
        style={{ backgroundColor: '#00a5ff', color: '#fff', zIndex: 9999 }}
      />
      <Tooltip
        id='tooltip-success'
        style={{
          backgroundColor: '#00bc33',
          color: '#fff',
          zIndex: 9999,
        }}
      />
      <Tooltip
        id='tooltip-danger'
        style={{
          backgroundColor: '#ff0000',
          color: '#fff',
          zIndex: 9999,
        }}
      />
      <Tooltip
        id='tooltip-soft-danger'
        style={{
          backgroundColor: '#ffdada', // Light khaki color
          color: '#ee5b5b', // Dark text color for contrast
          zIndex: 9999,
        }}
      />
      <Tooltip
        id='tooltip-dark'
        style={{
          backgroundColor: '#000',
          color: '#fff',
          zIndex: 9999,
        }}
      />
      <Tooltip
        id='tooltip-primary'
        style={{
          backgroundColor: '#007bff', // Bootstrap primary color
          color: '#fff',
          zIndex: 9999,
        }}
      />
      <Tooltip
        id='tooltip-warning'
        style={{
          backgroundColor: '#ffc107', // Bootstrap warning color
          color: '#fff',
          zIndex: 9999,
        }}
      />
      <Tooltip
        id='tooltip-grey'
        style={{
          backgroundColor: '#6c757d', // Bootstrap secondary color
          color: '#fff',
          zIndex: 9999,
        }}
      />
      <Tooltip
        id='tooltip-secondary'
        style={{
          backgroundColor: '#5b71b9', // Violet color
          color: '#fff',
          zIndex: 9999,
        }}
      />
    </div>
  );
}

export default ToolTip;
