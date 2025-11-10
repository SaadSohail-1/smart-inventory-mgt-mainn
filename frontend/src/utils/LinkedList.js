class Node{
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

export class LinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
    }

    push(data){
        const newNode = new Node(data);
        if(this.head===null){
            this.head = newNode;
            this.tail = newNode;
        } else {
            this.tail.next = newNode; //existing tail ka next newNode
            this.tail = newNode; // then update that tail to newNode ie tail = newNode
        }
    }
    traverse(){
        let current = this.head;
        const items = [];
        while(current){
            items.push(current.data);
            current = current.next;
        }
        return items;
    }
}