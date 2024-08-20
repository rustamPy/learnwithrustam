'use client';
import { useState } from 'react';
import PdfViewer from '@/components/PdfViewer';
import AudioPlayer from '@/components/AudioPlayer';
import { Typography, Chip, Card } from '@material-tailwind/react';

const pdfFile = 'book1.pdf'; // Path to your PDF file

// Audio map: Define the audio files for each page
const audioMap = {
    0: ['/audios/101A1; 101A2.m4a'],
    1: ['/audios/101A3', '/audios/101A5.m4a'],
    2: ['/audios/101B1.m4a', '/audios/101B2.m4a', '/audios/101B3.m4a', '/audios/101B4.m4a'],
    3: ['/audios/101C1.m4a', '/audios/101C2.m4a'],
    4: ['/audios/101D1.m4a', '/audios/101E1.m4a', '/audios/101E2.m4a'],
    5: ['/audios/101F1.m4a', '/audios/101F3.m4a', '/audios/101G1.m4a'],
    6: ['/audios/102A1.m4a'],
    7: ['/audios/102B1.m4a', '/audios/102B3.m4a'],
    8: ['/audios/102C1.m4a'],
    9: ['/audios/102D1.m4a', '/audios/102D2.m4a'],
    10: [],
    11: ['/audios/102E1.m4a', '/audios/102E3.m4a', '/audios/102E4.m4a'],
    12: ['/audios/102F1.m4a'],
    13: ['/audios/102G1.m4a'],
    14: ['/audios/103A1.m4a'],
    15: ['/audios/103A2.m4a'],
    16: ['/audios/103A4.m4a'],
    17: ['/audios/103B1.m4a'],
    18: ['/audios/103C1.m4a'],
    19: ['/audios/103C3.m4a'],
    20: ['/audios/103D1.m4a'],
    21: [],
    22: ['/audios/104A1.m4a'],
    23: ['/audios/104A2.m4a'],
    24: [],
    25: ['/audios/104C1.m4a', '/audios/104C3.m4a'],
    26: ['/audios/104C6.m4a', '/audios/104C7.m4a'],
    27: [],
    28: ['/audios/105A1.m4a'],
    29: ['/audios/105B1.m4a', '/audios/105B4.m4a'],
    30: ['/audios/105C1.m4a'],
    31: ['/audios/105D1.m4a'],
    32: [],
    33: [],
    34: ['/audios/106A1; 106A2.m4a'],
    35: ['/audios/106A1; 106A2.m4a'],
    36: [],
    37: ['/audios/106B2.m4a'],
    38: ['/audios/106B3.m4a', '/audios/106B4.m4a'],
    39: ['/audios/106B5.m4a'],
    40: ['/audios/107A1.m4a'],
    41: [],
    42: ['/audios/107B1 Dialog 1.m4a'],
    43: ['/audios/107B1 Dialog 2; 107B5.m4a', '/audios/107B6; 107B7.m4a'],
    44: [],
    45: ['/audios/107C2 A.m4a', '/audios/107C2 B.m4a', '/audios/107C2 C.m4a'],
    46: ['/audios/108A1.m4a', '/audios/108A2.m4a'],
    47: ['/audios/108A4.m4a'],
    48: ['/audios/108A7.m4a'],
    49: ['/audios/108A9.m4a', '/audios/108B1.m4a'],
    50: ['/audios/108C2.m4a', '/audios/108C3.m4a'],
    51: [],
    52: [],
    53: [],
    54: [],
    55: [],
    56: [],
    57: [],
    58: [],
    59: [],
    60: [],
    61: [],
    62: [],
    63: [],
    64: [],
    65: [],
    66: [],
    67: [],
    68: [],
    69: [],
    70: [],
    71: [],
    72: [],
    73: [],
    74: [],
    75: [],
    76: [],
    77: [],
    78: [],
    79: [],
    80: [],
    81: [],
    82: [],
    83: [],
    84: [],
    85: [],
    86: [],
    87: [],
    88: [],
    89: [],
    90: [],
    91: [],
    92: [],
    93: [],
    94: [],
    95: [],
    96: [],
    97: [],
    98: [],
    99: [],
    100: [],
    101: [],
    102: [],
    103: [],
    104: [],
    105: [],
    106: [],
    107: [],
    108: [],
    109: [],
    100: [],
    111: [],
    112: [],
    113: [],
    114: [],
    115: [],
    116: [],
    117: [],
    118: [],
    119: [],
    120: [],
    121: [],
    122: [],
    123: [],
    124: [],
    125: [],
    126: [],
    127: [],
    128: [],
    129: [],

    // Add more pages and audios as needed
};

