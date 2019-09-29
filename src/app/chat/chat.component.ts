import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isArray, isString, get } from 'lodash';

import { AuthService, ChatService, PostService } from '../services';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css', '../app.component.css']
})
export class ChatComponent implements OnInit {
  room: any = null;
  posts: Array<any> = [];
  chatForm: FormGroup;
  currentUser: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getRoom();
    this.currentUser = this.authService.getUser();
    this.chatForm = this.formBuilder.group({
      'message': ['', Validators.required],
    });
    this.getPosts();
    this.addPostFromServer();
  }

  getRoom() {
    this.room = window.history.state;
    console.log({
      room: this.room,
    });
    if (!isString(this.room._id)) {
      this.router.navigate(['/rooms']);
    }
  }

  sendMessage() {
    const message = this.chatForm.get('message').value;
    this.chatForm.reset();
    const post = {
      userId: this.currentUser._id,
      roomId: this.room._id,
      content: message,
    };
    console.log({
      post
    });
    this.chatService.sendMessage(post);
  }

  addPostFromServer() {
    this.chatService
      .getMessages(this.room._id)
      .subscribe(post => {
        if (this.posts.length === 50) {
          this.posts.shift();
        }
        this.posts.push(post);
      });
  }

  getPosts() {
    const conditions = {
      roomId: {
        $objectId: this.room._id,
      },
      isDeleted: false,
    };
    const queryParams = `?where=${JSON.stringify(conditions)}&sort=["-createdAt"]&pageSize=50&populate=true`;
    this.postService.findAll(queryParams).subscribe(response => {
      if (isArray(get(response, 'data.data'))) {
        console.log({
          response
        });
        this.posts = get(response, 'data.data') || [];
        this.posts = this.posts.reverse();
      }
    });
  }
}
