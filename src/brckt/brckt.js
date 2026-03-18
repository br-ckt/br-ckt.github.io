import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './br-ckt.css';

const initialTeams = {
    east: [
        { seed: 1,  name: "Duke" },           { seed: 16, name: "Siena" },
        { seed: 8,  name: "Ohio State" },      { seed: 9,  name: "TCU" },
        { seed: 5,  name: "St. John's" },      { seed: 12, name: "Northern Iowa" },
        { seed: 4,  name: "Kansas" },          { seed: 13, name: "Cal Baptist" },
        { seed: 6,  name: "Louisville" },      { seed: 11, name: "South Florida" },
        { seed: 3,  name: "Michigan State" },  { seed: 14, name: "North Dakota State" },
        { seed: 7,  name: "UCLA" },            { seed: 10, name: "UCF" },
        { seed: 2,  name: "UConn" },           { seed: 15, name: "Furman" },
    ],
    west: [
        { seed: 1,  name: "Arizona" },         { seed: 16, name: "Long Island" },
        { seed: 8,  name: "Villanova" },       { seed: 9,  name: "Utah State" },
        { seed: 5,  name: "Wisconsin" },       { seed: 12, name: "High Point" },
        { seed: 4,  name: "Arkansas" },        { seed: 13, name: "Hawaii" },
        { seed: 6,  name: "BYU" },             { seed: 11, name: "Texas/NC State" },
        { seed: 3,  name: "Gonzaga" },         { seed: 14, name: "Kennesaw State" },
        { seed: 7,  name: "Miami" },           { seed: 10, name: "Missouri" },
        { seed: 2,  name: "Purdue" },          { seed: 15, name: "Queens" },
    ],
    south: [
        { seed: 1,  name: "Florida" },         { seed: 16, name: "Prairie View/Lehigh" },
        { seed: 8,  name: "Clemson" },         { seed: 9,  name: "Iowa" },
        { seed: 5,  name: "Vanderbilt" },      { seed: 12, name: "McNeese" },
        { seed: 4,  name: "Nebraska" },        { seed: 13, name: "Troy" },
        { seed: 6,  name: "North Carolina" },  { seed: 11, name: "VCU" },
        { seed: 3,  name: "Illinois" },        { seed: 14, name: "Penn" },
        { seed: 7,  name: "Saint Mary's" },    { seed: 10, name: "Texas A&M" },
        { seed: 2,  name: "Houston" },         { seed: 15, name: "Idaho" },
    ],
    midwest: [
        { seed: 1,  name: "Michigan" },        { seed: 16, name: "UMBC/Howard" },
        { seed: 8,  name: "Georgia" },         { seed: 9,  name: "Saint Louis" },
        { seed: 5,  name: "Texas Tech" },      { seed: 12, name: "Akron" },
        { seed: 4,  name: "Alabama" },         { seed: 13, name: "Hofstra" },
        { seed: 6,  name: "Tennessee" },       { seed: 11, name: "Miami (Ohio)/SMU" },
        { seed: 3,  name: "Virginia" },        { seed: 14, name: "Wright State" },
        { seed: 7,  name: "Kentucky" },        { seed: 10, name: "Santa Clara" },
        { seed: 2,  name: "Iowa State" },      { seed: 15, name: "Tennessee State" },
    ],
};

const REGIONS = ['east', 'west', 'south', 'midwest'];

