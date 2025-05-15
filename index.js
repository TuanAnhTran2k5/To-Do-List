document.addEventListener("DOMContentLoaded", getToDos);

// function getToDos(){
//     fetch("https://6825ded2397e48c91313f363.mockapi.io/tasks")
//     // chuyen ve JSon
//     .then((response) => response.json())
//     // Lay du lieu
//     .then((data) => console.log(data))
//     // in ra neu loi
//     .catch((err)=> console.log(err) );

    
// }

async function getToDos(){
   try{
    const response = await axios.get("https://6825ded2397e48c91313f363.mockapi.io/tasks");
    // .then((data) => console.log(data.data))
    // .catch((error)=> console.log(error) );
    console.log(response.data);

    response.data.forEach((item)=>{
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
                        <button><i class="fa-solid fa-pen-to-square"></i></button>
                        <button><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
        // lay ra ds ul
        const ul = document.querySelector(".Todo-list");
        ul.appendChild(li);
    });






   } catch (error){
    console.log(error);
   }
}