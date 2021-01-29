import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {


  usuario: Usuario = new Usuario()
  idUser: number
  confirmarSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private alertas: AlertasService
  ) { }

  ngOnInit() { 
    window.scroll(0,0)

    if(environment.token == ""){
      this.router.navigate(["/entrar"])
    }

    this.idUser = this.route.snapshot.params["id"]
    this.findByIdUser(this.idUser)
   }

   confirmaSenha(event: any){
    this.confirmarSenha = event.target.value
   }

   tipoUsuario(event: any){
    this.tipoUser = event.target.value
   }

   atualizar(){
     this.usuario.tipo = this.tipoUser

     if(this.usuario.senha != this.confirmarSenha){
      this.alertas.showAlertDanger("Senhas incorretas")
     } else{
       this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
         this.usuario = resp
         this.router.navigate(["/inicio"])
         this.alertas.showAlertSuccess("Atualização feita com sucesso! Faça login novamente para ver as atualizações.")
         environment.token = ""
         environment.foto = ""
         environment.nome = ""
         environment.id = 0
         this.router.navigate(["/entrar"])
       })
     }

   }

   findByIdUser(id: number){
     this.authService.getByIdUser(id).subscribe((resp: Usuario) => {
       this.usuario = resp
     })
   }

}
