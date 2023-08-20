import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import Cliente from 'src/app/models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';
import { ClienteDialogComponent } from 'src/app/shared/cliente-dialog/cliente-dialog.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  providers: [ClienteService]
})
export class ClientesComponent implements OnInit{
  @ViewChild(MatTable)
  table! : MatTable<any>
  clientes: Cliente[] = [];
  displayedColumns: string[] = ['cpf', 'nome', 'email', 'actions']
  
  constructor(
    public dialog: MatDialog,
    public clienteService: ClienteService
    ) { 
      this.clienteService.getCliente()
      .subscribe(data => {
        console.log(data);
        this.clientes = data
      });
    }

  ngOnInit(): void {    
  }

  openDialog(cliente: Cliente | null){
    const dialogRef = this.dialog.open(ClienteDialogComponent, {
      width: '250px',
      data: cliente != null ? 
        cliente: {
          id: '',
          cpf: '',
          nome: '',
          email: ''
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        if(this.clientes.map(p => p.id).includes(result.id))
        {
          this.clienteService.updateCliente(result)
          .subscribe(data => {
            const index = this.clientes.findIndex(p => p.id === data.id);
            this.clientes[index] = data;
            this.table.renderRows();
          })
        }else{
          this.clienteService.createCliente(result)
          .subscribe(data => {
            this.clientes.push(data);
            console.log('www' + data);
            this.table.renderRows();
          })
        }
      }
    });
  }

  updateCliente(cliente: Cliente){
    this.openDialog(cliente);
  }

  deleteCliente(id: string){
    this.clienteService.deleteCliente(id)
    .subscribe(() => {
      this.clientes = this.clientes.filter(p => p.id != id);
    })
  }
  
}
