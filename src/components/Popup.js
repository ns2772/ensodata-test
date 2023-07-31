import React from 'react';

const Popup = ({ event, pixelsPerSecond }) => {
  const { start, duration } = event;

  // Calculate the end time of the event in seconds
  const end = start + duration;
  const startTimeInSeconds = start.toFixed(2);
  const endTimeInSeconds = end.toFixed(2);
  const durationInSeconds = duration.toFixed(2);

  return (
    <div className="popup">
      <p>Start Time: {startTimeInSeconds} seconds</p>
      <p>End Time: {endTimeInSeconds} seconds</p>
      <p>Duration: {durationInSeconds} seconds</p>
    </div>
  );
};

export default Popup;