// Chapter map: Define the chapters and their page ranges
const chapterMap = [
    {
        range: [0, 5], name: 'Lekcja 1', description: 'PIERWSZY DZIEŃ W SZKOLE'
    },
    {
        range: [6, 13], name: 'Lekcja 2', description: 'CZEŚĆ, SKĄD JESTEŚ?'
    },
    {
        range: [14, 21], name: 'Lekcja 3', description: 'MAMI, KTO TO JEST?'
    },
    {
        range: [22, 27], name: 'Lekcja 4', description: 'JAKI JESTEŚ?'
    },
    {
        range: [28, 33], name: 'Lekcja 5', description: 'JESTEŚ INSTRUKTOREM TANGA?'
    },
    {
        range: [34, 39], name: 'Lekcja 6', description: 'CO ROBISZ? NUDZĘ SIĘ!'
    },
    {
        range: [40, 45], name: 'Lekcja 7', description: 'MAŁE ZAKUPY'
    },
    {
        range: [46, 51], name: 'Lekcja 8', description: 'MAMI, JESTEŚ GŁODNA?'
    },
    {
        range: [52, 57], name: 'Lekcja 9', description: 'LUBISZ MARCHEWKĘ?'
    },
    {
        range: [58, 63], name: 'Lekcja 10', description: 'UWIELBIAM POLSKIE JEDZENIE!'
    },
];

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [visibleAudio, setVisibleAudio] = useState(null);

    const handlePageChange = ({ currentPage }) => {
        setCurrentPage(currentPage);
        setVisibleAudio(null); // Reset visible audio on page change
    };

    const toggleAudio = (index) => {
        setVisibleAudio(visibleAudio === index ? null : index);
    };

    // Find the current chapter based on the currentPage
    const currentChapter = chapterMap.find(
        (chapter) => currentPage >= chapter.range[0] && currentPage <= chapter.range[1]
    );

    // Calculate the total number of audios for the current chapter
    const totalAudios = currentChapter
        ? chapterMap.reduce((total, chapter) => {
            if (chapter.range[0] >= currentChapter.range[0] && chapter.range[1] <= currentChapter.range[1]) {
                return total + Object.values(audioMap).slice(chapter.range[0], chapter.range[1] + 1).flat().length;
            }
            return total;
        }, 0)
        : 0;

    return (
        <div className="flex h-screen">
            <div className="flex-1 border-r border-gray-300 p-4">
                <PdfViewer fileUrl={pdfFile} onPageChange={handlePageChange} />
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
                {currentChapter ? (
                    <Card className="bg-white p-4 rounded-lg shadow-md mb-4">
                        <Typography variant="h3" className="text-2xl font-semibold mb-2 text-gray-800">{currentChapter.name}</Typography>
                        <Typography className="text-lg mb-4 text-gray-600">{currentChapter.description}</Typography>
                        <Typography className="text-md mb-4 font-medium text-gray-700">Total number of audios: <span className="font-bold text-blue-600">{totalAudios}</span></Typography>
                        {audioMap[currentPage]?.length ? (
                            audioMap[currentPage].map((audioSrc, index) => {
                                const audioLabel = audioSrc.split('/').pop().split('.').shift();
                                return (
                                    <div
                                        key={index}
                                        className="mb-2 p-3 border border-gray-300 rounded-lg bg-white shadow-sm cursor-pointer transition-colors duration-300 hover:bg-gray-50"
                                        onClick={() => toggleAudio(index)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <Typography
                                                variant="lead"
                                                className="text-sm font-medium text-gray-800"
                                            >
                                                {audioLabel}
                                            </Typography>
                                            <button
                                                className="text-blue-500 hover:underline focus:outline-none"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleAudio(index);
                                                }}
                                            >
                                                {visibleAudio === index ? 'Hide' : 'Show'}
                                            </button>
                                        </div>
                                        <AudioPlayer audioSrc={audioSrc} visible={visibleAudio === index} />
                                    </div>
                                );
                            })
                        ) : (
                            <Typography>No audio tasks for this page.</Typography>
                        )}
                    </Card>
                ) : (
                    <Typography>No chapter information available for this page.</Typography>
                )}
            </div>
        </div>
    );
};

export default Page;
