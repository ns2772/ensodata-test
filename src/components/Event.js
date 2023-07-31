import React, { useState, useRef } from 'react';
import Popup from './Popup';

const Event = ({ event, pixelsPerSecond, onResize, onMove }) => {
  const { id, start, duration } = event;
  const [isResizing, setIsResizing] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const eventRef = useRef(null);

  const handleResizeStart = (resizeDirection) => {
    setIsResizing(resizeDirection);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const handleMoveStart = () => {
    setIsMoving(true);
  };

  const handleMoveEnd = () => {
    setIsMoving(false);
  };

  const handleResize = (e) => {
    if (isResizing) {
      const deltaX = e.clientX - eventRef.current.getBoundingClientRect().left;
      onResize(id, isResizing, deltaX);
    }
  };

  const handleMove = (e) => {
    if (isMoving) {
      const deltaX = e.clientX - eventRef.current.getBoundingClientRect().left;
      onMove(id, deltaX);
    }
  };

  return (
    <div
      ref={eventRef}
      className="event"
      style={{
        left: `${start * pixelsPerSecond}px`,
        width: `${duration * pixelsPerSecond}px`,
      }}
      onMouseDown={handleMoveStart}
      onMouseUp={handleMoveEnd}
      onMouseMove={handleMove}
    >
      <div
        className="event-resize-left"
        onMouseDown={() => handleResizeStart('left')}
        onMouseUp={handleResizeEnd}
        onMouseMove={handleResize}
      />
      <div
        className="event-resize-right"
        onMouseDown={() => handleResizeStart('right')}
        onMouseUp={handleResizeEnd}
        onMouseMove={handleResize}
      />
      <div className="event-move" onMouseDown={handleMoveStart} onMouseUp={handleMoveEnd} onMouseMove={handleMove} />
      <Popup event={event} pixelsPerSecond={pixelsPerSecond} />
    </div>
  );
};

export default Event;
