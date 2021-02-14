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

  edit(event) {
    let employee = event.target.parentNode.parentNode.children[0];
    let building = event.target.parentNode.parentNode.children[1];
    let workplace = event.target.parentNode.parentNode.children[2];
    let icons = event.target.parentNode.parentNode.children[3];

    employee.innerHTML = `
      <input type="text" value="${employee.innerHTML}">
    `;

    building.innerHTML = `
    <select id="select-edit" name="building value="">
      <option value="Prédio 1">Prédio 1</option>
      <option value="Prédio 2">Prédio 2</option>
      <option value="Prédio 3">Prédio 3</option>
    </select>
    `;

    workplace.innerHTML = `
    <input type="text" value="${workplace.innerHTML}">
    `;

    icons.innerHTML = `
    <i class="fas fa-check" onclick="EmployeeInfo.save(event)"></i>
    <i class="fas fa-times" onclick="EmployeeInfo.cancel(event)"></i>`;
  },

  save(event, index) {
    let employee = event.target.parentNode.parentNode.children[0];
    let building = event.target.parentNode.parentNode.children[1];
    let workplace = event.target.parentNode.parentNode.children[2];
    let icons = event.target.parentNode.parentNode.children[3];

    employee.innerHTML = employee.children[0].value;
    building.innerHTML = building.children[0].value;
    workplace.innerHTML = workplace.children[0].value;

    icons.innerHTML = `
    <i class="fas fa-pencil-alt" onclick="EmployeeInfo.edit(event)" id="edit"></i>
    <i class="fas fa-trash" onclick="EmployeeInfo.remove(${index})"></i>
    `;
  },

  cancel(event) {
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
      <td id="employee-value">${employeeInfo.employee}</td>
      <td id="building-value">${employeeInfo.building}</td>
      <td id="workplace-value">${employeeInfo.workplace}</td>
      <td>
        <i class="fas fa-pencil-alt" onclick="EmployeeInfo.edit(event)" id="edit"></i>
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
