'use client';
import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Typography, Stepper, Step } from '@material-tailwind/react';

const pythonConcepts = [
  { id: 1, name: 'Variables', description: 'Containers for storing data values', color: '#FF6B6B', shape: 'circle' },
  { id: 2, name: 'Data Types', description: 'Classifications for various types of data', color: '#4ECDC4', shape: 'triangle' },
  { id: 3, name: 'Operators', description: 'Symbols that perform operations on variables and values', color: '#45B7D1', shape: 'square' },
  { id: 4, name: 'Control Flow', description: 'Statements for controlling the execution of code', color: '#F7B731', shape: 'pentagon' },
  { id: 5, name: 'Functions', description: 'Reusable blocks of code that perform specific tasks', color: '#9B59B6', shape: 'hexagon' },
  { id: 6, name: 'Lists', description: 'Ordered, mutable collections of items', color: '#5D9CEC', shape: 'circle' },
  { id: 7, name: 'Dictionaries', description: 'Key-value pairs for storing and retrieving data', color: '#FF5722', shape: 'triangle' },
  { id: 8, name: 'Loops', description: 'Structures for iterating over sequences or executing code repeatedly', color: '#66BB6A', shape: 'square' },
];

const PythonConceptMap = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedConcept, setSelectedConcept] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const drawConcepts = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.6;

      pythonConcepts.forEach((concept, index) => {
        const angle = (index / pythonConcepts.length) * Math.PI * 2 - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        const size = 60;

        // Draw connecting lines
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = index <= activeStep ? concept.color : '#ddd';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw shape
        ctx.fillStyle = concept.color;
        ctx.beginPath();

        switch (concept.shape) {
          case 'circle':
            ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            break;
          case 'triangle':
            ctx.moveTo(x, y - size / 2);
            ctx.lineTo(x + size / 2, y + size / 2);
            ctx.lineTo(x - size / 2, y + size / 2);
            break;
          case 'square':
            ctx.rect(x - size / 2, y - size / 2, size, size);
            break;
          case 'pentagon':
            for (let i = 0; i < 5; i++) {
              ctx.lineTo(x + size / 2 * Math.cos(i * 2 * Math.PI / 5 - Math.PI / 2),
                         y + size / 2 * Math.sin(i * 2 * Math.PI / 5 - Math.PI / 2));
            }
            break;
          case 'hexagon':
            for (let i = 0; i < 6; i++) {
              ctx.lineTo(x + size / 2 * Math.cos(i * 2 * Math.PI / 6),
                         y + size / 2 * Math.sin(i * 2 * Math.PI / 6));
            }
            break;
        }

        ctx.closePath();
        ctx.fill();

        // Draw concept name
        ctx.fillStyle = 'white';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(concept.name, x, y);

        concept.x = x;
        concept.y = y;
        concept.size = size;
      });
    };

    drawConcepts();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawConcepts();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [activeStep]);

  const handleCanvasClick = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const clickedConcept = pythonConcepts.find(concept => 
      Math.sqrt((x - concept.x) ** 2 + (y - concept.y) ** 2) < concept.size / 2
    );

    if (clickedConcept) {
      setSelectedConcept(clickedConcept);
      setActiveStep(pythonConcepts.indexOf(clickedConcept));
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(Math.min(zoomLevel + 0.1, 1.5));
  };

  const handleZoomOut = () => {
    setZoomLevel(Math.max(zoomLevel - 0.1, 0.5));
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="absolute top-0 left-0 w-full h-full"
        style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center' }}
      />
      <div className="absolute top-4 left-4 z-10">
        <h1 className="text-3xl font-bold mb-2 text-indigo-600">Python Concept Wheel</h1>
        <p className="text-gray-600">Click on shapes to explore concepts</p>
      </div>
      <div className="absolute top-4 right-4 z-10 flex">
        <button onClick={handleZoomOut} className="mr-2 p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
          <ZoomOut size={24} />
        </button>
        <button onClick={handleZoomIn} className="p-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-colors">
          <ZoomIn size={24} />
        </button>
      </div>
      <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
        <Stepper
          activeStep={activeStep}
          lineClassName="bg-blue-gray-50"
          activeLineClassName="bg-blue-500"
        >
          {pythonConcepts.map((concept, index) => (
            <Step
              key={concept.id}
              onClick={() => {
                setActiveStep(index);
                setSelectedConcept(concept);
              }}
              className="cursor-pointer"
            >
              <div className="absolute -bottom-[2.5rem] w-max text-center">
                <Typography
                  variant="h6"
                  color={activeStep === index ? "blue-gray" : "gray"}
                >
                  {concept.name}
                </Typography>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
      {selectedConcept && (
        <div className="absolute bottom-32 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-10">
          <h2 className="text-xl font-semibold mb-2" style={{ color: selectedConcept.color }}>
            {selectedConcept.name}
          </h2>
          <p className="text-gray-700">{selectedConcept.description}</p>
        </div>
      )}
    </div>
  );
};

export default PythonConceptMap;