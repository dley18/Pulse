import type { Pool } from "pg";

const tableNames = {
    snapshots: "SNAPSHOTS",
    battery: "BATTERY",
    cpu: "CPU",
    disk: "DISK",
    gpu: "GPU",
    memory: "MEMORY",
    network: "NETWORK"
} as const;

const AllowedDBType = [
    "TEXT",
    "INTEGER",
    "REAL",
    "BOOLEAN",
    "TIMESTAMP",
    "DOUBLE PRECISION"
] as const;

const getTableNames = (): Array<string> => {
    return Object.values(tableNames);
}

const createSnapshotsTable = async (conn: Pool): Promise<void> => {
    await conn.query(`
        CREATE TABLE IF NOT EXISTS "${tableNames.snapshots}" (
            id SERIAL PRIMARY KEY,
            hostname TEXT NOT NULL,
            timestamp TIMESTAMP
        );
    `);
}

const createBatteryTable = async (conn: Pool): Promise<void> => {
    await conn.query(`
        CREATE TABLE IF NOT EXISTS "${tableNames.battery}" (
            id SERIAL PRIMARY KEY,
            snapshot_id INTEGER,
            percent REAL,
            charging BOOLEAN,
            secs_left INTEGER,
            CONSTRAINT fk_snapshot FOREIGN KEY (snapshot_id) REFERENCES "${tableNames.snapshots}"(id)
        );
    `);
}

const createCpuTable = async (conn: Pool): Promise<void> => {
    await conn.query(`
        CREATE TABLE IF NOT EXISTS "${tableNames.cpu}" (
            id SERIAL PRIMARY KEY,
            snapshot_id INTEGER,
            usage_percent REAL,
            freq REAL,
            temp REAL,
            core_count INTEGER,
            CONSTRAINT fk_snapshot FOREIGN KEY (snapshot_id) REFERENCES "${tableNames.snapshots}"(id)
        );
    `);
}

const createDiskTable = async (conn: Pool): Promise<void> => {
    await conn.query(`
        CREATE TABLE IF NOT EXISTS "${tableNames.disk}" (
            id SERIAL PRIMARY KEY,
            snapshot_id INTEGER,
            mountpoint TEXT,
            percent REAL,
            free_GB REAL,
            used_GB REAL,
            total_GB REAL,
            CONSTRAINT fk_snapshot FOREIGN KEY (snapshot_id) REFERENCES "${tableNames.snapshots}"(id)
        );
    `);
}

const createGpuTable = async (conn: Pool): Promise<void> => {
    await conn.query(`
        CREATE TABLE IF NOT EXISTS "${tableNames.gpu}" (
            id SERIAL PRIMARY KEY,
            snapshot_id INTEGER,
            gpu_name TEXT,
            utilization REAL,
            vram_total_GB REAL,
            vram_used_GB REAL,
            vram_free_GB REAL,
            temp REAL,
            CONSTRAINT fk_snapshot FOREIGN KEY (snapshot_id) REFERENCES "${tableNames.snapshots}"(id)
        );
    `);
}

const createMemoryTable = async (conn: Pool): Promise<void> => {
    await conn.query(`
        CREATE TABLE IF NOT EXISTS "${tableNames.memory}" (
            id SERIAL PRIMARY KEY,
            snapshot_id INTEGER,
            ram_percent REAL,
            ram_used_GB REAL,
            ram_total_GB REAL,
            CONSTRAINT fk_snapshot FOREIGN KEY (snapshot_id) REFERENCES "${tableNames.snapshots}"(id)
        );
    `);
}

const createNetworkTable = async (conn: Pool): Promise<void> => {
    await conn.query(`
        CREATE TABLE IF NOT EXISTS "${tableNames.network}" (
            id SERIAL PRIMARY KEY,
            snapshot_id INTEGER,
            network_interface TEXT,
            GB_sent REAL,
            GB_recv REAL,
            packets_sent INTEGER,
            errors_in INTEGER,
            errors_out INTEGER,
            drops_in INTEGER,
            drops_out INTEGER,
            CONSTRAINT fk_snapshot FOREIGN KEY (snapshot_id) REFERENCES "${tableNames.snapshots}"(id)
        );
    `);
}

const insertNewColumn = async (conn: Pool, tableName: (typeof tableNames)[keyof typeof tableNames], columnName: string, type: (typeof AllowedDBType)): Promise<void> => {
    await conn.query(`
        ALTER TABLE "${tableName}"
        ADD COLUMN IF NOT EXISTS "${columnName}" ${type};
    `);
}

const deleteColumn = async (conn: Pool, tableName: (typeof tableNames)[keyof typeof tableNames], columnName: string): Promise<void> => {
    await conn.query(`
        ALTER TABLE "${tableName}" DROP COLUMN IF EXISTS "${columnName}";
    `);
}


export async function createAllDBTables(conn: Pool): Promise<void> {
    await createSnapshotsTable(conn);
    await createBatteryTable(conn);
    await createCpuTable(conn);
    await createDiskTable(conn);
    await createGpuTable(conn);
    await createMemoryTable(conn);
    await createNetworkTable(conn);
};
