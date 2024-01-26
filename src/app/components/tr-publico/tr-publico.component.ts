import { Component } from '@angular/core';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { TechRiderQT } from 'src/app/models/techridersQT.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tr-publico',
  templateUrl: './tr-publico.component.html',
  styleUrls: ['./tr-publico.component.css']
})
export class TrPublicoComponent {
  imageUrlQuienesSomos = 'https://techriders.tajamar.es/wp-content/uploads/2023/04/motv-charla-768x1152.jpeg';

  public trs!: Array<TechRiderQT>

  constructor(
    private _usuariosService: UsuariosService,
    private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
      const idEmpresa = this.route.snapshot.paramMap.get('idEmpresa');
      if (idEmpresa) {
        this.getTrEmpresa(+idEmpresa);
      } else {
        this.getAllTr();
      }
     }

  getTrEmpresa(idEmpresa: number): void {
    this._usuariosService.getFindTechRidersEnEmpresa(idEmpresa).subscribe(
      (techRiders: any) => {
        this.trs = techRiders;
        console.log(techRiders);
      });
  }

  getAllTr(): void{
    this._usuariosService.getTechRiders().subscribe((response: Array<TechRiderQT>)=>{
      this.trs = response
      console.log(response)
    });
  }
}
