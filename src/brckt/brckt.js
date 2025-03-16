import React, {useRef, useState} from 'react';
import html2canvas from 'html2canvas';
import './br-ckt.css';

const initialTeams = {
    east: [
        { seed: 1, name: "UConn", score: null },
        { seed: 16, name: "Stetson", score: null },
        { seed: 8, name: "FAU", score: null },
        { seed: 9, name: "Northwestern", score: null },
        { seed: 5, name: "San Diego St", score: null },
        { seed: 12, name: "UAB", score: null },
        { seed: 4, name: "Auburn", score: null },
        { seed: 13, name: "Yale", score: null },
        { seed: 6, name: "BYU", score: null },
        { seed: 11, name: "Duquesne", score: null },
        { seed: 3, name: "Illinois", score: null },
        { seed: 14, name: "Morehead St", score: null },
        { seed: 7, name: "Washington St", score: null },
        { seed: 10, name: "Drake", score: null },
        { seed: 2, name: "Iowa St", score: null },
        { seed: 15, name: "South Dakota St", score: null },
    ],
    west: [
        { seed: 1, name: "North Carolina", score: null },
        { seed: 16, name: "Howard", score: null },
        { seed: 8, name: "Mississippi St", score: null },
        { seed: 9, name: "Michigan St", score: null },
        { seed: 5, name: "Saint Mary's", score: null },
        { seed: 12, name: "Grand Canyon", score: null },
        { seed: 4, name: "Alabama", score: null },
        { seed: 13, name: "Charleston", score: null },
        { seed: 6, name: "Clemson", score: null },
        { seed: 11, name: "New Mexico", score: null },
        { seed: 3, name: "Baylor", score: null },
        { seed: 14, name: "Colgate", score: null },
        { seed: 7, name: "Dayton", score: null },
        { seed: 10, name: "Nevada", score: null },
        { seed: 2, name: "Arizona", score: null },
        { seed: 15, name: "Long Beach St", score: null },
    ],
    south: [
        { seed: 1, name: "Houston", score: null },
        { seed: 16, name: "Longwood", score: null },
        { seed: 8, name: "Nebraska", score: null },
        { seed: 9, name: "Texas A&M", score: null },
        { seed: 5, name: "Wisconsin", score: null },
        { seed: 12, name: "James Madison", score: null },
        { seed: 4, name: "Duke", score: null },
        { seed: 13, name: "Vermont", score: null },
        { seed: 6, name: "Texas Tech", score: null },
        { seed: 11, name: "NC State", score: null },
        { seed: 3, name: "Kentucky", score: null },
        { seed: 14, name: "Oakland", score: null },
        { seed: 7, name: "Florida", score: null },
        { seed: 10, name: "Colorado", score: null },
        { seed: 2, name: "Marquette", score: null },
        { seed: 15, name: "Western Kentucky", score: null },
    ],
    midwest: [
        { seed: 1, name: "Purdue", score: null },
        { seed: 16, name: "Grambling St", score: null },
        { seed: 8, name: "Utah St", score: null },
        { seed: 9, name: "TCU", score: null },
        { seed: 5, name: "Gonzaga", score: null },
        { seed: 12, name: "McNeese", score: null },
        { seed: 4, name: "Kansas", score: null },
        { seed: 13, name: "Samford", score: null },
        { seed: 6, name: "South Carolina", score: null },
        { seed: 11, name: "Oregon", score: null },
        { seed: 3, name: "Creighton", score: null },
        { seed: 14, name: "Akron", score: null },
        { seed: 7, name: "Texas", score: null },
        { seed: 10, name: "Virginia", score: null },
        { seed: 2, name: "Tennessee", score: null },
        { seed: 15, name: "Saint Peter's", score: null },
        ]
};

const regions = ['east', 'west', 'south', 'midwest'];

