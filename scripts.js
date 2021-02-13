const Form = {
  submit(event) {
    event.preventDefault();
  },
};

const EmployeeInfo = {
  all: [
    {
      employee: "Rafa",
      building: "Prédio 1",
      workplace: "casa",
    },
    {
      employee: "Al",
      building: "Prédio 1",
      workplace: "casa",
    },
    {
      employee: "Alga",
      building: "Prédio 1",
      workplace: "casa",
    },
  ],

  add(employeeWorkplace) {
    EmployeeInfo.all.push(employeeWorkplace);
  },

  remove(index) {
    EmployeeInfo.all.splice(index, 1);

    App.reload();
  },
};

const DOM = {
  workplaceContainer: document.querySelector("#data-table tbody"),
  addTableRow(employeesWorkplace, index) {
    console.log(employeesWorkplace);
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLInformation(employeesWorkplace);
    DOM.workplaceContainer.appendChild(tr);
  },

  innerHTMLInformation(employeesWorkplace) {
    const html = ` 
      <td>${employeesWorkplace.employee}</td>
      <td>${employeesWorkplace.building}</td>
      <td>${employeesWorkplace.workplace}</td>
      <td>
        <i class="fas fa-pencil-alt"></i>
        <i class="fas fa-trash"></i>
      </td>
    `;
    return html;
  },

  clearEmployeeInfo() {
    DOM.workplaceContainer.innerHTML = "";
  },
};

const App = {
  init() {
    EmployeeInfo.all.forEach((employeeWorkplace) => {
      DOM.addTableRow(employeeWorkplace);
    });
  },

  reload() {
    DOM.clearEmployeeInfo();
    App.init();
  },
};

App.init();

EmployeeInfo.remove(0);
