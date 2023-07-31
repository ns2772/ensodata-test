import React, { useState, useEffect, useRef } from 'react';
import Event from './Event';
import { getEventsFromApi } from '../api/initialEvents'; // Import initial events

// Adjust this value based on your waveform chart scale
const pixelsPerSecond = 10; // For example, if 1 second = 10 pixels on the chart

const Channel = () => {
  const [events, setEvents] = useState(getEventsFromApi());
  const canvasRef = useRef(null); // Use useRef to reference the canvas element

  // Function to handle event creation
  const handleEventCreation = (clientX) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const pixelsSinceCanvasStart = clientX - rect.left;
    const startTimeInSeconds = pixelsSinceCanvasStart / pixelsPerSecond;

    // Implement event creation logic here
    // Use startTimeInSeconds to calculate the start and end time of the new event
    // Add the new event to the events state with setEvents
    const newEvent = {
      id: Date.now().toString(),
      start: startTimeInSeconds,
      duration: 1, // Set an initial duration, you can adjust this based on your requirement
    };
    setEvents([...events, newEvent]);
  };

  // Function to handle event resizing
  const handleEventResizing = (eventId, resizeDirection, deltaX) => {
    // Implement event resizing logic here
    // Find the event in the events state by eventId
    // Calculate the new duration based on deltaX and pixelsPerSecond
    // Update the event's duration and end time in the events state with setEvents
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              duration: Math.max(event.duration + deltaX / pixelsPerSecond, 1), // Minimum duration is 1 second
            }
          : event
      )
    );
  };

  // Function to handle event moving
  const handleEventMoving = (eventId, deltaX) => {
    // Implement event moving logic here
    // Find the event in the events state by eventId
    // Calculate the new start time and end time based on deltaX and pixelsPerSecond
    // Update the event's start and end times in the events state with setEvents
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === eventId
          ? {
              ...event,
              start: Math.max(event.start + deltaX / pixelsPerSecond, 0), // Start time cannot be negative
            }
          : event
      )
    );
  };

  // Function to draw the sine wave on the canvas
  const drawSineWave = (canvas) => {
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const amplitude = height / 2;
    const frequency = 0.05; // Adjust this value to change the frequency of the wave
    const phase = 0; // Adjust this value to change the starting phase of the wave

    context.clearRect(0, 0, width, height);
    context.beginPath();

    for (let x = 0; x < width; x++) {
      const timeInSeconds = x / pixelsPerSecond;
      const y = amplitude * Math.sin(2 * Math.PI * frequency * timeInSeconds + phase) + height / 2;
      if (x === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }

    context.strokeStyle = '#ccc'; // Adjust the color of the sine wave
    context.lineWidth = 2; // Adjust the thickness of the sine wave
    context.stroke();
  };

  // Call the drawSineWave function once the component is mounted
  useEffect(() => {
    const canvas = canvasRef.current;
    drawSineWave(canvas);
  }, []);

  return (
    <div className="channel">
      <canvas className="sine-wave" width="1000" height="100" ref={canvasRef}>
        {/* The sine wave will be drawn here */}
      </canvas>
      {events.map((event) => (
        <Event
          key={event.id}
          event={event}
          pixelsPerSecond={pixelsPerSecond} // Pass the pixelsPerSecond to Event component
          onResize={handleEventResizing}
          onMove={handleEventMoving}
        />
      ))}
      {/* Placeholder for event creation */}
      <div
        className="event-creation-placeholder"
        onMouseDown={(e) => handleEventCreation(e.clientX)}
      />
    </div>
  );
};

export default Channel;
