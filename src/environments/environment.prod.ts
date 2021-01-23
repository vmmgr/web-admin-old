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
        url: 'http://vnc.local.doornoc.net/vnc.html?host=10.100.1.170&port=8081&path=ws/v1/vnc'
    }
};
