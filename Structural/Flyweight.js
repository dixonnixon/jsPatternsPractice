//Разделение списка неизменных строк на все приложение
//сетевые приложения или текстовые процессоры, кеш для изображений
//

//реализация онлайн платформы форматирования кода буз FWpattern`a 
//где пользователь загружает много файлов для форматирования(минимизация, украшение(beutyfier) e.g.)
//за что отвечает функ-я Formatter.format(codefileName) 
class CodeFile {
    constructor(name) {
        this.name = name; // is an intrinsic state
    }
}

class Formatter {
    format(codefileName) {}
}

class PythonFormatter extends Formatter {
    constructor() {
        super();
        console.log("Py formatter created");
    }

    format(codefileName) { // codefileName - is an extrinsic state
        console.log(`"Fromatting the Python ${codefileName} file you uploaded.`)
    }
}


class JavaFormatter extends Formatter {
 
    constructor(){
        super()
        console.log("Java Formatter instance created")
    }
     
   
    format(codefileName) {
        console.log(`"Fromatting the Java ${codefileName} file you uploaded.`)
    }
 
}

//end without FW
//Чтоб не создавать для каждого класса новый объект Formatter
//FW фак вернет его для использования автоматически))))))))
class FormatterFac { //FlyweightFactory
    constructor() {
        this.myFormatterMap = new Map();
    }

    createFormatter(type) {
        let formatter = this.myFormatterMap.get(type);
        // console.log(type, formatter);
        if(null == formatter) {
            if(type == "Java")
                formatter = new JavaFormatter();
            if(type == "Python")
                formatter = new PythonFormatter();

            this.myFormatterMap.set(type, formatter);
        }
        return formatter;
    }
}


const codefile1 = new CodeFile("helloworld.py");
let formatter = new FormatterFac();

const pythonFormatter = formatter.createFormatter("Python");
pythonFormatter.format(codefile1.name)
//uploading new codefile Python file
const codefile2 = new CodeFile("test.py")
const anotherPythonFormatter = formatter.createFormatter("Python")
anotherPythonFormatter.format(codefile2.name)
console.log("Both Python Formatter instances are the same? " + (anotherPythonFormatter === pythonFormatter))
//uploading a Java file
const codefile3 = new CodeFile("myfile.java")
const javaFormatter = formatter.createFormatter("Java")
javaFormatter.format(codefile3.name)

const codefile4 = new CodeFile("myfile1.java")
const anotherJavaFormatter = formatter.createFormatter("Java")
anotherJavaFormatter.format(codefile4.name)
console.log("Both Java Formatter instances are the same? " + (anotherJavaFormatter === javaFormatter))
console.log("Java and Python Formatter instances are the same? " + (pythonFormatter === javaFormatter))

//chellenge

//Dress содержит инфу про цены для всех обьектов и dressPrice устанавливает(находит) цену
//intrinsic 
class Dress {
    constructor(serialNumber,type,color,designer,availability){
      this.serialNumber = serialNumber
      this.type = type
      this.color = color
      this.designer = designer
      this.availability = availability
      this.price = 0;

      

      this.prices = { maxi: 1000,

        gown: 2000,

        skirt: 500
      }

      this.price = this.prices[this.type];
    }
    dressPrice(){
      //define
        
        return this.price;
    }
}

//flyweight factory 
class DressFactory {
    constructor() {
        this.myDressMap = new Map();
    }

    createDress(serialNumber,type,color,designer,availability) {
        let dress = this.myDressMap.get(serialNumber);
        if(null == dress) {
            dress = new Dress(serialNumber,type,color,designer,availability);

            this.myDressMap.set(serialNumber, dress);
        }
        return dress;
    }
}
//Похоже на IdentityMAP (POEAA)

// class DressFactory {
//     constructor() {
//       this.existingDresses = {}
//     }
  
//     createDress(serialNumber,type,color, designer, availability) {
//       var exists = this.existingDresses[serialNumber]
    
//       if (!!exists) {
//         return this.existingDresses[serialNumber]
//       }
//       else {
//           var dress = new Dress(serialNumber,type,color, designer, availability)
//           this.existingDresses[serialNumber]= dress
//           return dress
//         }
//       }
//   }
  
const factory = new DressFactory();
const pinkdress1 = factory.createDress("#123","skirt","pink","Zara","yes");
const pinkdress2 = factory.createDress("#123","skirt","pink","Zara","yes");

console.log(pinkdress1 === pinkdress2)
console.log(pinkdress1.dressPrice())
console.log(pinkdress2.dressPrice())