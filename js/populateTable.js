let listOfTask;

document.addEventListener('DOMContentLoaded', async function () {

    const response = await fetch('https://chingpay-payment.herokuapp.com/v1/getTasks', {
                // mode: 'no-cors',
                method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                },
        }
    ).then(response => {
        console.log(response + "+ here");
        return response.json();
    }).catch(error => console.error(error));
    console.log(response.length.toString() + "now");
    for (let i = 0; i < response.length; i++) {
        let tasks = new CashAppDB(response[i].id, response[i].userName, response[i].amount, response[i].status,
            response[i].createdOn, response[i].completedOn, response[i].transactionId, response[i].note)
        listOfTask = Object.entries(tasks);
        if(response[i].status.toUpperCase() === "COMPLETED".toUpperCase()){
            completedTask(response[i].userName, response[i].amount, response[i].note, response[i].id, response[i].transactionId)
        }else if(response[i].status.toUpperCase() === "FAILED".toUpperCase()){
            failedTask(response[i].userName, response[i].amount, response[i].note, response[i].id, response[i].transactionId);
        }else{
            addTask(response[i].userName, response[i].amount, response[i].note, response[i].id, response[i].transactionId);
        }
    }

});

function addTask(name, money, note, id, transactionId) {
    // Get the table
    const table = document.getElementById('todo-tasks-table');

    console.log("add task - " +name+money+note);

    // Create a new row
    const addTaskRow = table.insertRow();

    const input = document.getElementById("myInput");

    // Insert a new cell for the task
    const idCell = addTaskRow.insertCell();
    const idName = document.createTextNode(id);
    idCell.appendChild(idName);

    const usernameCell = addTaskRow.insertCell();
    const usernameName = document.createTextNode(name);
    usernameCell.appendChild(usernameName);

    input.value = "";

    const amountCell = addTaskRow.insertCell();
    const amountName = document.createTextNode(money);
    amountCell.appendChild(amountName);

    const noteCell = addTaskRow.insertCell();
    const noteName = document.createTextNode(note !== null || note !== ""? note : "empty note");
    noteCell.appendChild(noteName);

    const transactionIdCell = addTaskRow.insertCell();
    const transactionIdName = document.createTextNode(transactionId);
    transactionIdCell.appendChild(transactionIdName);

    // Insert a new cell for the button
    const completeButtonCell = addTaskRow.insertCell();
    const completeButton = document.createElement('button');
    completeButton.innerHTML = 'Complete';
    completeButton.addEventListener('click', async () => {
        // Mark the task as complete
        completedTask(usernameName.textContent, amountName.textContent, noteName.textContent, idName.textContent, transactionIdName.textContent);
        table.deleteRow(addTaskRow.rowIndex);
        completeButton.disabled = true;
        await updateDB(idName.textContent, "COMPLETED", transactionIdName.textContent);

    });
    completeButtonCell.appendChild(completeButton);

    const failedButtonCell = addTaskRow.insertCell();
    const failedButton = document.createElement('button');
    failedButton.innerHTML = 'Fail';
    failedButton.addEventListener('click', async () => {
        // Mark the task as complete
        failedTask(usernameName.textContent, amountName.textContent, noteName.textContent, idName.textContent, transactionIdName.textContent);
        table.deleteRow(addTaskRow.rowIndex);
        failedButton.disabled = true;
        await updateDB(idName.textContent, "FAILED", transactionIdName.textContent);
    });
    failedButtonCell.appendChild(failedButton);
}

function completedTask(name, money, note, id, transactionId) {
    const completeTable = document.getElementById('completed-tasks');

    // Create a new row
    const completeTaskRow = completeTable.insertRow();

    // Insert a new cell for the task
    const idCell = completeTaskRow.insertCell();
    const idName = document.createTextNode(id);
    idCell.appendChild(idName);

    const usernameCell = completeTaskRow.insertCell();
    const username = document.createTextNode(name);
    usernameCell.appendChild(username);

    const amountCell = completeTaskRow.insertCell();
    const amountName = document.createTextNode(money);
    amountCell.appendChild(amountName);

    const noteCell = completeTaskRow.insertCell();
    const noteName = document.createTextNode(note);
    noteCell.appendChild(noteName);

    const transactionIdCell = completeTaskRow.insertCell();
    const transactionIdName = document.createTextNode(transactionId);
    transactionIdCell.appendChild(transactionIdName);

    // Insert a new cell for the button
    const buttonCell = completeTaskRow.insertCell();
    const button = document.createElement('button');
    button.innerHTML = 'Undo';
    button.addEventListener('click', () => {
        // undo the task from complete
        addTask(username.textContent, amountName.textContent, noteName.textContent, idName.textContent, transactionIdName.textContent);
        completeTable.deleteRow(completeTaskRow.rowIndex);
        button.disabled = true;
    });
    buttonCell.appendChild(button);
}

