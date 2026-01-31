import { Clock, Hourglass, RefreshCw, Snowflake, Sparkles, Dice6 } from 'lucide-react';

// Predefined lifeline definitions
export const LIFELINES = [
    {
        id: 'add-time-self',
        name: 'Time Boost',
        description: 'Add 10 seconds to your timer',
        icon: Clock,
        requiresTarget: false,
        effect: (teams, currentTeam) => {
            teams[currentTeam].time = Math.min(60, teams[currentTeam].time + 10);
            return `${currentTeam} gained 10 seconds!`;
        }
    },
    {
        id: 'subtract-time-opponent',
        name: 'Time Thief',
        description: 'Subtract 10 seconds from an opponent',
        icon: Hourglass,
        requiresTarget: true,
        effect: (teams, currentTeam, targetTeam) => {
            teams[targetTeam].time = Math.max(0, teams[targetTeam].time - 10);
            return `${currentTeam} stole 10 seconds from ${targetTeam}!`;
        }
    },
    {
        id: 'exchange-time',
        name: 'Time Swap',
        description: 'Exchange your remaining time with another player',
        icon: RefreshCw,
        requiresTarget: true,
        effect: (teams, currentTeam, targetTeam) => {
            const temp = teams[currentTeam].time;
            teams[currentTeam].time = teams[targetTeam].time;
            teams[targetTeam].time = temp;
            return `${currentTeam} and ${targetTeam} swapped times!`;
        }
    },
    {
        id: 'freeze-opponent',
        name: 'Freeze',
        description: "Freeze an opponent's next turn",
        icon: Snowflake,
        requiresTarget: true,
        effect: (teams, currentTeam, targetTeam) => {
            teams[targetTeam].frozen = true;
            return `${targetTeam} is frozen for their next turn!`;
        }
    },
    {
        id: 'steal-from-all',
        name: 'Mass Drain',
        description: 'Steal 5 seconds from each opponent',
        icon: Sparkles,
        requiresTarget: false,
        effect: (teams, currentTeam) => {
            let totalStolen = 0;
            Object.keys(teams).forEach(player => {
                if (player !== currentTeam && teams[player].time > 0) {
                    const stolen = Math.min(5, teams[player].time);
                    teams[player].time -= stolen;
                    totalStolen += stolen;
                }
            });
            teams[currentTeam].time = Math.min(60, teams[currentTeam].time + totalStolen);
            return `${currentTeam} stole ${totalStolen} seconds from opponents!`;
        }
    },
    {
        id: 'double-or-nothing',
        name: 'Double or Nothing',
        description: 'Next answer: +20s & +20pts if correct, -20s if wrong',
        icon: Dice6,
        requiresTarget: false,
        effect: (teams, currentTeam) => {
            teams[currentTeam].doubleOrNothing = true;
            return `${currentTeam} activated Double or Nothing!`;
        }
    }
];

