import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');
socket.on('connect', () => console.log('connected', socket.id));
socket.on('taskCreated', (task) => console.log('got task:', task));
