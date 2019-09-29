import { Component, OnInit } from '@angular/core';
import { RoomService } from '../services';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { get, isArray, isNil } from 'lodash';

import { CreateRoomComponent } from './create-room/create-room.component';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css', '../app.component.css']
})
export class RoomsComponent implements OnInit {
  rooms: Array<any> = [];
  pages: number = 0;
  currentPage: number = 1;
  constructor(
    private roomService: RoomService,
    private router: Router,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getRooms();
  }

  onCreate() {
    const dialogRef = this.dialog.open(CreateRoomComponent, {
      width: '400px',
      data: {
        title: 'Create Room',
        room: {
          name: '',
          description: ''
        }
      }
    });

    dialogRef.afterClosed().subscribe(room => {
      if (!isNil(room)) {
        this.roomService.create({
          data: room
        }).subscribe(response => {
          this.getRooms();
        })
      }
    });
  }

  onRefresh() {
    this.getRooms();
  }
  
  onChat(room: any) {
    this.router.navigate(['/chat'], { state: room });
  }

  private getRooms() {
    const conditions = {
      isDeleted: false,
    };
    this.roomService.findAll(`?where=${JSON.stringify(conditions)}&sort=["name"]&pageSize=1000`).subscribe(response => {
      if (isArray(get(response, 'data.data'))) {
        this.rooms = get(response, 'data.data') || [];
        this.pages = get(response, 'data.totalPages');
      }
    });
  }
}
