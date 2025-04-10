'use strict'

/* ------------------------- User/Admin ------------------------- */

class User {
    constructor(name, role, password) {
        this._name = name;
        this._role = role;
        this._password = password;
    }

    getName() {
        if (typeof this._name === 'string') {
            return this._name;
        } else {
            alert('Введіть тільки літери');
            return null;
        }
    }

    getRole() {
        if (this._role === 'admin' || this._role === 'user') {
            return this._role;
        } else {
            alert('Можна вводити тільки admin або user');
            return null;
        }
    }

    getPassword() {
        if (typeof this._password === 'string' && this._password.length >= 8) {
            return this._password;
        } else {
            alert('Пароль повинен містити не менше 8 символів');
            return null;
        }
    }

    login() {
        const name = this.getName();
        const role = this.getRole();
        const password = this.getPassword();

        if (name && role && password) {
            alert(`Ви успішно увійшли до системи як ${role}`);
            return true;
        } else {
            alert('Нажаль, введені неправильні дані');
            return false;
        }
    }

    logout() {
        const name = this.getName();

        if (name) {
            alert(`Ви вийшли з системи`);
            return true;
        } else {
            alert('Нажаль, немає активного користувача для виходу');
            return false;
        }
    }

    changeName(oldName, newName) {
        const currentName = this.getName();

        if (currentName === oldName) {
            if (typeof newName === 'string' && newName !== oldName) {
                this._name = newName;
                alert(`Ім'я користувача змінено з ${oldName} на ${this.getName()}`);
                return true;
            } else if (newName === oldName) {
                alert('Ваше нове ім\'я не може бути як старе');
                return false;
            } else {
                alert('Нове ім\'я введено некоректно');
                return false;
            }
        } else {
            alert('Ваше старе ім\'я введено неправильно');
            return false;
        }
    }

    changePassword(oldPassword, newPassword) {
        const currentPassword = this.getPassword();

        if (currentPassword === oldPassword) {
            if (typeof newPassword === 'string' && newPassword.length >= 8) {
                this._password = newPassword;
                alert('Пароль користувача успішно змінено');
                return true;
            } else {
                alert('Новий пароль введено некоректно (мінімум 8 символів)');
                return false;
            }
        } else {
            alert('Ваш старий пароль введено неправильно');
            return false;
        }
    }
}

const user1 = new User('Svitlana', 'user', '12345678');
// alert(user1.getName());
// alert(user1.getRole());
// alert(user1.getPassword());
// alert(user1.login());
// alert(user1.logout());
// alert(user1.changeName('Svitlana', 'Iryna'));
// alert(user1.getName());
// alert(user1.changePassword('12345678', 'qwerty12'));
// alert(user1.getPassword());
// alert(user1.login());

class Admin extends User {
  constructor(name, role, password){
      super(name, role, password);
      this.users = [];
  }

  findUserByName(searchName) {
    return this.users.find(user => user.getName() === searchName);
  }

  addUser(name, role, password) {
    if (this.findUserByName(name)) {
      alert(`Користувач з ім'ям ${name} вже існує!`);
      return false;
  }
  
      const newUser = new User(name, role, password);
      const newUserName = newUser.getName();
      const newUserRole = newUser.getRole();
      const newUserPassword = newUser.getPassword(); 

      if (newUserName && newUserRole && newUserPassword) {
          this.users.push(newUser);    
          alert(`Користувач під ім'ям ${newUserName} успішно створений`);  
          return true;    
      } else {
          alert(`Нажаль, не вдалося створити такого користувача`);
      }
  }

  removeUser(name) {
    const indexToRemove = this.users.findIndex(user => user.getName() === name);

    if (indexToRemove !== -1) {
        this.users.splice(indexToRemove, 1);
        alert(`Користувача з ім'ям ${name} успішно видалено.`);
        return true;
    } else {
        alert(`Користувача з ім'ям ${name} не знайдено.`);
        return false;
    }
  }

