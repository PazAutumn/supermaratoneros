import { Component, OnInit, Output, EventEmitter, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  providers: [FeedbackService],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  @Output() closeModalSignal = new EventEmitter<boolean>();
  @Input() typeDisplay: string;
  @ViewChild('input') input: ElementRef;
  currentSerie= {};
  typeContentModal: string = '';
  title_modal: string = '';
  mensajes:any = {};
  current_modal: any = {};
  show_modal: boolean = false; 
  posterSearch: string;

  constructor(
    public common: CommonService,
    public feedbackService: FeedbackService,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
  }

  /**
   *  Al presionar el botón continuar, emite la orden de cerrar al componente modal
   *
   * @memberof FeedbackComponent
   */
  shouldCloseModal(): void {
    if (this.typeDisplay === 'modal') {
      this.closeModalSignal.emit(true);
    }
  }

  /**
   *  Cambia el contenido a mostrar iterando por su vista
   *
   * @param {*} typeContentModal
   * @memberof FeedbackComponent
   */
  toggleContent(typeContentModal): void {
    this.typeContentModal = typeContentModal;
    this.current_modal = this.mensajes[this.typeContentModal];
  }

  search() {
    const input = this.renderer.selectRootElement(this.input.nativeElement).value;
    console.log(input);
    this.feedbackService.getSerieInfo(input)
    .takeUntil(this.unsubscribe$)
    .subscribe(
    (data) => {
      this.getDataOk(data);
      console.log(data);
    },
    (error) => {
      this.getDataNotOk(error);
    });
  }
  /**
   * @method mapToClientObject
   * @description procesamiento de respuesta exitosa de BFF inicioAutenticacion
   * @param data
   */
  getDataOk(data) {
    this.posterSearch = data.Search[0];
    console.log('llamada ok')
  }

  /**
   * @method getDataNotOk
   * @description procesamiento de errores para hacer redirección de feedback
   * @param error
   */
  getDataNotOk(error) {
    console.log('llamada not ok')
  }
}