const getRandomWinner = (teamA, teamB) => {
    if (Math.random() < 0.5) {
        [teamA, teamB] = [teamB, teamA];
    }

    if (teamA.seed === teamB.seed) {
        return Math.random() < 0.5 ? teamA : teamB;
    }

    const upsetOdds = {
        '1v16': 0.987, '1v15': 0.950, '1v14': 0.940, '1v13': 1.000,
        '1v12': 1.000, '1v11': 0.600, '1v10': 0.875, '1v9': 0.909,
        '1v8': 0.787, '1v7': 0.857, '1v6': 0.706, '1v5': 0.803,
        '1v4': 0.691, '1v3': 0.643, '1v2': 0.551, '1v1': 0.500,

        '2v16': 0.920, '2v15': 0.929, '2v14': 0.890, '2v13': 0.870, '2v12': 1.000,
        '2v11': 0.800, '2v10': 0.646, '2v9': 0.667, '2v8': 0.400,
        '2v7': 0.705, '2v6': 0.703, '2v5': 0.250, '2v4': 0.500,
        '2v3': 0.603, '2v2': 0.500,

        '3v16': 0.880, '3v15': 0.667, '3v14': 0.853, '3v13': 0.850, '3v12': 0.820,
        '3v11': 0.677, '3v10': 0.692, '3v9': 0.750, '3v8': 0.830,
        '3v7': 0.632, '3v6': 0.577, '3v5': 0.500, '3v4': 0.556,
        '3v3': 0.500,

        '4v16': 0.860, '4v15': 0.840, '4v14': 0.820, '4v13': 0.788,
        '4v12': 0.717, '4v11': 0.550, '4v10': 0.780, '4v9': 0.400,
        '4v8': 0.385, '4v7': 0.333, '4v6': 0.429, '4v5': 0.567,
        '4v4': 0.500,

        '5v16': 0.840, '5v15': 0.820, '5v14': 0.800, '5v13': 0.857,
        '5v12': 0.670, '5v11': 0.630, '5v10': 0.660, '5v9': 0.400,
        '5v8': 0.250, '5v7': 0.520, '5v6': 0.667, '5v5': 0.500,

        '6v16': 0.820, '6v15': 0.790, '6v14': 0.875, '6v13': 0.770,
        '6v12': 0.750, '6v11': 0.619, '6v10': 0.600, '6v9': 0.580,
        '6v8': 0.250, '6v7': 0.333, '6v6': 0.500,

        '7v16': 0.800, '7v15': 0.333, '7v14': 0.760, '7v13': 0.740,
        '7v12': 0.720, '7v11': 0.500, '7v10': 0.609, '7v9': 0.560,
        '7v8': 0.500, '7v7': 0.500,

        '8v16': 0.780, '8v15': 0.760, '8v14': 0.740, '8v13': 0.720,
        '8v12': 0.680, '8v11': 0.550, '8v10': 0.560, '8v9': 0.506,
        '8v8': 0.500,

        '9v16': 0.760, '9v15': 0.740, '9v14': 0.720, '9v13': 0.700,
        '9v12': 0.660, '9v11': 0.520, '9v10': 0.520, '9v9': 0.500,

        '10v16': 0.740, '10v15': 1.000, '10v14': 0.700, '10v13': 0.680,
        '10v12': 0.640, '10v11': 0.500, '10v10': 0.500,

        '11v16': 0.720, '11v15': 0.700, '11v14': 1.000, '11v13': 0.640,
        '11v12': 0.600, '11v11': 0.500,

        '12v16': 0.700, '12v15': 0.680, '12v14': 0.660, '12v13': 0.750,
        '12v12': 0.500,

        '13v16': 0.680, '13v15': 0.660, '13v14': 0.630, '13v13': 0.500,

        '14v16': 0.660, '14v15': 0.630, '14v14': 0.500,

        '15v16': 0.650, '15v15': 0.500,

        '16v16': 0.500
    };

    const lowerSeedTeam = teamA.seed < teamB.seed ? teamA : teamB;
    const higherSeedTeam = teamA.seed > teamB.seed ? teamA : teamB;

    const oddsKey1 = `${lowerSeedTeam.seed}v${higherSeedTeam.seed}`;
    const oddsKey2 = `${higherSeedTeam.seed}v${lowerSeedTeam.seed}`;

    let winChance = upsetOdds[oddsKey1] || upsetOdds[oddsKey2];

    if (winChance === undefined) {
        winChance = 0.5;
    }

    return Math.random() < winChance ? lowerSeedTeam : higherSeedTeam;
};

const isMobileDevice = () => {
    return window.innerWidth >= 768;
};

