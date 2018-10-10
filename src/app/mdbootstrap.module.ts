import { NgModule } from '@angular/core';
import { MDBBootstrapModule, DropdownModule, ModalModule, WavesModule, ButtonsModule } from 'angular-bootstrap-md';

@NgModule({
  imports: [
    MDBBootstrapModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    WavesModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  exports: [MDBBootstrapModule, DropdownModule, ModalModule, WavesModule, ButtonsModule]
})
export class MDBootstrapModule {}
