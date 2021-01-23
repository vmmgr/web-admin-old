export const environment = {
    production: true,
    api: {
        url: 'http://10.100.1.170:8081',
        path: '/api/v1',
    },
    websocket: {
        url: 'ws://10.100.1.170:8081',
        path: '/ws/v1'
    },
    novnc: {
        url: 'http://10.100.1.170/noVNC/vnc.html?host=127.0.0.1&port=8081&path=ws/v1/vnc'
    }
};
