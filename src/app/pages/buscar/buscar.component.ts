import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto: string = '';
  public movies: Movie[] = [];

  constructor(private activatedRouter: ActivatedRoute, private peliculasService: PeliculasService) { }

  ngOnInit(): void {

    this.activatedRouter.params.subscribe(params => {
      // LLamar el servicio

      this.texto = params.texto;

      this.peliculasService.buscarPelicula(params.texto).subscribe(movies => {
        this.movies = movies;
      })
    });

  }

}
