'use client';

import { useState, useEffect, useRef, createRef } from 'react';

// Custom styles for animation delays
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  .animation-delay-2s { animation-delay: 2s; }
  .animation-delay-4s { animation-delay: 4s; }
  .animation-delay-6s { animation-delay: 6s; }
  .animate-float { animation: float 6s ease-in-out infinite; }
`;

const ROWS = 6;
const COLS = 5;
const LETTER_STATES = {
  EMPTY: 'empty',
  GREY: 'grey',
  YELLOW: 'yellow',
  GREEN: 'green'
};

const WordleSolver = () => {
  const [grid, setGrid] = useState(() => 
    Array(ROWS).fill().map(() => 
      Array(COLS).fill().map(() => ({
        letter: '',
        state: LETTER_STATES.EMPTY
      }))
    )
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [wordList, setWordList] = useState([]);
  const [filteredWords, setFilteredWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [kingWord, setKingWord] = useState('');
  const inputRefs = useRef(Array(ROWS).fill().map(() => Array(COLS).fill().map(() => createRef())));

  // Load word list
  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch('/api/wordle/words');
        if (!response.ok) {
          throw new Error('Failed to fetch words');
        }
        const text = await response.text();
        const words = text.split('\n')
          .map(word => word.trim().toUpperCase())
          .filter(word => 
            word.length === 5 && 
            !/\d/.test(word) && // Exclude words with digits
            /^[A-Z]+$/.test(word) // Only letters
          );
        
        // Find the best "king word" with unique letters
        const uniqueLetterWords = words.filter(word => {
          const letters = word.split('');
          return letters.length === new Set(letters).size;
        });
        
        const bestKingWord = uniqueLetterWords.length > 0 ? 
          uniqueLetterWords[Math.floor(Math.random() * uniqueLetterWords.length)] : '';
        
        setWordList(words);
        setFilteredWords(words);
        setSuggestions(words.slice(0, 10));
        setKingWord(bestKingWord);
      } catch (error) {
        console.error('Error loading words:', error);
        // Fallback word list
        const fallbackWords = ['ABOUT', 'ABUSE', 'ADULT', 'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALIVE', 'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE', 'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARMED', 'ARMOR', 'ARRAY', 'ARROW', 'ASIDE', 'ASSET', 'AVOID', 'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN', 'BENCH', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLIND', 'BLOCK', 'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK', 'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BUILT', 'BUYER', 'CABLE', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART', 'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM', 'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'COACH', 'COAST', 'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS', 'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH', 'DEBUT', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DREAM', 'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY', 'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FINAL', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE', 'FORTH', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT', 'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAIN', 'GRAND', 'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS', 'GUEST', 'GUIDE', 'HAPPY', 'HEART', 'HEAVY', 'HORSE', 'HOTEL', 'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER', 'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS', 'LIVER', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER', 'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR', 'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH', 'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NOISE', 'NORTH', 'NOTED', 'NOVEL', 'NURSE', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'OUTER', 'OWNER', 'PAINT', 'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE', 'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER', 'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE', 'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH', 'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'RIDER', 'RIDGE', 'RIGHT', 'RIGID', 'RIVER', 'ROBOT', 'ROCKY', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE', 'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE', 'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT', 'SHOWN', 'SINCE', 'SKILL', 'SLEEP', 'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SNAKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND', 'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP', 'STEER', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP', 'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEAMS', 'TEETH', 'TERRY', 'TEXAS', 'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD', 'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGER', 'TIGHT', 'TIMER', 'TIRED', 'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN', 'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUNK', 'TRUST', 'TRUTH', 'TWICE', 'TWIST', 'TYLER', 'UNCLE', 'UNDER', 'UNDUE', 'UNION', 'UNITY', 'UNTIL', 'UPPER', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT', 'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WEIRD', 'WHEEL', 'WHERE', 'WHICH', 'WHILE', 'WHITE', 'WHOLE', 'WHOSE', 'WIDER', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH', 'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YIELD', 'YOUNG', 'YOUTH'].filter(word => !/\d/.test(word));
        const uniqueLetterWords = fallbackWords.filter(word => {
          const letters = word.split('');
          return letters.length === new Set(letters).size;
        });
        const randomKingWord = uniqueLetterWords.length > 0 ? 
          uniqueLetterWords[Math.floor(Math.random() * uniqueLetterWords.length)] : 'AUDIO';
        setWordList(fallbackWords);
        setFilteredWords(fallbackWords);
        setSuggestions(fallbackWords.slice(0, 10));
        setKingWord(randomKingWord);
      }
    };
    loadWords();
  }, []);

  // Filter words based on current grid state
  const filterWords = () => {
    let filtered = [...wordList];

    for (let row = 0; row < currentRow; row++) {
      const rowData = grid[row];
      const word = rowData.map(cell => cell.letter).join('');
      
      if (word.length === 5) {
        filtered = filtered.filter(candidateWord => {
          // Check green letters (correct position)
          for (let col = 0; col < COLS; col++) {
            if (rowData[col].state === LETTER_STATES.GREEN) {
              if (candidateWord[col] !== rowData[col].letter) {
                return false;
              }
            }
          }

          // Check yellow letters (wrong position but exists)
          for (let col = 0; col < COLS; col++) {
            if (rowData[col].state === LETTER_STATES.YELLOW) {
              const letter = rowData[col].letter;
              // Letter must exist in the word but not at this position
              if (!candidateWord.includes(letter) || candidateWord[col] === letter) {
                return false;
              }
            }
          }

          // Check grey letters (doesn't exist)
          for (let col = 0; col < COLS; col++) {
            if (rowData[col].state === LETTER_STATES.GREY) {
              const letter = rowData[col].letter;
              // Letter must not exist in the word unless it's green/yellow elsewhere
              const hasGreenOrYellow = rowData.some((cell, idx) => 
                cell.letter === letter && (cell.state === LETTER_STATES.GREEN || cell.state === LETTER_STATES.YELLOW)
              );
              if (!hasGreenOrYellow && candidateWord.includes(letter)) {
                return false;
              }
            }
          }

          return true;
        });
      }
    }

    setFilteredWords(filtered);
    setSuggestions(filtered.slice(0, 10));
    
    // Don't update king word here - only update on row change or manual click
  };

  useEffect(() => {
    filterWords();
  }, [grid, currentRow, wordList]);

  const refreshKingWord = () => {
    const uniqueLetterWords = filteredWords.filter(word => {
      const letters = word.split('');
      return letters.length === new Set(letters).size;
    });
    
    if (uniqueLetterWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * uniqueLetterWords.length);
      setKingWord(uniqueLetterWords[randomIndex]);
    }
  };

  const useKingWord = () => {
    if (kingWord && currentRow < ROWS) {
      const newGrid = [...grid];
      const letters = kingWord.split('');
      
      for (let col = 0; col < COLS && col < letters.length; col++) {
        newGrid[currentRow][col] = {
          letter: letters[col],
          state: LETTER_STATES.GREY
        };
      }
      
      setGrid(newGrid);
      
      // Focus on the first input of the current row
      setTimeout(() => {
        const firstInput = inputRefs.current[currentRow][0].current;
        if (firstInput) {
          firstInput.focus();
        }
      }, 0);
    }
  };

  const handleKeyDown = (e, row, col) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      moveToNextRow();
    } else if (e.key === 'Backspace' || e.key === 'Delete') {
      e.preventDefault();
      const newGrid = [...grid];
      
      // If current cell is empty, move to previous cell and delete it
      if (!newGrid[row][col].letter && col > 0) {
        newGrid[row][col - 1].letter = '';
        newGrid[row][col - 1].state = LETTER_STATES.EMPTY;
        setGrid(newGrid);
        
        // Focus previous input
        const prevInput = inputRefs.current[row][col - 1].current;
        if (prevInput) {
          prevInput.focus();
        }
      } else {
        // Delete current cell content
        newGrid[row][col].letter = '';
        newGrid[row][col].state = LETTER_STATES.EMPTY;
        setGrid(newGrid);
      }
    }
  };

  const handleLetterChange = (row, col, value) => {
    const newGrid = [...grid];
    newGrid[row][col].letter = value.toUpperCase();
    // Auto-grey letters when typed
    if (value && newGrid[row][col].state === LETTER_STATES.EMPTY) {
      newGrid[row][col].state = LETTER_STATES.GREY;
    } else if (!value) {
      newGrid[row][col].state = LETTER_STATES.EMPTY;
    }
    setGrid(newGrid);
    
    // Auto-advance to next input
    if (value && col < COLS - 1) {
      const nextInput = inputRefs.current[row][col + 1].current;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleStateChange = (row, col) => {
    const newGrid = [...grid];
    const currentState = newGrid[row][col].state;
    
    // Cycle through states: empty -> grey -> yellow -> green -> empty
    switch (currentState) {
      case LETTER_STATES.EMPTY:
        newGrid[row][col].state = LETTER_STATES.GREY;
        break;
      case LETTER_STATES.GREY:
        newGrid[row][col].state = LETTER_STATES.YELLOW;
        break;
      case LETTER_STATES.YELLOW:
        newGrid[row][col].state = LETTER_STATES.GREEN;
        break;
      case LETTER_STATES.GREEN:
        newGrid[row][col].state = LETTER_STATES.EMPTY;
        break;
      default:
        newGrid[row][col].state = LETTER_STATES.EMPTY;
    }
    
    setGrid(newGrid);
  };

  const moveToNextRow = () => {
    if (currentRow < ROWS - 1) {
      const newGrid = [...grid];
      const currentRowData = grid[currentRow];
      
      // Prefill green letters in the next row
      for (let col = 0; col < COLS; col++) {
        if (currentRowData[col].state === LETTER_STATES.GREEN) {
          newGrid[currentRow + 1][col] = {
            letter: currentRowData[col].letter,
            state: LETTER_STATES.GREEN
          };
        }
      }
      
      setGrid(newGrid);
      setCurrentRow(currentRow + 1);
      
      // Refresh king word for the new row
      setTimeout(() => {
        refreshKingWord();
      }, 100);
    }
  };

  const resetGame = () => {
    setGrid(Array(ROWS).fill().map(() => 
      Array(COLS).fill().map(() => ({
        letter: '',
        state: LETTER_STATES.EMPTY
      }))
    ));
    setCurrentRow(0);
    setFilteredWords(wordList);
    setSuggestions(wordList.slice(0, 10));
    // Reset input refs
    inputRefs.current = Array(ROWS).fill().map(() => Array(COLS).fill().map(() => createRef()));
  };

  const getStateClass = (state) => {
    switch (state) {
      case LETTER_STATES.GREEN:
        return 'bg-green-500 text-white border-green-600 dark:bg-green-600 dark:border-green-700';
      case LETTER_STATES.YELLOW:
        return 'bg-yellow-500 text-white border-yellow-600 dark:bg-yellow-600 dark:border-yellow-700';
      case LETTER_STATES.GREY:
        return 'bg-gray-500 text-white border-gray-600 dark:bg-gray-600 dark:border-gray-700';
      default:
        return 'bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600';
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 dark:bg-blue-900 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-green-200 dark:bg-green-900 rounded-full opacity-20 animate-pulse animation-delay-2s"></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-200 dark:bg-yellow-900 rounded-full opacity-20 animate-pulse animation-delay-4s"></div>
          <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-200 dark:bg-purple-900 rounded-full opacity-20 animate-pulse animation-delay-6s"></div>
        </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Wordle Solver</h1>
          <p className="text-gray-600 dark:text-gray-300">Enter your guesses and click each letter to set its color based on the game feedback</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Game Grid */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-6 gap-2 mb-6 items-center">
                {grid.map((row, rowIndex) => [
                  // Row indicator
                  <div key={`indicator-${rowIndex}`} className="flex justify-center items-center">
                    {currentRow === rowIndex ? (
                      <div className="w-0 h-0 border-l-[8px] border-l-blue-500 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent"></div>
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500 text-sm font-bold">{rowIndex + 1}</span>
                    )}
                  </div>,
                  // Letter boxes
                  ...row.map((cell, colIndex) => (
                    <div key={`${rowIndex}-${colIndex}`} className="relative">
                      <input
                        ref={inputRefs.current[rowIndex][colIndex]}
                        type="text"
                        maxLength="1"
                        value={cell.letter}
                        onChange={(e) => handleLetterChange(rowIndex, colIndex, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                        onClick={() => handleStateChange(rowIndex, colIndex)}
                        className={`w-12 h-12 text-center text-lg font-bold border-2 rounded-md transition-colors duration-200 cursor-pointer ${getStateClass(cell.state)}`}
                        title="Type letter and click to change color state"
                      />
                    </div>
                  ))
                ]).flat()}
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={moveToNextRow}
                  disabled={currentRow >= ROWS - 1}
                  className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                >
                  Next Row
                </button>
                <button
                  onClick={resetGame}
                  className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded hover:bg-red-600 dark:hover:bg-red-700 transition-colors"
                >
                  Reset
                </button>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-300">
                <p className="mb-2"><strong>Instructions:</strong></p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Type letters directly into the boxes</li>
                  <li>Click each letter to cycle through colors:</li>
                  <li className="ml-4"><span className="inline-block w-4 h-4 bg-gray-500 mr-2 rounded-sm"></span>Grey: Letter not in word</li>
                  <li className="ml-4"><span className="inline-block w-4 h-4 bg-yellow-500 mr-2 rounded-sm"></span>Yellow: Letter in word, wrong position</li>
                  <li className="ml-4"><span className="inline-block w-4 h-4 bg-green-500 mr-2 rounded-sm"></span>Green: Letter in correct position</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Suggestions Panel */}
          <div className="lg:w-80">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Word Suggestions</h3>
              
              {/* King Word Recommendation */}
              {kingWord && (
                <div className="mb-4 p-3 bg-gradient-to-r from-yellow-100 to-amber-100 dark:from-yellow-900 dark:to-amber-900 rounded-lg border border-yellow-300 dark:border-yellow-700">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-yellow-800 dark:text-yellow-200">👑 King Word Recommendation</h4>
                    <button
                      onClick={refreshKingWord}
                      className="text-xs px-2 py-1 bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 rounded hover:bg-yellow-300 dark:hover:bg-yellow-700 transition-colors font-semibold"
                      title="Get another random king word"
                    >
                      🎲 Next
                    </button>
                  </div>
                  <div className="text-center mb-2">
                    <span className="font-mono text-xl font-bold text-yellow-900 dark:text-yellow-100 bg-yellow-200 dark:bg-yellow-800 px-3 py-1 rounded tracking-widest">{kingWord}</span>
                  </div>
                  <div className="text-center mb-2">
                    <button
                      onClick={useKingWord}
                      className="text-sm px-4 py-2 bg-yellow-600 dark:bg-yellow-700 text-white rounded hover:bg-yellow-700 dark:hover:bg-yellow-600 transition-colors font-semibold shadow-sm"
                      title="Fill this word into the current row"
                    >
                      ✨ Use This Word
                    </button>
                  </div>
                  <p className="text-xs text-yellow-700 dark:text-yellow-300 text-center">
                    {currentRow === 0 ? 'Random best starting word from the kingdom' : 'Random best word from remaining kingdom'}
                  </p>
                </div>
              )}
              
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Possible words: <span className="font-bold text-blue-600 dark:text-blue-400">{filteredWords.length}</span>
              </p>
              
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {suggestions.map((word, index) => (
                  <div
                    key={word}
                    className="p-3 bg-gray-50 dark:bg-gray-700 rounded border hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="font-mono text-lg text-gray-800 dark:text-gray-100">{word}</span>
                  </div>
                ))}
                {suggestions.length === 0 && (
                  <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                    No words match the current criteria
                  </div>
                )}
              </div>

              {filteredWords.length > 10 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                  Showing top 10 suggestions of {filteredWords.length} possible words
                </p>
              )}
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default WordleSolver;