const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");

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
    const response = await axios.get(
      "https://6825ded2397e48c91313f363.mockapi.io/tasks"
    );
    // .then((data) => console.log(data.data))
    // .catch((error)=> console.log(error) );
    const ul = document.querySelector(".Todo-list");
    // ul.innerHTML = "";

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
                        <button  ><i class="fa-solid fa-pen-to-square"></i></button>
                        <button><i class="fa-solid fa-trash"></i></button>
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
    const response = await axios.post(
      "https://6825ded2397e48c91313f363.mockapi.io/tasks",
      newTodo
    );
    todoInput.value = "";

    Swal.fire({
      title: "Thêm thành công",
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
    await axios.put(`https://6825ded2397e48c91313f363.mockapi.io/tasks/${id}`, 
        {
            content: data,
        }
    );

    }
  });
}