/* ── Upset-probability table (same as original) ── */
const upsetOdds = {
    '1v16':0.987,'1v15':0.950,'1v14':0.940,'1v13':1.000,'1v12':1.000,'1v11':0.600,
    '1v10':0.875,'1v9':0.909,'1v8':0.787,'1v7':0.857,'1v6':0.706,'1v5':0.803,
    '1v4':0.691,'1v3':0.643,'1v2':0.551,'1v1':0.500,
    '2v16':0.920,'2v15':0.929,'2v14':0.890,'2v13':0.870,'2v12':1.000,'2v11':0.800,
    '2v10':0.646,'2v9':0.667,'2v8':0.400,'2v7':0.705,'2v6':0.703,'2v5':0.250,
    '2v4':0.500,'2v3':0.603,'2v2':0.500,
    '3v16':0.880,'3v15':0.667,'3v14':0.853,'3v13':0.850,'3v12':0.820,'3v11':0.677,
    '3v10':0.692,'3v9':0.750,'3v8':0.830,'3v7':0.632,'3v6':0.577,'3v5':0.500,
    '3v4':0.556,'3v3':0.500,
    '4v16':0.860,'4v15':0.840,'4v14':0.820,'4v13':0.788,'4v12':0.717,'4v11':0.550,
    '4v10':0.780,'4v9':0.400,'4v8':0.385,'4v7':0.333,'4v6':0.429,'4v5':0.567,'4v4':0.500,
    '5v16':0.840,'5v15':0.820,'5v14':0.800,'5v13':0.857,'5v12':0.670,'5v11':0.630,
    '5v10':0.660,'5v9':0.400,'5v8':0.250,'5v7':0.520,'5v6':0.667,'5v5':0.500,
    '6v16':0.820,'6v15':0.790,'6v14':0.875,'6v13':0.770,'6v12':0.750,'6v11':0.619,
    '6v10':0.600,'6v9':0.580,'6v8':0.250,'6v7':0.333,'6v6':0.500,
    '7v16':0.800,'7v15':0.333,'7v14':0.760,'7v13':0.740,'7v12':0.720,'7v11':0.500,
    '7v10':0.609,'7v9':0.560,'7v8':0.500,'7v7':0.500,
    '8v16':0.780,'8v15':0.760,'8v14':0.740,'8v13':0.720,'8v12':0.680,'8v11':0.550,
    '8v10':0.560,'8v9':0.506,'8v8':0.500,
    '9v16':0.760,'9v15':0.740,'9v14':0.720,'9v13':0.700,'9v12':0.660,'9v11':0.520,
    '9v10':0.520,'9v9':0.500,
    '10v16':0.740,'10v15':1.000,'10v14':0.700,'10v13':0.680,'10v12':0.640,'10v11':0.500,'10v10':0.500,
    '11v16':0.720,'11v15':0.700,'11v14':1.000,'11v13':0.640,'11v12':0.600,'11v11':0.500,
    '12v16':0.700,'12v15':0.680,'12v14':0.660,'12v13':0.750,'12v12':0.500,
    '13v16':0.680,'13v15':0.660,'13v14':0.630,'13v13':0.500,
    '14v16':0.660,'14v15':0.630,'14v14':0.500,
    '15v16':0.650,'15v15':0.500,
    '16v16':0.500,
};

const pickWinner = (a, b) => {
    if (!a || !b) return a || b;
    const lo = a.seed <= b.seed ? a : b;
    const hi = a.seed <= b.seed ? b : a;
    const key = `${lo.seed}v${hi.seed}`;
    const p = upsetOdds[key] ?? 0.5;
    return Math.random() < p ? lo : hi;
};

const emptyRegions = () =>
    Object.fromEntries(REGIONS.map(r => [r, []]));

const buildBracket = () => {
    const r64  = { ...initialTeams };          // 16 per region
    const r32  = emptyRegions();               //  8
    const s16  = emptyRegions();               //  4
    const e8   = emptyRegions();               //  2
    const f4   = { eastSouth: [], westMidwest: [] };
    let champ;

    REGIONS.forEach(reg => {
        for (let i = 0; i < 8; i++)
            r32[reg][i] = pickWinner(r64[reg][i*2], r64[reg][i*2+1]);
        for (let i = 0; i < 4; i++)
            s16[reg][i] = pickWinner(r32[reg][i*2], r32[reg][i*2+1]);
        for (let i = 0; i < 2; i++)
            e8[reg][i]  = pickWinner(s16[reg][i*2], s16[reg][i*2+1]);
    });

    // Final Four: East vs South, West vs Midwest
    const eWin = pickWinner(e8.east[0],    e8.south[0]);
    const wWin = pickWinner(e8.west[0],    e8.midwest[0]);
    f4.eastSouth   = [e8.east[0],    e8.south[0]];
    f4.westMidwest = [e8.west[0],    e8.midwest[0]];
    f4.eWin = eWin;
    f4.wWin = wWin;

    champ = pickWinner(eWin, wWin);

    return { r64, r32, s16, e8, f4, champ };
};