const Brckt = () => {
    const [bracket, setBracket] = useState({
        roundOf64: {...initialTeams},
        roundOf32: {
            east: Array(8).fill(null),
            west: Array(8).fill(null),
            south: Array(8).fill(null),
            midwest: Array(8).fill(null)
        },
        sweet16: {
            east: Array(4).fill(null),
            west: Array(4).fill(null),
            south: Array(4).fill(null),
            midwest: Array(4).fill(null)
        },
        elite8: {
            east: Array(2).fill(null),
            west: Array(2).fill(null),
            south: Array(2).fill(null),
            midwest: Array(2).fill(null)
        },
        final4: {
            eastWest: Array(1).fill(null),
            southMidwest: Array(1).fill(null)
        },
        championship: null
    });

    const bracketRef = useRef(null);
    const nameRef = useRef(null);

    const generateBracket = () => {
        // Create a copy of initial bracket
        const newBracket = {
            roundOf64: {...initialTeams},
            roundOf32: {
                east: Array(8).fill(null),
                west: Array(8).fill(null),
                south: Array(8).fill(null),
                midwest: Array(8).fill(null)
            },
            sweet16: {
                east: Array(4).fill(null),
                west: Array(4).fill(null),
                south: Array(4).fill(null),
                midwest: Array(4).fill(null)
            },
            elite8: {
                east: Array(2).fill(null),
                west: Array(2).fill(null),
                south: Array(2).fill(null),
                midwest: Array(2).fill(null)
            },
            final4: {
                eastWest: Array(1).fill(null),
                southMidwest: Array(1).fill(null)
            },
            championship: null
        };

        // Round of 32
        const regions = ['east', 'west', 'south', 'midwest'];
        regions.forEach(region => {
            for (let i = 0; i < 8; i++) {
                const teamA = newBracket.roundOf64[region][i * 2];
                const teamB = newBracket.roundOf64[region][i * 2 + 1];
                const winner = getRandomWinner(teamA, teamB);

                // Add winner to round of 32
                newBracket.roundOf32[region][i] = {
                    seed: winner.seed,
                    name: winner.name,
                    score: null
                };
            }
        });

        // Sweet 16
        regions.forEach(region => {
            for (let i = 0; i < 4; i++) {
                const teamA = newBracket.roundOf32[region][i * 2];
                const teamB = newBracket.roundOf32[region][i * 2 + 1];
                const winner = getRandomWinner(teamA, teamB);

                // Add winner to Sweet 16
                newBracket.sweet16[region][i] = {
                    seed: winner.seed,
                    name: winner.name,
                    score: null
                };
            }
        });

        // Elite 8
        regions.forEach(region => {
            for (let i = 0; i < 2; i++) {
                const teamA = newBracket.sweet16[region][i * 2];
                const teamB = newBracket.sweet16[region][i * 2 + 1];
                if (teamA && teamB) { // Ensure both teams exist
                    const winner = getRandomWinner(teamA, teamB);

                    // Add winner to Elite 8
                    newBracket.elite8[region][i] = {
                        seed: winner.seed,
                        name: winner.name,
                        score: null
                    };
                }
            }
        });

        // Final 4
        // East vs West
        const eastChampion = newBracket.elite8.east[0];
        const westChampion = newBracket.elite8.west[0];
        if (eastChampion && westChampion) {
            const eastTeam = {
                seed: eastChampion.seed,
                name: eastChampion.name,
                score: null,
                region: 'east'
            };

            const westTeam = {
                seed: westChampion.seed,
                name: westChampion.name,
                score: null,
                region: 'west'
            };

            newBracket.final4.eastWest[0] = eastTeam;
            newBracket.final4.eastWest[1] = westTeam;

            const eastWestWinner = getRandomWinner(eastTeam, westTeam);
            newBracket.final4.eastWestWinner = { ...eastWestWinner };
        }

        // South vs Midwest
        const southChampion = newBracket.elite8.south[0];
        const midwestChampion = newBracket.elite8.midwest[0];
        if (southChampion && midwestChampion) {
            const southTeam = {
                seed: southChampion.seed,
                name: southChampion.name,
                score: null,
                region: 'south'
            };

            const midwestTeam = {
                seed: midwestChampion.seed,
                name: midwestChampion.name,
                score: null,
                region: 'midwest'
            };

            newBracket.final4.southMidwest[0] = southTeam;
            newBracket.final4.southMidwest[1] = midwestTeam;

            const southMidwestWinner = getRandomWinner(southTeam, midwestTeam);
            newBracket.final4.southMidwestWinner = { ...southMidwestWinner };
        }

        // Championship game
        if (newBracket.final4.eastWestWinner && newBracket.final4.southMidwestWinner) {
            const finalist1 = newBracket.final4.eastWestWinner;
            const finalist2 = newBracket.final4.southMidwestWinner;

            const champion = getRandomWinner(finalist1, finalist2);

            newBracket.championship = {
                seed: champion.seed,
                name: champion.name,
                region: champion.region,
                score: null
            };
        }

        setBracket(newBracket);
    };

    const downloadBracket = () => {
        if (!bracketRef.current) return;

        html2canvas(bracketRef.current, {
            backgroundColor: null,
            scale: 2,
            width: bracketRef.current.scrollWidth,
            height: bracketRef.current.scrollHeight,
            x: 0,
            y: 0
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'march-madness-bracket.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    };

    const handleScrollToBracket = () => {
        nameRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const getScoreText = (team) => {
        return team.score !== null ? `(${team.score})` : '';
    };

    return (
        <div className="full">
            <div className="container">
                <h1 className="heading text-center">march madness bracket generator</h1>

                <div ref={nameRef} className="flex-center mb-8">
                    <button
                        onClick={() => {
                            generateBracket();
                            handleScrollToBracket();
                        }}
                        className="animated-button"
                    >
                        generate random bracket
                    </button>

                    {isMobileDevice() && (
                        <button
                            onClick={downloadBracket}
                            className="button"
                            disabled={!bracket.championship}
                        >
                            download bracket
                        </button>
                    )}
                </div>

                <div ref={bracketRef} className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="grid grid--cols-1 md:grid-cols-7 gap-1">
                        {/* Round of 64 - First Column */}
                        <div className="grid__col">
                            <h3 className="text-center">round of 64</h3>
                            <div className="grid grid--cols-4 gap-1">
                                {regions.map(region => (
                                    <div key={region} className="grid__col">
                                        <h4 className="text-xs font-bold text-center mb-1 uppercase">{region}</h4>
                                        <div className="space-y-1">
                                            {bracket.roundOf64[region].map((team, idx) => {
                                                if (idx % 2 === 0) {
                                                    const matchupIndex = Math.floor(idx / 2);
                                                    const winner = bracket.roundOf32[region][matchupIndex];
                                                    const teamA = bracket.roundOf64[region][idx];
                                                    const teamB = bracket.roundOf64[region][idx + 1];
                                                    const isWinnerA = winner && teamA.name === winner.name;
                                                    const isWinnerB = winner && teamB.name === winner.name;

                                                    return (
                                                        <div className="matchup-container"
                                                             key={`${region}-${matchupIndex}`}>
                                                            <div
                                                                className={`team-container ${isWinnerA ? 'team-container--winner' : ''}`}>
                                                                <div className="text-xs border px-1 py-0.5">
                                                                    ({teamA.seed}) {teamA.name} {getScoreText(teamA)}
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`team-container ${isWinnerB ? 'team-container--winner' : ''}`}>
                                                                <div className="text-xs border px-1 py-0.5">
                                                                    ({teamB.seed}) {teamB.name} {getScoreText(teamB)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Round of 32 - Second Column */}
                        <div className="grid__col">
                            <h3 className="text-center">round of 32</h3>
                            <div className="grid grid--cols-4 gap-1">
                                {regions.map(region => (
                                    <div key={region} className="grid__col">
                                        <div className="space-y-2">
                                            {bracket.roundOf32[region].map((team, idx) => {
                                                if (idx % 2 === 0) {
                                                    const matchupIndex = Math.floor(idx / 2);
                                                    const winner = bracket.sweet16[region][matchupIndex];
                                                    const teamA = bracket.roundOf32[region][idx];
                                                    const teamB = bracket.roundOf32[region][idx + 1];
                                                    const isWinnerA = winner && teamA && teamA.name === winner.name;
                                                    const isWinnerB = winner && teamB && teamB.name === winner.name;

                                                    return (
                                                        <div className="matchup-container"
                                                             key={`${region}-${matchupIndex}`}>
                                                            {teamA && (
                                                                <div
                                                                    className={`team-container ${isWinnerA ? 'team-container--winner' : ''}`}>
                                                                    <div className="text-xs border px-1 py-0.5">
                                                                        ({teamA.seed}) {teamA.name} {getScoreText(teamA)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {teamB && (
                                                                <div
                                                                    className={`team-container ${isWinnerB ? 'team-container--winner' : ''}`}>
                                                                    <div className="text-xs border px-1 py-0.5">
                                                                        ({teamB.seed}) {teamB.name} {getScoreText(teamB)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sweet 16 - Third Column */}
                        <div className="grid__col">
                            <h3 className="text-center">sweet 16</h3>
                            <div className="grid grid--cols-4 gap-1">
                                {regions.map(region => (
                                    <div key={region} className="grid__col">
                                        <div className="space-y-4">
                                            {bracket.sweet16[region].map((team, idx) => {
                                                if (idx % 2 === 0) {
                                                    const matchupIndex = Math.floor(idx / 2);
                                                    const winner = bracket.elite8[region][matchupIndex];
                                                    const teamA = bracket.sweet16[region][idx];
                                                    const teamB = bracket.sweet16[region][idx + 1];
                                                    const isWinnerA = winner && teamA && teamA.name === winner.name;
                                                    const isWinnerB = winner && teamB && teamB.name === winner.name;

                                                    return (
                                                        <div className="matchup-container"
                                                             key={`${region}-${matchupIndex}`}>
                                                            {teamA && (
                                                                <div
                                                                    className={`team-container ${isWinnerA ? 'team-container--winner' : ''}`}>
                                                                    <div className="text-xs border px-1 py-0.5">
                                                                        ({teamA.seed}) {teamA.name} {getScoreText(teamA)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {teamB && (
                                                                <div
                                                                    className={`team-container ${isWinnerB ? 'team-container--winner' : ''}`}>
                                                                    <div className="text-xs border px-1 py-0.5">
                                                                        ({teamB.seed}) {teamB.name} {getScoreText(teamB)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Elite 8 - Fourth Column */}
                        <div className="grid__col">
                            <h3 className="text-center">elite 8</h3>
                            <div className="grid grid--cols-4 gap-1">
                                {regions.map(region => (
                                    <div key={region} className="grid__col">
                                        <div className="space-y-6">
                                            {bracket.elite8[region].map((team, idx) => {
                                                if (idx % 2 === 0) {
                                                    const teamA = bracket.elite8[region][idx];
                                                    const teamB = bracket.elite8[region][idx + 1];

                                                    const isWinnerA =
                                                        (region === 'east' && bracket.final4.eastWest &&
                                                            bracket.final4.eastWest[0] &&
                                                            teamA &&
                                                            bracket.final4.eastWest[0].name === teamA.name) ||

                                                        (region === 'west' && bracket.final4.eastWest &&
                                                            bracket.final4.eastWest[1] &&
                                                            teamA &&
                                                            bracket.final4.eastWest[1].name === teamA.name) ||

                                                        (region === 'south' && bracket.final4.southMidwest &&
                                                            bracket.final4.southMidwest[0] &&
                                                            teamA &&
                                                            bracket.final4.southMidwest[0].name === teamA.name) ||

                                                        (region === 'midwest' && bracket.final4.southMidwest &&
                                                            bracket.final4.southMidwest[1] &&
                                                            teamA &&
                                                            bracket.final4.southMidwest[1].name === teamA.name);

                                                    const isWinnerB =
                                                        (region === 'east' && bracket.final4.eastWest &&
                                                            bracket.final4.eastWest[0] &&
                                                            teamB &&
                                                            bracket.final4.eastWest[0].name === teamB.name) ||

                                                        (region === 'west' && bracket.final4.eastWest &&
                                                            bracket.final4.eastWest[1] &&
                                                            teamB &&
                                                            bracket.final4.eastWest[1].name === teamB.name) ||

                                                        (region === 'south' && bracket.final4.southMidwest &&
                                                            bracket.final4.southMidwest[0] &&
                                                            teamB &&
                                                            bracket.final4.southMidwest[0].name === teamB.name) ||

                                                        (region === 'midwest' && bracket.final4.southMidwest &&
                                                            bracket.final4.southMidwest[1] &&
                                                            teamB &&
                                                            bracket.final4.southMidwest[1].name === teamB.name);

                                                    return (
                                                        <div className="matchup-container" key={`${region}-${idx}`}>
                                                            {teamA && (
                                                                <div
                                                                    className={`team-container ${isWinnerA ? 'team-container--winner' : ''}`}>
                                                                    <div className="text-xs border px-1 py-0.5">
                                                                        ({teamA.seed}) {teamA.name} {getScoreText(teamA)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                            {teamB && (
                                                                <div
                                                                    className={`team-container ${isWinnerB ? 'team-container--winner' : ''}`}>
                                                                    <div className="text-xs border px-1 py-0.5">
                                                                        ({teamB.seed}) {teamB.name} {getScoreText(teamB)}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Final Four - Fifth Column */}
                        <div className="grid__col">
                            <h3 className="text-center">final 4</h3>
                            <div className="grid grid--cols-2 gap-2">
                                <div className="grid__col">
                                    <div className="space-y-6">
                                        {bracket.final4.eastWest.length > 0 && (
                                            <div className="matchup-container">
                                                {bracket.final4.eastWest[0] && (
                                                    <div className={`team-container ${bracket.final4.eastWestWinner && bracket.final4.eastWestWinner.name === bracket.final4.eastWest[0].name ? 'team-container--winner' : ''}`}>
                                                        <div className="text-xs border px-1 py-0.5">
                                                            ({bracket.final4.eastWest[0].seed}) {bracket.final4.eastWest[0].name} {getScoreText(bracket.final4.eastWest[0])}
                                                        </div>
                                                    </div>
                                                )}
                                                {bracket.final4.eastWest[1] && (
                                                    <div className={`team-container ${bracket.final4.eastWestWinner && bracket.final4.eastWestWinner.name === bracket.final4.eastWest[1].name ? 'team-container--winner' : ''}`}>
                                                        <div className="text-xs border px-1 py-0.5">
                                                            ({bracket.final4.eastWest[1].seed}) {bracket.final4.eastWest[1].name} {getScoreText(bracket.final4.eastWest[1])}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="grid__col">
                                    <div className="space-y-6">
                                        {bracket.final4.southMidwest.length > 0 && (
                                            <div className="matchup-container">
                                                {bracket.final4.southMidwest[0] && (
                                                    <div className={`team-container ${bracket.final4.southMidwestWinner && bracket.final4.southMidwestWinner.name === bracket.final4.southMidwest[0].name ? 'team-container--winner' : ''}`}>
                                                        <div className="text-xs border px-1 py-0.5">
                                                            ({bracket.final4.southMidwest[0].seed}) {bracket.final4.southMidwest[0].name} {getScoreText(bracket.final4.southMidwest[0])}
                                                        </div>
                                                    </div>
                                                )}
                                                {bracket.final4.southMidwest[1] && (
                                                    <div className={`team-container ${bracket.final4.southMidwestWinner && bracket.final4.southMidwestWinner.name === bracket.final4.southMidwest[1].name ? 'team-container--winner' : ''}`}>
                                                        <div className="text-xs border px-1 py-0.5">
                                                            ({bracket.final4.southMidwest[1].seed}) {bracket.final4.southMidwest[1].name} {getScoreText(bracket.final4.southMidwest[1])}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Championship - Sixth Column */}
                        <div className="grid__col">
                            <h3 className="text-center">championship</h3>
                            <div className="flex-center mt-6 space-y-4">
                                {bracket.championship && bracket.final4.eastWestWinner && bracket.final4.southMidwestWinner && (
                                    <div className="matchup-container">
                                        <div className={`team-container ${bracket.championship.name === bracket.final4.eastWestWinner.name ? 'team-container--winner' : ''}`}>
                                            <div className="text-sm border px-2 py-1">
                                                ({bracket.final4.eastWestWinner.seed}) {bracket.final4.eastWestWinner.name} {getScoreText(bracket.final4.eastWestWinner)}
                                            </div>
                                        </div>
                                        <div className={`team-container ${bracket.championship.name === bracket.final4.southMidwestWinner.name ? 'team-container--winner' : ''}`}>
                                            <div className="text-sm border px-2 py-1">
                                                ({bracket.final4.southMidwestWinner.seed}) {bracket.final4.southMidwestWinner.name} {getScoreText(bracket.final4.southMidwestWinner)}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright" style={{textAlign: "center", fontSize: "12px", padding: "15px", color: "white"}}>
                &copy; {new Date().getFullYear()} josh amstutz. don't steal my code please.
            </div>
        </div>
    );
};

export default Brckt;