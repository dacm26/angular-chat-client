import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

export class ChatService {
    private url = 'http://localhost:3000';
    private socket;

    constructor() {
        this.socket = io(this.url);
    }

    public sendMessage(message) {
        this.socket.emit('msgToServer', JSON.stringify(message));
    }

    public getMessages = (roomId: string) => {
        return Observable.create((observer) => {
            this.socket.on('msgToClient', (post) => {
                observer.next(JSON.parse(post));
            });
        });
    }
}