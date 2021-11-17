//повторяющийся инструменты/фрагменты кода которые могут быть
//вынесены в отдельное пространство имен
const utils = {
    //отображение HTML из шаблона в интерфейс UI 
    html(el, html) {
        //тут может быть больше кода например асинхронная загрузка шаблона_))
        el.innerHTML = html;
    },
    //если не передан то возвращаем null
    //а если передан то поиск в форме или документе или возврарат его же
    //метод для нахождения єлемента DOM как jQuery
    el(selector, inst = document) {
        if(!selector) return null;
        if(typeof selector === 'string') return inst.querySelector(selector);
        return selector;
    },
    //прикрепить/открепить обработчик к элементу DOM
    //возвращает функцию чтоб открепить обработчик
    on(inst, selector, eventName, fn) {
        const handler = function(event) {
            if(event.target.matches(selector)) fn(event);
        }
        inst.addEventListener(eventName, handler);

        return function() {
            inst.removeEventListener(eventName, handler);
        };
    },
    //для оценки метода
    getResult(inst, getFn) {
        const fnOrAny = getFn && getFn();
        if(typeof fnOrAny === 'function')
        {
            return fnOrAny.call(inst);
        }
        return fnOrAny;
    }
};

function dispatcher() {
    const handlers = [];
    return {
        add() {
            if (!handler) {
                throw new Error(`Can\'t attach to empty handler`);
            }
            handlers.push(handler);
            return function () {
                const index = handlers.indexOf(handler);
                if (~index) {
                    return handlers.splice(index, 1);
                }
                throw new Error(`Ohm! Something went wrong with 
                                 detaching unexisting event handler`);
            };
        },
        notify() {
            const args = [].slice.call(arguments, 0);
            for (const handler of handlers) {
                handler.apply(null, args);
            }
        }
    };
}