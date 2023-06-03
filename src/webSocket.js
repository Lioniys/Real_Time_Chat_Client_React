
export const client_id = Date.now()
export const ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);