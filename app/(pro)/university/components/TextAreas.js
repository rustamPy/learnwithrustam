'use client';
import React, { useReducer } from 'react';

const initialState = {
    basic: '',
    bordered: '',
    disabled: '',
    required: '',
    withLabel: '',
    withPlaceholder: ''
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_TEXT':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
};

const TextAreas = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleChange = (field) => (e) => {
        dispatch({
            type: 'UPDATE_TEXT',
            field,
            value: e.target.value
        });
    };

    return (
        <div className="w-full max-w-4xl mx-auto space-y-6 p-6">

            {/* Basic TextArea */}
            <div className="space-y-2">
                <h3 className="">Basic Text Area</h3>
                <textarea
                    className="w-full p-3 rounded-lg bg-white/5 text-sm resize-y min-h-[100px]"
                    value={state.basic}
                    onChange={handleChange('basic')}
                    placeholder="Basic textarea..."
                />
            </div>

            {/* Bordered TextArea */}
            <div className="space-y-2">
                <h3 className="">Bordered Text Area</h3>
                <textarea
                    className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-y min-h-[100px]"
                    value={state.bordered}
                    onChange={handleChange('bordered')}
                    placeholder="Bordered textarea..."
                />
            </div>

            {/* Disabled TextArea */}
            <div className="space-y-2">
                <h3 className="">Disabled Text Area</h3>
                <textarea
                    className="w-full p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed resize-none min-h-[100px]"
                    value="This textarea is disabled"
                    disabled
                    onChange={handleChange('disabled')}
                />
            </div>

            {/* Required TextArea */}
            <div className="space-y-2">
                <h3 className="">Required Text Area</h3>
                <textarea
                    className="w-full p-3 rounded-lg border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 resize-y min-h-[100px]"
                    value={state.required}
                    onChange={handleChange('required')}
                    placeholder="Required textarea..."
                    required
                />
            </div>

            {/* TextArea with Label */}
            <div className="space-y-2">
                <h3 className="">Text Area with Label</h3>
                <label className="block text-sm font-medium mb-1">
                    Description
                    <textarea
                        className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-y min-h-[100px]"
                        value={state.withLabel}
                        onChange={handleChange('withLabel')}
                        placeholder="Enter your description..."
                    />
                </label>
            </div>

            {/* Reset Button */}
            <button
                onClick={() => dispatch({ type: 'RESET' })}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
                Reset All
            </button>
        </div>
    );
};

export const TextAreasCode = () => `'use client';
// Uncomment 'use client' if you are using Next.js

import React, { useReducer } from 'react';

const initialState = {
  basic: '',
  bordered: '',
  disabled: '',
  required: '',
  withLabel: '',
  withPlaceholder: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const TextAreas = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (field) => (e) => {
    dispatch({
      type: 'UPDATE_TEXT',
      field,
      value: e.target.value
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 p-6">
      
      
      {/* Basic TextArea */}
      <div className="space-y-2">
        <h3 className="font-bold mb-6">Basic TextArea</h3>
        <textarea 
          className="w-full p-3 rounded-lg bg-white/5 text-sm resize-y min-h-[100px]"
          value={state.basic}
          onChange={handleChange('basic')}
          placeholder="Basic textarea..."
        />
      </div>

      {/* Bordered TextArea */}
      <div className="space-y-2">
        <textarea 
          className="w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors resize-y min-h-[100px]"
          value={state.bordered}
          onChange={handleChange('bordered')}
          placeholder="Bordered textarea..."
        />
      </div>

      {/* Disabled TextArea */}
      <div className="space-y-2">
        <textarea 
          className="w-full p-3 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed resize-none min-h-[100px]"
          value="This textarea is disabled"
          disabled
          onChange={handleChange('disabled')}
        />
      </div>

      {/* Required TextArea */}
      <div className="space-y-2">
        <textarea 
          className="w-full p-3 rounded-lg border-2 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 resize-y min-h-[100px]"
          value={state.required}
          onChange={handleChange('required')}
          placeholder="Required textarea..."
          required
        />
      </div>

      {/* TextArea with Label */}
      <div className="space-y-2">
        <label className="block text-sm font-medium mb-1">
          Description
          <textarea 
            className="mt-1 block w-full p-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-y min-h-[100px]"
            value={state.withLabel}
            onChange={handleChange('withLabel')}
            placeholder="Enter your description..."
          />
        </label>
      </div>

      {/* Reset Button */}
      <button
        onClick={() => dispatch({ type: 'RESET' })}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        Reset All
      </button>
    </div>
  );
};

export default TextAreas;`;

export default TextAreas;