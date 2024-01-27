import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Response } from 'src/app/interface/response.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
  response: Response;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.userService.getUsers(15).subscribe(
        (results: any) => {
          console.log(results);
          this.response = results;
        }
      );
  }

}
