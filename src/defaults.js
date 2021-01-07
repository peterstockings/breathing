import { uuid } from './util'

export const Breathing = {
    IN: 'IN',
    OUT: 'OUT',
    HOLDFULL: 'HOLDFULL',
    HOLDEMPTY: 'HOLDEMPTY'
};

export const timerFunction = (breathingStage) => {
    const functions = {
        IN: t => t,
        OUT: t => (1 - t) < 0.01 ? 0.01 : 1 - t,
        HOLDFULL: t => 1,
        HOLDEMPTY: t => 0.01
    }
    if (breathingStage in Breathing)
        return functions[breathingStage]
    throw new Error("Unsupported timer function");
}

export const getDefaultExerciseList = () => [
    {
        name: '4-7-8',
        id: uuid(),
        selected: true,
        loops: Number.POSITIVE_INFINITY,
        exercise: [
            {
                name: 'In',
                f: Breathing.IN,
                duration: 4,
                idx: 0,
                id: uuid()
            },
            {
                name: 'Hold',
                f: Breathing.HOLDFULL,
                duration: 7,
                idx: 1,
                id: uuid()
            },
            {
                name: 'Out',
                f: Breathing.OUT,
                duration: 8,
                idx: 2,
                id: uuid()
            },
            {
                name: 'Hold',
                f: Breathing.HOLDEMPTY,
                duration: 7,
                idx: 3,
                id: uuid()
            }
        ]
    },
    {
        name: 'Box',
        id: uuid(),
        selected: false,
        loops: Number.POSITIVE_INFINITY,
        exercise: [
            {
                name: 'In',
                f: Breathing.IN,
                duration: 4,
                idx: 0,
                id: uuid()
            },
            {
                name: 'Hold',
                f: Breathing.HOLDFULL,
                duration: 4,
                idx: 1,
                id: uuid()
            },
            {
                name: 'Out',
                f: Breathing.OUT,
                duration: 4,
                idx: 2,
                id: uuid()
            },
            {
                name: 'Hold',
                f: Breathing.HOLDEMPTY,
                duration: 4,
                idx: 3,
                id: uuid()
            }
        ]
    }
]

export function createDefaultExercise() {
    return {
        name: 'Custom',
        id: uuid(),
        selected: false,
        loops: Number.POSITIVE_INFINITY,
        exercise: [
            {
                name: 'In',
                f: Breathing.IN,
                duration: 1,
                idx: 0,
                id: uuid()
            },
            {
                name: 'Out',
                f: Breathing.OUT,
                duration: 2,
                idx: 2,
                id: uuid()
            }
        ]
    }
}