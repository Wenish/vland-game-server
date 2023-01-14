import { createWorld, IWorld, pipe } from 'bitecs'

export interface WorldEcs extends IWorld {
    time: {
        delta: number,
        elapsed: number,
        then: number
    },
    name: string
}



export class GameWorld {
    worldEcs: WorldEcs;
    loggerSystem = (world: WorldEcs) => {
        console.log(`[GameWorld-${world.name}]: elapsed time ${world.time.elapsed}`)
        return world
    }
    timeSystem = (world: WorldEcs) => {
        const { time } = world
        const now = performance.now()
        const delta = now - time.then
        time.delta = delta
        time.elapsed += delta
        time.then = now
        return world
      }
    pipeline = pipe(this.timeSystem, this.loggerSystem)

    constructor (id: string) {
        this.worldEcs = createWorld({
            time: {
                delta: 0,
                elapsed: 0,
                then: performance.now()
            },
            name: id
        })
    }

    dispose () {
        delete this.worldEcs
    }
}