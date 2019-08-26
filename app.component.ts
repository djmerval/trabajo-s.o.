import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'nuevo123';


  ngOnInit(){
    var fcfs = new Fcfs();
    var proceso1 = new Proceso();
    proceso1.nombre="Primer proceso";
    proceso1.llegada=0;
    proceso1.rafaga=8;
    proceso1.llegadaES=2;
    proceso1.rafagaES=3;
    fcfs.agregar_a_procesos(proceso1);
    fcfs.iniciar();
  }
}
export class Proceso{
    nombre: String;
    llegada=0;
    rafaga=0;
    comienzo =0 ;
    finalizacion=0 ;
    espera=0 ;

    llegadaES=0 ;
    rafagaES=0 ;
    comienzoES=0 ;
    finalizacionES=0 ;
    esperaES=0 ;
}

export class Fcfs{


  cProcesos: Proceso[];
  cListos: Proceso[];
  cCpu: Proceso[];
  cES:Proceso[];
  fin:Boolean;
  tiempo=0;
  count;

  agregar_a_procesos(proceso:Proceso){
    this.cProcesos.push(proceso)
  }

  eliminar_de_procesos(proceso:Proceso){
    var i = this.cProcesos.indexOf(proceso);
    if(i!==-1){
      this.cProcesos.splice(i,1);
    }
  }

  agregar_a_listos(proceso:Proceso){
    this.cListos.push(proceso);
  }

  agregar_a_cpu(proceso:Proceso){
    this.cCpu.push(proceso);
  }

  agregar_a_ES(proceso:Proceso){
    this.cES.push(proceso);
  }

  iniciar(){
    this.fin=true;
    this.tiempo = 0; 
    this.count= 0;
    this.cargar_listos();    
    while(this.fin){
      this.comenzar_proceso(this.tiempo);
      this.count++;
      if(this.count>=this.cListos.length)
        this.fin = false;
    }
    console.log(this.cListos);
    console.log(this.cCpu);
    console.log(this.cES)
  }

  comenzar_proceso(tiempo){
    var proceso = this.cListos[this.count];
    proceso.comienzo = tiempo;
    this.agregar_a_cpu(proceso);
    if(proceso.rafagaES!=0){
      proceso.rafaga=proceso.rafaga-proceso.llegadaES;
      this.agregar_a_ES(proceso)
      tiempo+=proceso.llegadaES;
      this.es(proceso);
    }else{      
      tiempo+=proceso.rafaga;
      proceso.finalizacion = tiempo;
      proceso.rafaga=0;
      proceso.espera = tiempo - proceso.llegada;
    }

    
  }


  cargar_listos(){
    this.cListos = this.cProcesos;
    this.cListos.sort((a,b)=>(a.llegada>b.llegada)?1:-1);
  }

  es(proceso:Proceso){
    proceso.comienzoES = this.tiempo;
    proceso.finalizacionES = proceso.comienzoES+proceso.rafagaES;
    proceso.rafagaES = 0;
    proceso.espera =proceso.finalizacion-proceso.llegadaES;
    this.agregar_a_listos(proceso);
  }

}