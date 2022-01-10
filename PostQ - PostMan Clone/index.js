console.log("hey hello this is snehill....");

//Utility functions
//1. utility function to get dom element from string
function getElementFromStringstring(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  //  console.log(div);
  //  console.log(div.firstElementChild);
  return div.firstElementChild;
}

//initilize no. of parameters
let addParamCount = 0;

//hide the paramets box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// if the user clicks on params box, hide the json box

let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});
// if the user clicks on jason box, hide the params box

let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

//if the user clicks on plus button, add more parameters
let addparam = document.getElementById("addParam");
addparam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
    <label for="url" class="col-sm-2 col-form-label">Parameter${
      addParamCount + 2
    }</label>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterKey${
          addParamCount + 2
        }" placeholder="Enter Parameter ${addParamCount + 2} Key">
    </div>
    <div class="col-md-4">
        <input type="text" class="form-control" id="parameterValue${
          addParamCount + 2
        }" placeholder="Enter Parameter ${addParamCount + 2} Value">
    </div>
    <button class="btn btn-primary deleteParam"> - </button>
</div>`;
  //Convert the element to DOM node
  let paramsElement = getElementFromStringstring(string);
  // console.log(paramsElement);
  params.appendChild(paramsElement);
  //Add an event listener to remove the parameter on clicking the minus button
  let deleteParam = document.getElementsByClassName("deleteParam");
  // console.log(deleteParam);

  for (item of deleteParam) {
    // console.log(item);

    item.addEventListener("click", (e) => {
      //Add a confermation box to confirm parameter deletion
      // console.log(e);
      e.target.parentElement.remove();
    });
  }
  addParamCount++;
});

//If the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  // Show please wait in the response box to request patience from the user
  //   document.getElementById('responseJsonText').value = "Please wait.... Fetching Response..."
  document.getElementById("responsePrism").innerHTML =
    "Please wait.... Fetching Response...";
  //Fetch all the values user has entered
  let url = document.getElementById("url").value;

  let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  let regex = new RegExp(expression);

  if (url.match(regex)) {

  let requestType = document.querySelector("input[name='requestType']:checked")
    .value;
  let contentType = document.querySelector("input[name='contentType']:checked")
    .value;
  console.log(contentType)
  // Log all the values in the console for debugging..
  //   console.log('Url is',url);
  //   console.log('ReqestType is',requestType);
  //   console.log('ContentType is',contentType);

  // If user has used params option instead of json, collect all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (i = 0; i < addParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
    console.log(data);
    console.log("party")
  } 
  else {
    data = document.getElementById("requestJsonText").value;
  }

  // console.log("Url is", url);
  // console.log("ReqestType is", requestType);
  // console.log("ContentType is", contentType);
  // console.log("Data is", data);
  // if Request type is get, invoke fetch api to create get request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
      });
  } else {
    fetch(url, {
      method: "POST",
      body: data,
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        // document.getElementById('responseJsonText').value = text;
        document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();
        console.log('hello');
        
      }).catch(()=>{
        document.getElementById("responsePrism").innerHTML = "404 Not Found"
          // body.innerHTML = 

      })
  }
  
} 
else {
  document.getElementById("responsePrism").innerHTML = "Invalid Url..."
}
});
