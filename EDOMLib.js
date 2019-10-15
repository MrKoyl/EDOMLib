function _(selector, context = document) {

    function createElement(template) {
        let element;
        if(template.tag !== 'text') element = document.createElement(template.tag);
        else element = document.createTextNode(template.content);
        Object.keys(template).forEach((key) => {
            if(key !== "content" && key !== "tag"){
                if(key === "class") element.className = template[key];
                else element[key] = template[key];
            }
        });
        if(!Array.isArray(template.content)){
            if(template.tag !== 'text' && template.content) element.appendChild(document.createTextNode(template.content));
        }
        return element;
    }

    function createElements(template, parent) {
        if(!(template instanceof Array)) template = new Array(template);
        template.forEach((item) => {
            const element = createElement(item);
            parent.appendChild(element);
            if(Array.isArray(item.content)) createElements(item.content, element);
        })
    }

    class EDOMLib {
        constructor(selector, context){
            this.elements = context.querySelectorAll(selector) || [];
        }

        // Classes methods
        addClass(classNames){
            if(typeof(classNames) === "string") classNames = classNames.trim().split(" ");
            this.elements.forEach((element) => {
                classNames.forEach((className) => {
                    element.classList.add(className.trim());
                });
            });
            return this;
        }

        hasClass(className, every = true){
            if(every){
                return Array.prototype.every.call(this.elements, (element) => element.classList.contains(className));
            }
            return Array.prototype.some.call(this.elements, (element) => element.classList.contains(className));
        }

        removeClass(classNames){
            if(typeof(classNames) === "string") classNames = classNames.trim().split(" ");
            this.elements.forEach((element) => {
                classNames.forEach((className) => {
                    element.classList.remove(className.trim());
                });
            });
            return this;
        }

        toggleClass(classNames){
            if(typeof(classNames) === "string") classNames = classNames.trim().split(" ");
            this.elements.forEach((element) => {
                classNames.forEach((className) => {
                    className = className.trim();
                    if(element.classList.contains(className)) element.classList.remove(className);
                    else element.classList.add(className);
                });
            });
            return this;
        }

        // DOM-elements manipulating methods
        clear(){
            this.elements.forEach((element) => {
                for (let i = element.children.length - 1; i >= 0; i--) {
                    element.children[i].remove();
                }
            });
            return this;
        }

        add(template){
            this.elements.forEach((element) => {
                createElements(template, element);
            });
            return this;
        }

        // Events methods
        event(type, callback) {
            this.elements.forEach((element) => {
                element.addEventListener(type, callback);
            });
            return this;
        }
    }

    if(context instanceof Node) {
        return new EDOMLib(selector, context);
    }
    else{
        console.error("Parent should be a Node element");
        return null;
    }
}