/* ── Team slot component ── */
const Slot = ({ team, isWinner }) => {
    if (!team) return <div className="team-slot empty" />;
    return (
        <div className={`team-slot${isWinner ? ' winner' : ''}`}>
            <span className="seed">{team.seed}</span>
            {team.name}
        </div>
    );
};

/* ── Matchup (pair of slots) ── */
const Matchup = ({ top, bottom, winnerTop, winnerBottom }) => (
    <div className="matchup">
        <Slot team={top}    isWinner={winnerTop} />
        <Slot team={bottom} isWinner={winnerBottom} />
    </div>
);

/* ── Build matchup list for a region in a given round ── */
const regionMatchups = (teams, winners) => {
    const pairs = [];
    for (let i = 0; i < teams.length; i += 2) {
        const a = teams[i], b = teams[i + 1];
        const w = winners ? winners[Math.floor(i / 2)] : null;
        pairs.push({ a, b, wA: w && a && w.name === a.name, wB: w && b && w.name === b.name });
    }
    return pairs;
};

/* ── Round column with all 4 regions stacked ── */
const RoundCol = ({ label, roundClass, regions: regionData }) => (
    <div className={`round-col ${roundClass}`}>
        <div className="round-label">{label}</div>
        <div className="round-games">
            {regionData.map(({ region, pairs }, ri) => (
                <React.Fragment key={region}>
                    {ri > 0 && <hr className="region-divider" />}
                    <div className="region-tag">{region}</div>
                    {pairs.map((p, idx) => (
                        <Matchup key={idx} top={p.a} bottom={p.b} winnerTop={p.wA} winnerBottom={p.wB} />
                    ))}
                </React.Fragment>
            ))}
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════════════════════ */

const Brckt = () => {
    const [bk, setBk] = useState(null);
    const bracketRef = useRef(null);

    const generate = () => setBk(buildBracket());

    const download = () => {
        if (!bracketRef.current) return;
        html2canvas(bracketRef.current, {
            backgroundColor: '#0a0a0a',
            scale: 2,
            width:  bracketRef.current.scrollWidth,
            height: bracketRef.current.scrollHeight,
        }).then(canvas => {
            const a = document.createElement('a');
            a.download = 'bracket.png';
            a.href = canvas.toDataURL('image/png');
            a.click();
        });
    };

    /* Build per-round data for each region */
    const r64data  = bk ? REGIONS.map(r => ({ region: r, pairs: regionMatchups(bk.r64[r],  bk.r32[r])  })) : null;
    const r32data  = bk ? REGIONS.map(r => ({ region: r, pairs: regionMatchups(bk.r32[r],  bk.s16[r])  })) : null;
    const s16data  = bk ? REGIONS.map(r => ({ region: r, pairs: regionMatchups(bk.s16[r],  bk.e8[r])   })) : null;
    const e8data   = bk ? REGIONS.map(r => ({
        region: r,
        pairs: regionMatchups(bk.e8[r], [
            r === 'east'    ? bk.f4.eWin : (r === 'south'   ? bk.f4.eWin : null),
            r === 'west'    ? bk.f4.wWin : (r === 'midwest' ? bk.f4.wWin : null),
        ].filter(Boolean).slice(0, 1))
    })) : null;

    /* Final Four matchups */
    const f4EastSouth   = bk ? [{ a: bk.f4.eastSouth[0],   b: bk.f4.eastSouth[1],   wA: bk.f4.eWin?.name === bk.f4.eastSouth[0]?.name,   wB: bk.f4.eWin?.name === bk.f4.eastSouth[1]?.name   }] : [];
    const f4WestMidwest = bk ? [{ a: bk.f4.westMidwest[0], b: bk.f4.westMidwest[1], wA: bk.f4.wWin?.name === bk.f4.westMidwest[0]?.name, wB: bk.f4.wWin?.name === bk.f4.westMidwest[1]?.name }] : [];

    /* Championship matchup */
    const champMatchup = bk ? [{
        a: bk.f4.eWin, b: bk.f4.wWin,
        wA: bk.champ?.name === bk.f4.eWin?.name,
        wB: bk.champ?.name === bk.f4.wWin?.name,
    }] : [];

    return (
        <div className="full">
            <div className="container">
                <h1 className="heading">March Madness</h1>
                <p className="heading-sub">bracket generator</p>

                <div className="controls">
                    <button className="animated-button" onClick={generate}>
                        <span>⚡ generate bracket</span>
                    </button>
                    <button onClick={download} disabled={!bk}>
                        <span>↓ download</span>
                    </button>
                </div>

                <div ref={bracketRef} className="bracket-scroll">
                    {bk ? (
                        <div className="bracket-layout">

                            {/* Round of 64 */}
                            <RoundCol label="Round of 64" roundClass="round-col round-r64" regions={r64data} />

                            {/* Round of 32 */}
                            <RoundCol label="Round of 32" roundClass="round-col round-r32" regions={r32data} />

                            {/* Sweet 16 */}
                            <RoundCol label="Sweet 16" roundClass="round-col round-s16" regions={s16data} />

                            {/* Elite 8 */}
                            <div className="round-col round-e8">
                                <div className="round-label">Elite 8</div>
                                <div className="round-games">
                                    {REGIONS.map((reg, ri) => (
                                        <React.Fragment key={reg}>
                                            {ri > 0 && <hr className="region-divider" />}
                                            <div className="region-tag">{reg}</div>
                                            {bk.e8[reg].length >= 2 && (() => {
                                                const a = bk.e8[reg][0], b = bk.e8[reg][1];
                                                const winner =
                                                    reg === 'east'    ? bk.f4.eastSouth[0]   :
                                                        reg === 'south'   ? bk.f4.eastSouth[1]   :
                                                            reg === 'west'    ? bk.f4.westMidwest[0] :
                                                                bk.f4.westMidwest[1];
                                                return (
                                                    <Matchup
                                                        top={a} bottom={b}
                                                        winnerTop={winner?.name === a?.name}
                                                        winnerBottom={winner?.name === b?.name}
                                                    />
                                                );
                                            })()}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>

                            {/* Final Four */}
                            <div className="round-col round-final4">
                                <div className="round-label">Final Four</div>
                                <div className="round-games">
                                    <div className="region-tag">East / South</div>
                                    {f4EastSouth.map((p, i) => (
                                        <Matchup key={i} top={p.a} bottom={p.b} winnerTop={p.wA} winnerBottom={p.wB} />
                                    ))}
                                    <hr className="region-divider" />
                                    <div className="region-tag">West / Midwest</div>
                                    {f4WestMidwest.map((p, i) => (
                                        <Matchup key={i} top={p.a} bottom={p.b} winnerTop={p.wA} winnerBottom={p.wB} />
                                    ))}
                                </div>
                            </div>

                            {/* Championship */}
                            <div className="round-col round-champ">
                                <div className="round-label">Championship</div>
                                <div className="round-games">
                                    <div className="champ-group">
                                        {champMatchup.map((p, i) => (
                                            <Matchup key={i} top={p.a} bottom={p.b} winnerTop={p.wA} winnerBottom={p.wB} />
                                        ))}
                                        {bk.champ && (
                                            <div className="champion-display">
                                                <div className="champion-trophy">🏆</div>
                                                <div className="champion-label">Champion</div>
                                                <div className="champion-name">{bk.champ.name}</div>
                                                <div className="champion-seed">#{bk.champ.seed} seed</div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)', fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', letterSpacing: '0.15em' }}>
                            Press generate to fill the bracket
                        </div>
                    )}
                </div>
            </div>

            <div className="copyright">
                &copy; {new Date().getFullYear()} josh amstutz. don't steal my code please.
            </div>
        </div>
    );
};

export default Brckt;