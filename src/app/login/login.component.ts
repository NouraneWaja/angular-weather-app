import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  signupUsers: any[]=[];

  signupObject: any={
    userName:'',
    email:'',
    password:''
  };
  loginObject: any={
    userName:'',
    password:''
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit():void {
    const localData=localStorage.getItem('signUpUsers');
    if(localData!=null){
      this.signupUsers=JSON.parse(localData);
    }
  }

  onSignUp(){
     // Vérifiez si l'email existe déjà
    const isEmailExist = this.signupUsers.find(user => user.email === this.signupObject.email);

    if (isEmailExist) {
      alert('Email already exists. Please use a different email.');
    } else {
      this.signupUsers.push(this.signupObject);
      localStorage.setItem('signUpUsers', JSON.stringify(this.signupUsers));
      this.signupObject = {
        userName: '',
        email: '',
        password: ''
      };
      // Rediriger automatiquement vers la connexion après l'inscription
      document.getElementById('chk')?.click();
    }
  }

  onLogin(){
    const isUserExist=this.signupUsers.find(m=>m.userName==this.loginObject.userName&& m.password==this.loginObject.password);
    if(isUserExist!=undefined){
      this.authService.login(isUserExist);
      this.router.navigate(['/home']);
    } else {
      alert('wrong credentials');
    }
    
  }

}
