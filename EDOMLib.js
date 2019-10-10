function _(selector, context = document) {

    class EDOMLib {
        constructor(selector, context){
            this.elements = context.querySelectorAll(selector) || [];
        }

        addClass(classNames){
            if(classNames instanceof Array) classNames = classNames.join(" ");
            this.elements.forEach((element) => {
                element.classList.add(classNames.trim());
            });
            return this;
        }

        hasClass(className, every = true){
            if(every){
                for(let i = 0; i < this.elements.length; i++){
                    if(!this.elements[i].classList.contains(className)) return false
                }
                return true
            }
            return this.elements[0].classList.contains(className);
        }

        removeClass(classNames){
            if(classNames instanceof Array) classNames = classNames.join(" ");
            this.elements.forEach((element) => {
                element.classList.remove(classNames.trim());
            });
            return this;
        }

        toggleClass(classNames){
            if(classNames instanceof Array) classNames = classNames.join(" ");
            classNames = classNames.split(' ');
            this.elements.forEach((element) => {
                classNames.forEach((className) => {
                    if(element.classList.contains(className)) element.classList.remove(className);
                    else element.classList.add(className);
                });
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