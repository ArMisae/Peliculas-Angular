import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from '../../services/peliculas.service';
import { CreditsResponse, Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula!: MovieDetailsResponse;
  public cast: Cast[] = [];

  constructor(private activatedRoute: ActivatedRoute, 
              private peliculasService: PeliculasService,
              private location: Location,
              private router: Router) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.params.id;

    combineLatest([
      this.peliculasService.getPeliculaDetalles(id),
      this.peliculasService.getCast(id)
    ]).subscribe( ([pelicula, cast]) => {
      
      pelicula && pelicula.id === +id ?
      (this.pelicula = pelicula!)
      : this.router.navigateByUrl('/home');

      this.cast = cast.filter( actor => actor.profile_path != null )

    });

    // this.peliculasService.getPeliculaDetalles(id).subscribe(resp => {

    //   resp && resp.id === +id ?
    //   (this.pelicula = resp!)
    //   : this.router.navigateByUrl('/home');

    // });

    // this.peliculasService.getCast(id).subscribe(resp => {
    //   this.cast = resp.filter( actor => actor.profile_path != null )
    // });

  }

  onRegresar(){
    this.location.back();
  }

}
