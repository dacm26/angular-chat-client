import {
	Component,
	OnInit,
	Inject
} from '@angular/core';

import {
	MAT_DIALOG_DATA,
	MatDialogRef,
} from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-create-room',
	templateUrl: './create-room.component.html',
	styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
	roomForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		public dialogRef: MatDialogRef<CreateRoomComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) { 
	}

	ngOnInit() {
		this.roomForm = this.formBuilder.group({
			'name': ['', Validators.required],
			'description': [''],
		  });
	}

	onCancel(): void {
		this.dialogRef.close();
	}

}
