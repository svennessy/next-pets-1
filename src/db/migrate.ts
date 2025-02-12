// initial code is generated with drizzle
// this then migrates it to neon

// db connection
import { db } from "./index"

import { migrate } from "drizzle-orm/neon-http/migrator"

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'src/db/migrations'
        })
        console.log('Migration completed')
    } catch (error) {
        console.error('Error during migration: ', error)
        // clearly exit process
        process.exit(1)
    }
}

main()