  changeUserRole (name, role) {
    const roleToChange = this.users.findIndex(user => user.getName() === name);

    if(roleToChange !== -1) {
      const userNewRole = this.users[roleToChange];

      if(role === 'user' || role === 'admin'){

        if(role !== userNewRole.getRole()){
          userNewRole._role = role;
          alert(`Роль успішно змінено на ${role}`);
          return true;
        } else {
          alert(`Користувач вже має таку роль`);
          return false;
        }
      } else {
        alert(`Нажаль такої ролі немає, є тільки user/admin`);
        return false;
      }
    } else {
      alert(`Користувача з таким іменем не знайдено`);
    }
  }

  getAllUsers(){
    if(this.users.length === 0){
      alert(`Список порожній`);
      return false;
    }

    let usersString = `Список користувачів:\n`;
    this.users.forEach((user, index) => {
      usersString += `${index + 1}. ${user.getName()}; Роль: ${user.getRole()};\n`;
    });

    alert(usersString);
  }

  removeAllUsers() {
    this.users = [];
    alert(`Список користувачів був очищений`);
  }
}


const admin = new Admin('Ivan', 'admin', 'navicom1234');
// admin.addUser('Світлана', 'user', '12345678');
// admin.addUser('Юлія', 'user', 'qazwsxed');
// admin.addUser('Олег', 'admin', 'secure123');
// admin.addUser('Ірина', 'admin', 'qwerty12');
// admin.addUser('Ярослав', 'user', '12qwerty');
// admin.getAllUsers();
// admin.removeAllUsers();
// admin.getAllUsers();
// alert(admin.addUser('Юлія', 'user', 'qazwsxed'));
// alert(admin.removeUser('Юлія'));
// alert(admin.changeUserRole('Світлана', 'admin'));
// alert( (admin.findUserByName('Світлана')).getRole() );



/* ------------------------- Hours ------------------------- */


class Clock {
    constructor(timezone, container) { 
        this.timezone = timezone;
        this.container = container;
        this.element = this.createClockElement(); 
        this.container.appendChild(this.element); 
    }

    getCurrentDate(){
        const options = {
            timeZone: this.timezone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        return new Date().toLocaleString(undefined, options);
    }

    getCurrentDateTime(){
        const options = {
            timeZone: this.timezone,
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        }
        return new Date().toLocaleTimeString(undefined, options);
    }

    deleteClock(){
        this.element.remove();
    }

    createClockElement(){
        const clock = document.createElement('div');
        clock.innerHTML = `
            <article>
                <h3>${this.timezone}</h3>
                <p class="clock-text"></p>
                <div class="clock-btns">
                    <button class="btn-date">Дата</button>
                    <button class="btn-time">Час</button>
                    <button class="btn-del">Видалити</button>
                </div>
            </article>
        `;

        const clockText = clock.querySelector('.clock-text');
        const dateButton = clock.querySelector('.btn-date');
        const timeButton = clock.querySelector('.btn-time');
        const deleteButton = clock.querySelector('.btn-del');

        dateButton.addEventListener('click', () => {
            clockText.textContent = `Поточна дата: ${this.getCurrentDate()}`;
        });

        timeButton.addEventListener('click', () => {
            clockText.textContent = `Поточний час: ${this.getCurrentDateTime()}`;
        });

        deleteButton.addEventListener('click', () => {
            this.deleteClock();
        });

        return clock; 
    }
}

document.querySelector('.form').addEventListener('submit', (event) => {
    event.preventDefault();

    const zoneTimeInput = document.querySelector('#time-zone');
    const clocksContainer = document.querySelector('.clock-container'); 

    const timezone = zoneTimeInput.value.trim();

    try {
        new Intl.DateTimeFormat(undefined, { timeZone: timezone }).format();
        const newClock = new Clock(timezone, clocksContainer);
        zoneTimeInput.value = ''; 
    } catch (error) {
        if (error instanceof RangeError) {
            alert('Введено неправильний часовий пояс');
        } else {
            alert('Виникла помилка при перевірці часового поясу');
            console.error(error);
        }
    }
});