import { Component } from '@angular/core';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { UserDto } from 'src/app/models/user-dto';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  users!: UserDto[];
  admin: UserDto;
  constructor(private usersService: UsersService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    if (localStorage.getItem('user'))
      this.admin = JSON.parse(localStorage.getItem('user'));
    this.findAllUsers();
  }

  private findAllUsers() {
    this.usersService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
        }
      })
  }
  deleteUser(user: UserDto) {
    if (this.admin.id != user.id) {
      this.confirmationService.confirm({
        header: 'Delete User',
        message: `Are you sure you want to delete ${user.name}? You can't undo this afterwards.`,

        accept: () => {
          this.usersService.deleteUser(user.id)
            .subscribe({
              next: () => {
                this.findAllUsers();
                this.messageService.add({
                  severity: 'success',
                  summary: 'User deleted',
                  detail: `User ${user.name} was successfully deleted`
                });
              }
            });
        },
        reject: (type) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
              break;
            case ConfirmEventType.CANCEL:
              this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
              break;
          }
        }
      });
    }
  }
  updateUser(user: UserDto) {
    if (this.admin.id != user.id) {
      user.isAdmin = !user.isAdmin;
      this.usersService.updateUser(user.id, user).subscribe({
        next: () => {
          this.findAllUsers();
          this.messageService.add({
            severity: 'success',
            summary: 'User Updated',
            detail: `User ${user.name} was successfully Update to ${user.isAdmin ? "Admin" : "Customer"}`
          });
        },
        error: () => {
          this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'nothing change' })
        }
      });
    }
  }

}


