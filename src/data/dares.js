import { MessageSquare, HelpCircle, Heart, Drama, Mic, Brain } from 'lucide-react';

// Predefined dare challenges
export const DARES = [
    {
        id: 'explain-topic',
        type: 'VERBAL',
        icon: MessageSquare,
        description: 'Explain in 30 seconds why teamwork is important',
        duration: 30,
        reward: 5
    },
    {
        id: 'riddle-1',
        type: 'RIDDLE',
        icon: HelpCircle,
        description: 'Solve this riddle: I speak without a mouth and hear without ears. I have no body, but come alive with wind. What am I?',
        answer: 'echo',
        hint: 'Think about sound',
        reward: 10
    },
    {
        id: 'riddle-2',
        type: 'RIDDLE',
        icon: HelpCircle,
        description: 'Solve this riddle: The more you take, the more you leave behind. What am I?',
        answer: 'footsteps',
        hint: 'Think about walking',
        reward: 10
    },
    {
        id: 'appreciation',
        type: 'APPRECIATION',
        icon: Heart,
        description: 'Say something you appreciate about each of the other players',
        duration: 45,
        reward: 5
    },
    {
        id: 'silent-act-1',
        type: 'ACTING',
        icon: Drama,
        description: 'Act out "brushing your teeth" without speaking for 15 seconds',
        duration: 15,
        reward: 5
    },
    {
        id: 'silent-act-2',
        type: 'ACTING',
        icon: Drama,
        description: 'Act out "making a sandwich" without speaking for 15 seconds',
        duration: 15,
        reward: 5
    },
    {
        id: 'tongue-twister',
        type: 'VERBAL',
        icon: Mic,
        description: 'Say this 3 times fast: "Red lorry, yellow lorry"',
        duration: 20,
        reward: 10
    },
    {
        id: 'memory',
        type: 'MEMORY',
        icon: Brain,
        description: 'Name 5 countries that start with the letter "C" in 20 seconds',
        duration: 20,
        reward: 15
    },
    {
        id: 'compliment',
        type: 'APPRECIATION',
        icon: Heart,
        description: 'Give a genuine compliment to the player with the lowest score',
        duration: 15,
        reward: 5
    },
    {
        id: 'riddle-3',
        type: 'RIDDLE',
        icon: HelpCircle,
        description: 'Solve this riddle: What has keys but no locks, space but no room, and you can enter but not go inside?',
        answer: 'keyboard',
        hint: 'Think about computers',
        reward: 15
    }
];

// Get a random dare
export const getRandomDare = () => {
    return DARES[Math.floor(Math.random() * DARES.length)];
};
