var name = 'Nguyen Van Duc dep trai';

function checkName(name){
    for(let i = 0; i < name.length; i++){
        if(name.charAt(i) === ' '){
            var newName = name.substr(0, i) + name.substr(i + 1);
            name = newName;
        }
    }
    return name;
}
console.log(checkName(name));
