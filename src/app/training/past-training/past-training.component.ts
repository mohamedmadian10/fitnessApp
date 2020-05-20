import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from 'src/app/_models/exercise.model';
import { ExerciseService } from 'src/app/_services/exercise.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit ,AfterViewInit{
  displayedColumns = ['date','name','calories','duration','state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private exerService:ExerciseService) { }

  ngOnInit(): void {
    this.dataSource.data = this.exerService.getCompletedOrCancelled();
    console.log(this.dataSource.data);
  }
  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator; 
  }

  doSearch(filtered:string){
    // console.log(filtered)
    this.dataSource.filter = filtered.trim().toLocaleLowerCase();

  }

}
