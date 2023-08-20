import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Cliente from 'src/app/models/Cliente';

@Component({
  selector: 'app-cliente-dialog',
  templateUrl: './cliente-dialog.component.html',
  styleUrls: ['./cliente-dialog.component.scss']
})
export class ClienteDialogComponent implements OnInit{
  isChange!: boolean;
  constructor(
    public dialogRef: MatDialogRef<ClienteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cliente,
  ) { }

  ngOnInit(): void {    
    if(this.data.id != ''){
      this.isChange = true;
    }else{
      this.isChange = false;
    }
  }

  onCancel(){
    this.dialogRef.close();
  }
}
