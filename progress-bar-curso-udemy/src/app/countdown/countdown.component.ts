import { Component, Input, OnInit, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent
           implements OnInit,OnDestroy,OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
       console.log("INIT VALUE UPDATE TO : ", changes.init.currentValue );
       this.startCountdown();
  }
  ngOnDestroy(): void {
            this.clearTimeout();
  }




  @Output() onDecrease = new EventEmitter<number>();
  @Output() onComplete = new EventEmitter<void>();

  @Input() init: number = null;
  public counter: number =0;
private referenciaAlContador :any = null;
  constructor() { 
    this.startCountdown();
  }


  startCountdown(){
    if( this.init && this.init>0){
      this.clearTimeout();
      this.counter = this.init;
      this.doCountdown();
    }
  }

  doCountdown(){
    this.referenciaAlContador=setTimeout(()=>{
      this.counter = this.counter -1;
      this.processCountdown();
    },1000);
  }
private clearTimeout(){
  if(this.referenciaAlContador){
       clearTimeout(this.referenciaAlContador);
       this.referenciaAlContador=null;
  }
}

  processCountdown(){
      //emit event count
      this.onDecrease.emit(this.counter);
      console.log("contador es "+this.counter)
      
      if(this.counter ==0){
        //emit even counter end
        this.onComplete.emit();
        console.log("contador end ")
      }else{
        this.doCountdown();
      }
  
  
    }
    ngOnInit(): void {
      this.startCountdown();
   }





}
