const Storage = {
  get() {
    return JSON.parse(sessionStorage.getItem("ArrLocaisTrabalho")) || [];
  },
  set(information) {
    sessionStorage.setItem("ArrLocaisTrabalho", JSON.stringify(information));
  },
};

const EmployeeInfo = {
  all: Storage.get(),

  add(employeeInfo) {
    EmployeeInfo.all.push(employeeInfo);
    App.reload();
  },

  remove(index) {
    EmployeeInfo.all.splice(index, 1);
    App.reload();
  },
};

const DOM = {
  workplaceContainer: document.querySelector("#data-table tbody"),

  addTableRow(employeeInfo, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLInformation(employeeInfo, index);
    tr.dataset.index = index;
    DOM.workplaceContainer.appendChild(tr);
  },

  innerHTMLInformation(employeeInfo, index) {
    const html = ` 
      <td>${employeeInfo.employee}</td>
      <td>${employeeInfo.building}</td>
      <td>${employeeInfo.workplace}</td>
      <td>
        <i class="fas fa-pencil-alt"></i>
        <i class="fas fa-trash" onclick="EmployeeInfo.remove(${index})"></i>
      </td>
    `;
    return html;
  },

  clearEmployeeInfo() {
    DOM.workplaceContainer.innerHTML = "";
  },
};

const Form = {
  employee: document.querySelector("input#employee"),
  building: document.querySelector("select#building"),
  workplace: document.querySelector("input#workplace"),

  getValues() {
    return {
      employee: Form.employee.value,
      building: Form.building.value,
      workplace: Form.workplace.value,
    };
  },

  validateFields() {
    const { employee, building, workplace } = Form.getValues();

    if (
      employee.trim() === "" ||
      building.trim() === "" ||
      workplace.trim() === ""
    ) {
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  clearFields() {
    Form.employee.value = "";
    Form.building.value = "";
    Form.workplace.value = "";
  },

  submit(event) {
    event.preventDefault();
    try {
      Form.validateFields();
      const employeeInfo = Form.getValues();
      EmployeeInfo.add(employeeInfo);
      Form.clearFields();
    } catch (error) {
      alert(error.message);
    }
  },
};

const App = {
  init() {
    EmployeeInfo.all.forEach((employeeInfo, index) => {
      DOM.addTableRow(employeeInfo, index);
    });
    Storage.set(EmployeeInfo.all);
  },

  reload() {
    DOM.clearEmployeeInfo();
    App.init();
  },
};

App.init();