function failedTask(name, money, note, id, transactionId) {
    // Get the table
    const failedTable = document.getElementById('failed-tasks');

    // Create a new row
    const failedTaskRow = failedTable.insertRow();

    // Insert a new cell for the task
    const idCell = failedTaskRow.insertCell();
    const idName = document.createTextNode(id);
    idCell.appendChild(idName);

    const usernameCel = failedTaskRow.insertCell();
    const usernameName = document.createTextNode(name);
    usernameCel.appendChild(usernameName);

    const amountCel = failedTaskRow.insertCell();
    const amountName = document.createTextNode(money);
    amountCel.appendChild(amountName);

    const noteCell = failedTaskRow.insertCell();
    const noteName = document.createTextNode(note);
    noteCell.appendChild(noteName);

    const transactionIdCell = failedTaskRow.insertCell();
    const transactionIdName = document.createTextNode(transactionId);
    transactionIdCell.appendChild(transactionIdName);

    // Insert a new cell for the button
    const retryButtonCell = failedTaskRow.insertCell();
    const retryButton = document.createElement('button');
    retryButton.innerHTML = 'retry';
    retryButton.addEventListener('click', () => {
        // Mark the task as complete
        addTask(usernameName.textContent, amountName.textContent, noteName.textContent, idName.textContent, transactionIdName.textContent);
        failedTable.deleteRow(failedTaskRow.rowIndex);
        retryButton.disabled = true;
    });
    retryButtonCell.appendChild(retryButton);
}

function openLogoutModal(){
    window.location.href = "taskPage.html";
}

async function updateDB(id, status, transactionId){
    let response;
    let param = "?id="+id+"&status="+status+"&transactionId="+transactionId;
    try {
        response = await fetch('https://chingpay-payment.herokuapp.com/v1/updateTasks'+param, {
            // mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(data => {
            // console.log(data.json() + " here");
            return data.json();
        });
        console.log(response + " here");
    } catch (error) {
        console.error(error);
    }
    console.log(response);
    return response;
}

async function openLoginModal(){
//     const username = document.getElementById("Uname").value;
//     const password = document.getElementById("Pass").value;
//     let response;
//     let data;
//
//     if (username != null && username !== "" && password != null && password !== "" ) {
        // const url = "http://localhost:8083/v1/signIn?uname="+username+"&pass=" + password;
        // // alert(url);
        //     await fetch(url, {
        //         mode: 'no-cors',
        //         method: 'GET',
        //             headers: {
        //             'Content-Type': 'application/json',
        //         },
        //     }).then(response =>{
        //         alert("getting here " + response.statusText );
        //         if(response.ok){
        //             console.log(response.text());
                    window.location.href = "taskPage.html";
            //     }
            // }).catch(error => console.error(error))
        //     console.log(response + "shdbvsdjbnvsndiob");
        //     data = response.text();
        //     console.log(data);
        // } catch (error) {
        //     console.error(error.text());
        //     alert(error)
        // }
        //
        // if(data === "Successful"){
        //     alert("Login successful!");
        //     window.location.href = "taskPage.html";
        //     console.log("Successful uywi");
        //     alert("Login successful!");
        //     return ;
        // }
    // }
        // alert("Invalid username or password. Please try again.");
}

class CashAppDB {
    constructor( id, userName, amount, status, createdOn, completedOn,
                 transactId, note) {
        this.id = id;
        this.userName = userName;
        this.amount = amount;
        this.status = status;
        this.createdOn = createdOn;
        this.completedOn = completedOn;
        this.transactionId = transactId;
        this.note = note;
    }
}