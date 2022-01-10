render();
console.log("Hey hello this is snehill..");
class Book {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}

class Display {
  add(book) {
    let data = localStorage.getItem("Record");
    let dataObj;
    if (data == null) {
      dataObj = [];
    } else {
      dataObj = JSON.parse(data);
    }
    let booksObj = {
      BookName: book.name,
      BookAuthor: book.author,
      BookType: book.type,
    };
    dataObj.push(booksObj);
    localStorage.setItem("Record", JSON.stringify(dataObj));

  }

  clear() {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
  }
  validate(book) {
    if (book.name.length < 2 || book.author.length < 2) {
      return false;
    } else {
      return true;
    }
  }



  show(type, Message) {
    let message = document.getElementById("message");
    let hmsg;
    if (type === "success") {
      hmsg = "Yuhhuu!!!";
    } else {
      hmsg = "Opps!";
    }
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${hmsg}</strong> ${Message}.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    setTimeout(function () {
      message.innerHTML = "";
    }, 4000);
  }

  
}

function render() {
    let Data = localStorage.getItem("Record");
    let dataObj;
    if(Data == null){
        dataObj = []
    }
    else{
        dataObj = JSON.parse(Data);
    }
    let html = "";
    dataObj.forEach(function (element, index) {
      html += `<tr>
            
            <th scope="row">--</th>
            <td class ="my-auto">${element.BookName}</td>
            <td class ="my-auto">${element.BookAuthor}</td>
            <td class ="my-auto">${element.BookType}</td>
            <td class ="my-auto"><button type="button" onclick="dedlete(this.id)" class="btn  btn-outline-danger py-0 px-0.5 my-auto" id="${index}">Remove</button>
            </td>   
            </tr>
            `;
      tableBody.innerHTML = html;
      console.log(html)
    
    });
  }



let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", libraryFormSubmit);


function dedlete(pop){
    // console.log("hey this is")
    let Data = localStorage.getItem("Record");
    let dataObj;
    if(Data == null){
        dataObj = []
    }
    else{
        dataObj = JSON.parse(Data);
    }
    dataObj.splice(pop,1);
    localStorage.setItem('Record', JSON.stringify(dataObj));
    document.location.reload()
    // render()
    
}
function libraryFormSubmit(e) {
  console.log("You have submitten library form..");
  let name = document.getElementById("bookName").value;
  let author = document.getElementById("author").value;

  // fiction programming cooking

  let fiction = document.getElementById("fiction");
  let programming = document.getElementById("programming");
  let cooking = document.getElementById("cooking");
  let type;
  if (fiction.checked) {
    type = fiction.value;
  } else if (programming.checked) {
    type = programming.value;
  } else if (cooking.checked) {
    type = cooking.value;
}

  let display = new Display();
  let book = new Book(name, author, type);
  // console.log(book)
  if (display.validate(book)) {
    display.add(book);
    display.clear();
    display.show("success", "Your book has sucessfully submitted.");
    render();
  } 
  else {
    //Show erro to the user
    display.show("danger", "Sorry you can not add this book.");
  }
  e.preventDefault();
}
