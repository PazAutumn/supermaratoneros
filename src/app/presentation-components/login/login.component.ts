import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('modalContent') modalContent;
  @ViewChild('modal') modal;

  constructor() { }

  ngOnInit() {
  }

  search(): void {
    this.modalContent.title_modal = "Busca tu serie"
    this.modal.toggleModal();
    this.modalContent.typeDisplay = 'modal';
  }

  closeModal() {
    this.modal.toggleModal();
  }

}
