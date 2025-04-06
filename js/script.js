'use strict';

const form = document.querySelector('.form');
const result = document.querySelector('.result');
const studentList = [];

class Student {
  constructor(name, city, course) {
    this.name = name;
    this.city = city;
    this.course = course;
    this.isValid = true;
  }

  get checkForm() {
    return this.isValid;
  }

  set checkForm(form) {
    if (form.name.value === '' || form.city.value === '' || form.course.value === '') {
      alert('Ви не заповнили усі поля');
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }

  getResultStudent() {
    return `
      <li>Ім'я: ${this.name}<br>
      місто: ${this.city}<br>
      курс: ${this.course}<br>
      </li>
      <hr>
    `;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const name = form.name.value;
  const city = form.querySelector('[name="city"]').value || '';
  const course = form.querySelector('[name="course"]').value || '';
  const student = new Student(name, city, course);

  student.checkForm = form;
  if (!student.checkForm) return;

  studentList.push(student);
  renderStudentList();
  form.reset();
});

function renderStudentList() {
  result.innerHTML = studentList.map(student => student.getResultStudent()).join('');
}