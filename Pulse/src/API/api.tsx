// Constants
const API_HOST = import.meta.env.VITE_API_HOST;

export const fetchMetrics = async () => {
    const snapshotData = await _fetchSnapshot();
    const cpuData = await _fetchCpu();
    const memoryData = await _fetchMemory();
    const diskData = await _fetchDisk();
    const gpuData = await _fetchGpu();
    const networkData = await _fetchNetwork();
    const batteryData = await _fetchBattery();

    const payload = {
        "snapshot": snapshotData,
        "cpu": cpuData,
        "memory": memoryData,
        "disk": diskData,
        "gpuData": gpuData,
        "network": networkData,
        "battery": batteryData
    };

    return payload;
}

const _fetchSnapshot = async () => {
    const snapshotResponse = await fetch(`${API_HOST}/snapshot`);
    const snapshotResult = await snapshotResponse.json();
    return snapshotResult.data[0];
}

const _fetchCpu = async () => {
    const cpuResponse = await fetch(`${API_HOST}/cpu`);
    const cpuResult = await cpuResponse.json();
    return cpuResult.data[0];
}

const _fetchMemory = async () => {
    const memoryResponse = await fetch(`${API_HOST}/memory`);
    const memoryResult = await memoryResponse.json();
    return memoryResult.data[0];
}

const _fetchDisk = async () => {
    const diskResponse = await fetch(`${API_HOST}/disk`);
    const diskResult = await diskResponse.json();
    return diskResult.data[0];
}

const _fetchGpu = async () => {
    const gpuResponse = await fetch(`${API_HOST}/gpu`);
    const gpuResult = await gpuResponse.json();
    return gpuResult.data[0];
}

const _fetchNetwork = async () => {
    const networkResponse = await fetch(`${API_HOST}/network`);
    const networkResult = await networkResponse.json();
    return networkResult.data[0];
}

const _fetchBattery = async () => {
    const batteryResponse = await fetch(`${API_HOST}/battery`);
    const batteryResult = await batteryResponse.json();
    return batteryResult.data[0];
}
