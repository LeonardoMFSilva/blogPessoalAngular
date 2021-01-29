import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  usuario: Usuario = new Usuario()

  confirmSenha: string

  tipoUser: string


  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)


  }

  confirmaSenha(event: any) {

    this.confirmSenha = event.target.value

  }

  tipoUsuario(event: any) {
    this.tipoUser = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUser

    if(this.usuario.senha != this.confirmSenha){

      alert("As senhas não são compatíveis!")

    } else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess("Usuário cadastrado com sucesso!")
      })
    }

  }

}
