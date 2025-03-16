import React, { useState } from 'react';
import './info.css';

const Info = () => {
    const [activetab, setactivetab] = useState('introduction');

    // historical probability data
    const historicaldata = {
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
        '5v12': 0.6474, '5v11': 0.630, '5v10': 0.660, '5v9': 0.400,
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

    // sample code snippet for determining winner
    const winnerdeterminationcode = `function determinewinner(team1, team2) {
  // get the seeds of both teams
  const seed1 = team1.seed;
  const seed2 = team2.seed;
  
  // always put the lower seed first for the lookup
  const matchupkey = seed1 < seed2 ? \`\${seed1}v\${seed2}\` : \`\${seed2}v\${seed1}\`;
  
  // get the historical probability for the higher seed winning
  let higherseedwinprob = historicaldata[matchupkey];
  
  // if the second seed is lower, we need to invert the probability
  if (seed2 < seed1) {
    higherseedwinprob = 1 - higherseedwinprob;
  }
  
  // generate a random number between 0 and 1
  const randomvalue = math.random();
  
  // if random value is less than the probability, higher seed wins
  // otherwise, the lower seed wins (upset!)
  return randomvalue < higherseedwinprob ? team1 : team2;
}`;

    // sample bracket building code
    const bracketbuildingcode = `function generatebracket(teams) {
  // first round matchups (64 teams -> 32 games)
  const round1results = [];
  for (let i = 0; i < teams.length; i += 2) {
    const winner = determinewinner(teams[i], teams[i + 1]);
    round1results.push(winner);
  }
  
  // second round (32 teams -> 16 games)
  const round2results = [];
  for (let i = 0; i < round1results.length; i += 2) {
    const winner = determinewinner(round1results[i], round1results[i + 1]);
    round2results.push(winner);
  }
  
  // continue for sweet 16, elite 8, final 4, and championship
  // ...
  
  return {
    round1: round1results,
    round2: round2results,
    // ...
  };
}`;

    const rendertab = () => {
        switch(activetab) {
            case 'introduction':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">how i built my march madness bracket generator</h2>
                        <div className="prose">
                            <p>every march, basketball fans around the country fill out brackets predicting the outcome of 63 games in the ncaa tournament. most people rely on intuition, team loyalty, or expert opinions. i decided to take a different approach: <strong>the numbers.</strong></p>

                            <p>this "blog post" walks through how i built a react-based march madness bracket generator that uses historical matchup data to make statistically realistic predictions. i'll explain my methodology, the technology stack, and how you can apply these same principles to your bracket challenges.</p>

                            <p>unlike very simple random generators that give each team a 50/50 chance, my approach accounts for the fact that higher seeds historically win more often. for example, a 1-seed has beaten a 16-seed approximately 98.7% of the time! using these historical probabilities creates brackets that reflect the tournament's typical upset patterns.</p>
                        </div>
                    </div>
                );

            case 'data':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">the historical data</h2>
                        <div className="prose">
                            <p>the foundation of my bracket generator is historical ncaa tournament data. i compiled
                                winning percentages for each possible seed matchup based on tournament results since the
                                expansion to 64 teams in 1985.</p>

                            <p>for example, when a 5-seed plays a 12-seed, the 5-seed has historically won 64.74% (101-55) of the
                                time. this data drives the randomization algorithm, making upsets occur at realistic
                                frequencies.</p>
                            <p><strong>when there have been no previous matchups (15v16...) data patterns and best judgement were used to approximate odds.</strong></p>

                        </div>

                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                <tr>
                                <th>matchup</th>
                                    <th>higher seed win %</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Object.entries(historicaldata).slice(0, 136).map(([matchup, probability]) => (
                                    <tr key={matchup}>
                                        <td>{matchup.replace('v', ' vs ')}</td>
                                        <td>{(probability * 100).toFixed(1)}%</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <p className="table-caption">all {Object.keys(historicaldata).length} possible matchups</p>                        </div>
                    </div>
                );

            case 'algorithm':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">the algorithm</h2>
                        <div className="prose">
                            <p>the core of the bracket generator is surprisingly simple. for each matchup:</p>

                            <ol>
                                <li>identify the seeds of the two teams playing</li>
                                <li>look up the historical winning percentage for that seed matchup</li>
                                <li>generate a random number between 0 and 1</li>
                                <li>if the random number is less than the historical win percentage, the higher seed advances; otherwise, the lower seed advances</li>
                            </ol>

                            <p>this approach creates "weighted randomness" - higher seeds are more likely to advance, but upsets still happen at realistic rates.</p>

                            <h3 className="subtitle">example: determining the winner</h3>
                        </div>

                        <div className="code-block">
                            <pre>
                                <code>{winnerdeterminationcode}</code>
                            </pre>
                        </div>

                        <div className="prose">
                            <p>this function handles any matchup, including cases where the teams are in a different order than our data structure expects. it's important to maintain consistency with how we look up probabilities, which is why we always put the lower seed number first in our lookup key.</p>
                        </div>
                    </div>
                );

            case 'implementation':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">react implementation</h2>
                        <div className="prose">
                            <p>i built the bracket generator as a react application with the following components:</p>

                            <ul>
                                <li><strong>team data:</strong> a json structure containing team information (name, seed, region)</li>
                                <li><strong>bracket generator:</strong> the core algorithm that simulates matchups and builds the bracket</li>
                                <li><strong>bracket display:</strong> a visual representation of the generated bracket</li>
                                <li><strong>controls:</strong> coming soon... </li>
                            </ul>

                            <h3 className="subtitle">bracket building function</h3>
                        </div>

                        <div className="code-block">
                            <pre>
                                <code>{bracketbuildingcode}</code>
                            </pre>
                        </div>

                        <div className="prose">
                            <p>the bracket generation follows a tournament structure, with each round having half as many games as the previous round. we track the winners of each round and continue the process until we have a champion.</p>
                        </div>
                    </div>
                );

            case 'conclusion':
                return (
                    <div className="tab-content">
                        <h2 className="tab-title">conclusion and learnings</h2>
                        <div className="prose">
                            <p>building this march madness bracket generator taught me several valuable lessons:</p>

                            <ol>
                                <li><strong>data-driven randomness:</strong> adding historical probabilities creates much more realistic outcomes than pure randomness</li>
                                <li><strong>react component design:</strong> breaking down complex ui structures into manageable components improves maintainability</li>
                                <li><strong>css layout techniques:</strong> tournament brackets have a unique layout challenge that required creative css solutions</li>
                                <li><strong>user experience:</strong> adding regeneration options and more to come... </li>
                            </ol>

                            <p>while my bracket generator won't guarantee a perfect bracket (1 in <strong>9,223,372,036,854,775,808</strong>), it does create statistically plausible brackets that reflect the historical patterns of the tournament.</p>

                            <p>the source code for this project is available on my github, and you can try the live generator yourself. i hope this project inspires you to build your own data-driven applications!</p>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="blog-container">
            <header className="blog-header">
                <h1 className="blog-title">building a march madness bracket generator</h1>
                <p className="blog-subtitle">br-ckt blog</p>
            </header>

            <div className="tab-buttons">
                {['introduction', 'data', 'algorithm', 'implementation', 'conclusion'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setactivetab(tab)}
                        className={`tab-button ${activetab === tab ? 'active' : ''}`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            <main className="blog-main">
                {rendertab()}
            </main>

            <footer className="blog-footer">
                <p>© {new Date().getFullYear()} - josh amstutz</p>
                <p>data based on ncaa tournament results since 1985</p>
            </footer>
        </div>
    );
};

export default Info;