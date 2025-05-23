const API_URL = "https://6825ded2397e48c91313f363.mockapi.io/tasks";
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");

todoInput.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    addtodo();
  }
});

document.addEventListener("DOMContentLoaded", getToDos);
addButton.addEventListener("click", addtodo);
// function getToDos(){
//     fetch("https://6825ded2397e48c91313f363.mockapi.io/tasks")
//     // chuyen ve JSon
//     .then((response) => response.json())
//     // Lay du lieu
//     .then((data) => console.log(data))
//     // in ra neu loi
//     .catch((err)=> console.log(err) );

// }

// Get function
async function getToDos() {
  try {
    const response = await axios.get(API_URL);
    // .then((data) => console.log(data.data))
    // .catch((error)=> console.log(error) );
    const ul = document.querySelector(".Todo-list");
    ul.innerHTML = "";

    response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    console.log(response.data);

    response.data.forEach((item) => {
      // console.log(item);

      // tao the Li
      const li = document.createElement("li");
      // gan class voo
      li.className = "todo-item";
      // format ngay
      const date = new Date(item.createdAt);
      const formatDate = `${date.toLocaleTimeString()} - ${date.toLocaleDateString()}`;
      // gan noi dung
      li.innerHTML = `
                    <div class="todo-content">
                        <input type="checkbox">
                        <div>
                            <span>${item.content}</span>
                            <br>
                            <span> ${formatDate}</span>
                        </div>

                    </div>

                    <div class="todo-action">
                        <button onclick="handleUpdate(${item.id}, '${item.content}')" ><i class="fa-solid fa-pen-to-square"></i></button>
                        <button onclick="handleDelete(${item.id})"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
      // lay ra ds ul

      ul.appendChild(li);
    });
  } catch (error) {
    console.log(error);
  }
}

// post function
async function addtodo() {
  const inputData = todoInput.value.trim();

  const newTodo = {
    createdAt: new Date().toISOString(),
    content: inputData,
    isCompleted: false,
  };

  try {
    const response = await axios.post(API_URL, newTodo);
    todoInput.value = "";

    showNotification(" Added successfully!");

    getToDos();
    // console.log(response);
  } catch (error) {
    console.log(error);
  }
}

// Put function
function handleUpdate(id, content) {
  Swal.fire({
    title: "Edit Your Task",
    input: "text",
    inputAttributes: {
      autocapitalize: "off",
    },
    inputValue: content,
    showCancelButton: true,
    confirmButtonText: "Save",
    showLoaderOnConfirm: true,
    preConfirm: async (data) => {
      //   console.log(data);
      await axios.put(`${API_URL}/${id}`, {
        content: data,
      });

      getToDos();

      showNotification(" Updated successfully!");
    },
  });
}

// Delete function

function handleDelete(id) {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger mr-3",
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        await axios.delete(`${API_URL}/${id}`);
        getToDos();
        showNotification("Deleted successfuly!!");
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
}

function showNotification(message) {
  Swal.fire({
    title: message,
    width: 600,
    padding: "3em",
    color: "#716add",
    background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
    backdrop: `
    rgba(0,0,123,0.4)
    url("https://sweetalert2.github.io/images/nyan-cat.gif")
    left top
    no-repeat
  `,
  });
}
