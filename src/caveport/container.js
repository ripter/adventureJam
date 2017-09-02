import setAttributeForClass from './setAttributeForClass.js';

//Container Entity
export default function Container(target, multipliers, room, room_id) {
    this.target = target;
    this.position_multipliers = JSON.parse(multipliers);
    this.room = room;
    this.room_id = room_id;
    this.init();
}

Container.prototype.init = function() {
    var entity = document.createElement("a-entity");
    entity.setAttribute("class","top");
    entity.setAttribute("mixin","wall top");
    entity.setAttribute("visible","false");
    entity.setAttribute("position",this.position_multipliers.x + " " + (4 + this.position_multipliers.y) + " " + this.position_multipliers.z);
    document.getElementById(this.target).appendChild(entity);

    var entity = document.createElement("a-entity");
    entity.setAttribute("class","bottom");
    entity.setAttribute("mixin","wall bottom");
    entity.setAttribute("visible","false");
    entity.setAttribute("position",this.position_multipliers.x + " " + this.position_multipliers.y + " " + this.position_multipliers.z);
    document.getElementById(this.target).appendChild(entity);

    var entity = document.createElement("a-entity");
    entity.setAttribute("class","left");
    entity.setAttribute("mixin","wall left");
    entity.setAttribute("visible","false");
    entity.setAttribute("position",(-2 + this.position_multipliers.x) + " " + (2 + this.position_multipliers.y) + " " + this.position_multipliers.z);
    document.getElementById(this.target).appendChild(entity);

    var entity = document.createElement("a-entity");
    entity.setAttribute("class","right");
    entity.setAttribute("mixin","wall right");
    entity.setAttribute("visible","false");
    entity.setAttribute("position",(2 + this.position_multipliers.x) + " " + (2 + this.position_multipliers.y) + " " + this.position_multipliers.z);
    document.getElementById(this.target).appendChild(entity);

    var entity = document.createElement("a-entity");
    entity.setAttribute("class","back");
    entity.setAttribute("mixin","wall back");
    entity.setAttribute("visible","false");
    entity.setAttribute("position",this.position_multipliers.x + " " + (2 + this.position_multipliers.y) + " " + (-2 + this.position_multipliers.z));
    document.getElementById(this.target).appendChild(entity);

    var entity = document.createElement("a-entity");
    entity.setAttribute("class","front");
    entity.setAttribute("mixin","wall front");
    entity.setAttribute("visible","false");
    entity.setAttribute("position",this.position_multipliers.x + " " + (2 + this.position_multipliers.y) + " " + (2 + this.position_multipliers.z));
    document.getElementById(this.target).appendChild(entity);
}

Container.prototype.render = function() {
    //set the visible component on the entities for this container
    var container = document.getElementById(this.target);
    if(this.room) {
        setAttributeForClass(container, "top", "visible", (this.room.data.top ? this.room.data.top : "false"));
        setAttributeForClass(container, "bottom", "visible", (this.room.data.bottom ? this.room.data.bottom : "false"));
        setAttributeForClass(container, "left", "visible", (this.room.data.left ? this.room.data.left : "false"));
        setAttributeForClass(container, "right", "visible", (this.room.data.right ? this.room.data.right : "false"));
        setAttributeForClass(container, "back", "visible", (this.room.data.back ? this.room.data.back : "false"));
        setAttributeForClass(container, "front", "visible", (this.room.data.front ? this.room.data.front : "false"));

        if(this.room.data.bottom == false) {
            setAttributeForClass(container, "move", "visible", "false");
        }
        else {
            setAttributeForClass(container, "move", "visible", "true");
        }
    }
    //if no room object exsists in the container, hide everything
    else {
        setAttributeForClass(container, "top", "visible", "false");
        setAttributeForClass(container, "bottom", "visible", "false");
        setAttributeForClass(container, "left", "visible", "false");
        setAttributeForClass(container, "right", "visible", "false");
        setAttributeForClass(container, "back", "visible", "false");
        setAttributeForClass(container, "front", "visible", "false");
        setAttributeForClass(container, "move", "visible", "false");
    }
}

Container.prototype.addItem = function(item) {
    var entity = document.createElement("a-entity");
    entity.setAttribute("id",item);
    entity.setAttribute("class","pickup");
    entity.setAttribute("position",this.position_multipliers.x + " " + this.position_multipliers.y + " " + (this.position_multipliers.z - 1));
    //assign the room id to the entity for easy removal later on
    entity.setAttribute("room-id",this.room_id);

    var model = document.createElement("a-model");
    model.setAttribute("src","models/" + item + ".dae");
    model.setAttribute("position","0 0 0");
    model.setAttribute("mixin",item + "-model");

    var trigger = document.createElement("a-entity");
    trigger.setAttribute("mixin",item + "-trigger");
    trigger.setAttribute("material","transparent: true; opacity: 0");

    entity.appendChild(model);
    entity.appendChild(trigger);

    document.getElementById(this.target).appendChild(entity);

    entity.addEventListener("click", function() {
        inventory.addItem(this);
        this.parentElement.removeChild(this);
        //remove item from the json data
        map[this.getAttribute("room-id")].item = null;
        return false;
    });
}

Container.prototype.removeItems = function() {
    var container = document.getElementById(this.target);
    var container_items = container.getElementsByClassName("pickup");
    for(var i = 0; i < container_items.length; i++) {
        container.removeChild(container_items[i]);
    }
}
