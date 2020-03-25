/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var readlineSync = require('readline-sync');
var fs = require('fs');
var contacts = [];

function loadData(){
    var fileContent = fs.readFileSync('./khach.json',{ encoding: 'utf8'});
    contacts = JSON.parse(fileContent);
}
function updateData(contact){
    contacts.push(contact);
    contact = JSON.stringify(contacts);
    let file = fs.writeFileSync('./khach.json',contact, {encoding: 'utf8'});
}
function showMenu(){
    console.log('1. Insert contact.');
    console.log('2. Change contact.');
    console.log('3. Delete contact.');
    console.log('4. Search contact.');
    console.log('5. Exit.');
    console.log('=============================================');
    var option = readlineSync.question('> ');
    switch(option){
        case '1':
            insertContact();
            console.log(contacts);
            showMenu();
            break;
        case '2':
            changeContact();
            showMenu();
            break;
        case '3':
            deletelContact();
            showMenu();
            break;
        case '4':
            seachContact();
            showMenu();
            break;
        case '5':
            console.log('Goodbye!');
            console.log('=============================================');
            break;
        default:
            console.log('Wrong option');
            showMenu();
            break;
    }
}
function insertContact(){
    let name = readlineSync.question('Name of contact: ');
    let number= readlineSync.question('Numbers phone: ');
    let contact = {
        name: name,
        phoneNumber: number
    };
    contacts.push(contact);
    let content = JSON.stringify(contacts);
    let file = fs.writeFileSync('./khach.json',content, {encoding: 'utf8'});
    console.log('Done!');
    
    console.log('=============================================');
}
function changeContact(){
    loadData();
    function check(name, array){
        var count = 0;
        for(let item of array){        
            if(name == item.name){
                count++;
                del = array.indexOf(item);
            }
        }
        if(count == 0){
            return 1;
        }else{
            return 0;
        } 
    }
    do{
        var choiceName = readlineSync.question('Choice the name you want to change: ');
    }while(check(choiceName, contacts));
    
    let changeName = readlineSync.question('New Name: ');
    let changeNumber = readlineSync.question('New number: ');
    let newContact = {
        name: changeName,
        phoneNumber: changeNumber
    }
    contacts.splice(del, 1);
    updateData(newContact);
    console.log('Done!');
    console.log('=============================================');
    
}
function deletelContact(){
    loadData();
    var del = 0;
    function check(name, array){
        var count = 0;
        for(let item of array){        
            if(name == item.name){
                count++;
                del = array.indexOf(item);
            }
        }
        if(count == 0){
            return 1;
        }else{
            return 0;
        } 
    }
    do{
        var choiceName = readlineSync.question('Choice the name you want to delete: ');
    }while(check(choiceName, contacts));
    contacts.splice(del, 1);
    contact = JSON.stringify(contacts);
    let file = fs.writeFileSync('./data.json',contact, {encoding: 'utf8'});
    console.log('Done!');
    console.log(contacts);
    console.log('=============================================');
}
function seachContact(){
    loadData();
    var choiceName = readlineSync.question('Choice the name you want to seach. ')
    var lengthOfChoice = choiceName.length;
    function check(choice){
        var count = 0;
        for (let item of contacts){
            if(choice.toLowerCase() == item.name.toLowerCase() || choice == item.phoneNumber.slice(0,lengthOfChoice)){
                console.log(item);
                count++;
            }
        }
        if(count == 0){
            console.log('ko tim duoc');
        }
    }
    check(choiceName);
}
function main(){
    loadData();
    console.log(contacts);
    showMenu();
}
main();