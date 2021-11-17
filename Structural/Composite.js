//Вложенные структуры 
//Компонент - асбстрактный класс с методами add,
//      romove, get для управления потомками. Может быть Лстом или Составным
//Составной - класс реализует компонент, имеет детей
//Лист - реализует компонент, не имеет детей

//Когда много дреговидных структур объектов
//для построения использоввания многоразовых интерфейсов

// Single elements
// $('#singleItem').addClass('active'); Leaf
// $('#container').addClass('active');
// // Collections of elements
// $('div').addClass('active'); Composite
// $('.item').addClass('active');
// $('input').addClass('active');

//Пр.: создание папок и подпапок,
class Employee {
    constructor(name, position, progress) {
        this.name = name;
        this.position = position;
        this.progress = progress;
    }

    getProgress() {

    }
}

class Devs extends Employee {
    constructor(name, position, progress) {
        super(name, position, progress);
    }

    getProgress() {
        return this.progress + "%";
    }
}

class FreelanceDev extends Employee {
    constructor(name, position, progress) {
        super(name, position, progress);
    }
    getProgress() {
        return this.progress + "%";
    }
}

class DevTeamLead extends Employee {
    constructor(name, position) {
        super(name, position);
        this.teamMembers = [];
    }
    
    addMember(emp) {
        this.teamMembers.push(emp);
    }

    removeMember(emp) {
        for(var i=0; i<this.teamMembers.length; i++){
            if(this.teamMembers[i] == emp){
                this.teamMembers.splice(i,1)
            }
        }
        return this.teamMembers
    }

    showTeam(){
        for(var i=0; i<this.teamMembers.length; i++){
            console.log(this.teamMembers[i].name)
        }
    }

    getProgress() {
        console.log(this.teamMembers.reduce(function(prev, curr) {
            // console.log(prev, curr);
            return prev + parseInt(curr.getProgress()); 
        }, 0) + "%");
    }
}

const seniorDev = new Devs("Rachel","Senior Developer","60");
const junDev = new Devs("Joey","Junior Developer","50");
const teamLead = new DevTeamLead("Fara","Dev Lead Team","90");

teamLead.addMember(seniorDev);
teamLead.addMember(junDev);

console.log("Team members list:")
teamLead.showTeam();

console.log("Get Team members progress:")
teamLead.getProgress()

console.log("Removing Rachel from team:")
teamLead.removeMember(seniorDev)

console.log("Updated team members list:")
teamLead.showTeam()

const freelanceDev = new FreelanceDev("Ross", "Free Lancer", "80")
console.log("Get freelance developer's progress:")
console.log(freelanceDev.getProgress()) 

teamLead.addMember(freelanceDev);

console.log("Team members list:")
teamLead.showTeam();

console.log("Get Team members progress:")
teamLead.getProgress()

console.log("Updated team members list:")
teamLead.showTeam()

//challenge

//Component
class Directory {
    constructor(name,lastModified,size) {
        this.name = name
        this.lastModified = lastModified
        this.size = size
    }

    getLastmodified() {}
    getSize() { return this.size; }
    getName() { return this.name; }
}

//Leaf subclass
class File extends Directory {
    constructor(name, lastMod, size) {
        super(name, lastMod, size);
    }

    getLastmodified() {
        return this.lastModified;
    }
}

//Compsoite subclass
class Folder extends Directory {
    constructor(name, lastModified) {
        super(name, lastModified);
        this.content = [];
        this.recalcSize();
    }

    getName() {
        return this.content.map((el) =>  el.name);
    }

    getLastmodified() {
        //console.log(this);
        return this.lastMod;
    }

    getSize() { return this.size; }

    recalcSize() {
        let size = 0;
        for(let i = 0; i < this.content.length; i++) {
            size += parseInt(this.content[i].getSize());
        }
        this.size = size;
    }

    recalcModified() {
            let min = parseInt(this.content[0].getLastmodified());
            for(let i = 0; i < this.content.length; i++) {
                if(this.content[i].getLastmodified() < min) {
                    min = parseInt(this.content[i].getLastmodified());
                }
            }
            this.lastMod = min;
    }

    addFile(file) {
        this.content.push(file);
        this.recalcSize();
        this.recalcModified();
        // this.size += file.getSize(); //в решении добавляется уберается сразу размер файла из общего
        // console.log(this.size);
    }

    removeFile(file) {
        for(var i=0; i<this.content.length; i++){
            if(this.content[i] == file){
                this.content.splice(i,1)
                // this.size -= file.getSize(); //в решении  уберается сразу размер файла из общего
            }
        }
        this.recalcSize();
        this.recalcModified();
        return this.content;
    }

    //в решении только при вызове метода выберается последняя измененный файл 
    // getLastmodified() {
    //     var times = []
    //     if (this.size == 0) {
    //       return this.lastModified
    //     }else{
    //       for (var i = 0; i < this.files.length; i++) {
    //         times[i] = this.files[i].lastModified
    //       }
    //       this.lastModified = Math.min(...times)
    //       return this.lastModified
    //     }
    //   }
}

//оригинальный вызов
// const file1 = new File("dogo.png", 2, 45)
// const file2 = new File("catty.png", 4, 32)
// const folder = new Folder("Pictures")
// folder.addFile(file1)
// folder.addFile(file2)
// console.log(folder.getLastmodified())
// console.log(folder.getSize())
// console.log(folder.getName())
// folder.removeFile(file2)
// console.log(folder.getName())
// console.log(folder.getSize())
// const file = new File("penguiny.png", 6, 12)
// console.log(file.getName())

const file1 = new File("penguiny.png",1,12);
console.log(file1.getLastmodified());
console.log(file1.getName());
console.log(file1.getSize());

const file2 = new File("dogo.png",16,13);
const file3 = new File("catty.png",10,14);

const fldr = new Folder('new', 2);

fldr.addFile(file1);
fldr.addFile(file2);
fldr.addFile(file3);

console.log(fldr.getLastmodified());
console.log(fldr.getName());
console.log(fldr.getSize());







