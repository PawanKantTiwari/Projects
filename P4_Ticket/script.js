let filtersDiv = document.querySelectorAll(".filters-div div");
let add = document.querySelector(".add");
let closeOpenedModalBtn = document.querySelector(".delete");
// console.log(add);
let lower = document.querySelector(".lower");

function loadTickets(){
    if(localStorage.getItem("allTickets")){
      let allTickets = JSON.parse(localStorage.getItem("allTickets"));
      for(let i=0 ; i<allTickets.length ; i++){
        let {ticketId , ticketFilter , ticketContent} = allTickets[i];
  
        let ticketDiv = document.createElement("div");
        ticketDiv.classList.add("ticket");
        // set the html of the ticket wala div !!
        ticketDiv.innerHTML = ` <div class="ticket-color : ${ticketFilter}"></div>
        <div class="ticket-id">#${ticketId}</div>
        <div class="task">${ticketContent}</div>`;
  
        // append the ticket on the UI !!!!
        lower.append(ticketDiv);
      }
    }
  }
  loadTickets();

//creating a list of object
let FilterList = [{name : "red" , color: "#e74c3c"},
                  {name : "yellow" , color: "#f9ca24"},
                  {name : "green" , color: "#2ecc71"},
                  {name : "black", color: "#7f8c8d"},
                 ];

for(let i = 0; i<filtersDiv.length; i++)
{
    filtersDiv[i].addEventListener("click", changeBgrndOnFilterClick);
}
//cb function
function changeBgrndOnFilterClick(e){
    let clickedFilter = e.target.classList[0];
    for(let j = 0; j< FilterList.length; j++){
        if(FilterList[j].name == clickedFilter)
            lowerBackgroundColor = FilterList[j].color; 
    lower.style.background = lowerBackgroundColor;
    }
}

// adding new modal on the click on "add" 
add.addEventListener("click",openNewModal);
closeOpenedModalBtn.addEventListener("click", closeOpenedModal);

function closeOpenedModal(){
    let isModalPresent = document.querySelector(".modal");
    if(isModalPresent){
       document.querySelector(".modal").remove(".modal") ;
    }
    else{
        return;
    }
}

//cb Function
function openNewModal(){
    let isModalPresent = document.querySelector(".modal");
    if(isModalPresent){
        return;
    }
    let newModal = document.createElement('div');
    newModal.classList.add('modal');
    newModal.innerHTML = ` <div class="modal-msg" data-typed = "false" contenteditable="true">Enter Your Task</div>
                            <div class="modal-filters-div">
                                <div class="red modal-filter"></div>
                                <div class="yellow modal-filter"></div>
                                <div class="green modal-filter"></div>
                                <div class="black modal-filter active-filter"></div>
                            </div>`;
        lower.append(newModal);//so far, new Modal created and appended on lower 


        let ModalMsgBox = newModal.querySelector(".modal-msg")
        // console.log(ModalMsgBox);
        ModalMsgBox.addEventListener("click",clearText);
        ModalMsgBox.addEventListener("keypress",ModalToTicketOnEnter);
        let allModalFilters = newModal.querySelectorAll(".modal-filters-div div");
        // console.log(allModalFilters);
        for(let i = 0; i<allModalFilters.length; i++)
        {
            allModalFilters[i].addEventListener("click",chooseModalFilter);
        }
    }
    
    //cb Function
    let selectedFilter = "black";
    function chooseModalFilter(e){
    //    console.log(e.target.classList[0]);
    let clickedModalFilter = e.target.classList[0];
        if(clickedModalFilter == selectedFilter){
            return;
        }
        selectedFilter = clickedModalFilter;
        document.querySelector(".active-filter").classList.remove("active-filter");
        e.target.classList.add("active-filter");
    }
    
    //cb function To clear the text of ModalMsgBox 
    function clearText(e){
        if(e.target.getAttribute("data-typed") == "true"){
            return;
        }
        e.target.innerHTML = "";
        e.target.setAttribute("data-typed","true");
    }
    
    //cb function to Create a new Ticket on clicking "Enter" in Modalmsg
    function ModalToTicketOnEnter(e){
        if(e.key == "Enter"){
            let ticketId = uid();
            // e.target.parenNode.remove();
            let modalKaText = e.target.textContent;
            let newTicket = document.createElement("div");
            newTicket.classList.add("ticket");
            newTicket.innerHTML = `<div class="ticket-color ${selectedFilter}"></div>
            <div class="ticket-id">#${ticketId}</div>
            <div class="task" contenteditable="true">${modalKaText} </div>`
            lower.append(newTicket);
            lower.scrollTop = lower.scrollHeight;
            e.target.parentNode.remove();
            
            if(!localStorage.getItem('allTickets')){
                // first time ticket aayegi
                let allTickets = [];
                
                let ticketObject = {};
                ticketObject.ticketId = ticketId;
                ticketObject.ticketFilter = selectedFilter;
                ticketObject.ticketContent = modalKaText;
                allTickets.push(ticketObject);
                
                localStorage.setItem("allTickets" , JSON.stringify(allTickets));
            }
            else{
                // already tickets hain !!!
                let allTickets = JSON.parse(localStorage.getItem("allTickets"));
                let ticketObject = {};
                ticketObject.ticketId = ticketId;
                ticketObject.ticketFilter = selectedFilter;
                ticketObject.ticketContent = modalKaText;
                allTickets.push(ticketObject);

                
                localStorage.setItem("allTickets" , JSON.stringify(allTickets));
            }
            selectedFilter = "black";
        }
    }
    
    
