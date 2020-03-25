/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách, cho biết thư viện này có hàng trăm giá sách khác nhau, sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới, một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, sách B quá 3 ngày -> tổng 5 ngày
 */

var readlineSync = require('readline-sync')
var fs = require('fs')

var library = [
  {
    id: 01,
    name: 'bookShelf1'
  },
  {
    id: 02,
    name: 'bookShelf2'
  },
  {
    id: 03,
    name: 'bookShelf3'
  }
]
var books = [
  { id: 00001, name: 'cha dau cha ngheo', price: 90000, bookshelf: 01 },
  { id: 00002, name: 'chu meo di hia', price: 88000, bookshelf: 01 },
  { id: 00003, name: 'hau cung', price: 12000, bookshelf: 02 },
  { id: 00004, name: 'khi phach anh hung', price: 33000, bookshelf: 02 },
  { id: 00005, name: 'moi tinh dau tien', price: 42000, bookshelf: 02 },
  { id: 00006, name: 'eo le cuoc tinh', price: 232000, bookshelf: 03 },
  { id: 00007, name: '1001 chu cho den', price: 84000, bookshelf: 03 }
]
var customers = [];

function showCustomers(){
  var customer =  fs.readFileSync('./khach.json', {encoding: 'utf8'});
  customers =  JSON.parse(customer);
  console.log(customers);
}
function register(){
  var id = customers.length;
  var name = readlineSync.question('What is customer\'s name? ');
  var age = readlineSync.question('How old is customers? ');
  let customer = {
    id: id,
    name: name,
    age: JSON.parse(age)
  }
  customers.push(customer);
  content = JSON.stringify(customers); 
  fs.writeFileSync('./khach.json',content, {encoding: 'utf8'});
  showCustomers();
}
function delCustomer(){
  var customer =  fs.readFileSync('./khach.json', {encoding: 'utf8'});
  customers =  JSON.parse(customer);
  var del = 0;
  var count = 0;
  // function lowName(name){
  //   for(let i = 0; i < name.length; i++){
  //       if(name.charAt(i) === ' '){
  //           var newName = name.substr(0, i) + name.substr(i + 1);
  //           name = newName;
  //       }
  //   }
  //   return name;
  // }
  function checkName(array, name){
    for(let item of array){
      // var namecheck = lowName(item.name);
      console.log(typeof name);
      
      if(item.id === parseInt(name) || item.name.toLowerCase() === name.toLowerCase()){
        count++;
        var del = array.indexOf(item);
      }
    }
    if(count == 0){
      return 1;
    }else{
      return 0;
    }
  }
  do{
    var infor = readlineSync.question('Nhap ID hoac TEN cua khach hang muon xoa. ');
  }while(checkName(customers, infor))
  customers.splice(del, 1);
  console.log(customers);
  content = JSON.stringify(customers); 
  fs.writeFileSync('./khach.json', content, {encoding: 'utf8'});
}
function showMenu(){
  console.log('===================== LIBRARY ==================');
  console.log('=========== Quan Ly Sach ===========');
  console.log('1. Insert Book.');
  console.log('2. Change contact. ');
  console.log('3. Delete contact. ');
  console.log('4. Search contact. ');
  console.log('======== Quan Ly Khach Hang ========');
  console.log('5. Dang Ky Khach Hang. ');
  console.log('6. Danh Sach Khach Hang. ');
  console.log('7. Xoa Khach Hang. ');
  console.log('8. Kiem Tra Lich Su Muon Sach. ');
  console.log('9. Exit. ');
  console.log('================================================');
  var option = readlineSync.question('> ');
    switch(option){
      case '1':
        showMenu();
        break;
      case '2':
        showMenu();
        break;
      case '3':
        showMenu();
        break;
      case '5':
        register();
        showMenu();
        break;
      case '6': // show khach hanh
        showCustomers();
        showMenu();
        break;
      case '7':
        delCustomer();
        showMenu();
        break;
      case '9':
        console.log('Goodbye!');
        console.log('=============================================');
        break;
      default:
        console.log('Wrong option');
        showMenu();
        break;
    }
}
function main(){
  showMenu();
}
main();