import 'aframe';
import loadMap from './loadMap.js';

// Forked from https://github.com/chrismwaite/cardboard-dungeon
var containers = {};
var map = null;
var inventory = null;
var tutorial_active = true;
var tutorial_step_status = {};

document.addEventListener("DOMContentLoaded", function() {
    //load data from map
    // loadMapData("map.json");
    containers = loadMap('index');

    inventory = new Inventory();

    //map traversal
    var move_elements = document.getElementsByClassName("move");
    for(var i = 0; i < move_elements.length; i++) {
        move_elements[i].addEventListener("click", function(){
            move(this);
            return false;
        });
    }

    //item pickups where preloaded in scene
    var pickup_elements = document.getElementsByClassName("pickup");
    for(var i = 0; i < pickup_elements.length; i++) {
        pickup_elements[i].addEventListener("click", function(){
            inventory.addItem(this);
            this.parentElement.removeChild(this);
            checkTutorialRules();
            return false;
        });
    }

    //enter the dungeon if the key is in the players hand
    document.getElementById("entrance-trigger").addEventListener("click", function() {
        if(inventory.itemOwnedAndInHand("key")) {
            document.getElementById("player").setAttribute("position","0 1.8 4");
            document.getElementById("inventory").setAttribute("position","0 0.1 4");
            document.getElementById("tutorial").setAttribute("visible","false");
            tutorial_active = false;
        }
        return false;
    });

    //open inventory/close inventory
    document.getElementById("compass").addEventListener("click", function() {
        if(inventory.active) {
            var inventory_slots = document.getElementsByClassName("inv-slot");
            for(var x=0; x<inventory_slots.length; x++) {
                inventory_slots[x].dispatchEvent(new Event("animate-inventory-close"));
            }
            inventory.active = false;
            setTimeout(renderInventory, 1500);
        }
        else if(!inventory.active) {
             var inventory_slots = document.getElementsByClassName("inv-slot");
            for(var x=0; x<inventory_slots.length; x++) {
                inventory_slots[x].dispatchEvent(new Event("animate-inventory"));
            }
            inventory.active = true;
            setTimeout(renderInventory, 1500);
        }
        checkTutorialRules();
        return false;
    });
});

function renderInventory() {
    inventory.render();
}

//click events
function move(dom_element) {
    //fetch the current and target room ids
    var current_room_key_array = containers["center"].room_id.split(",");
    var container_key = dom_element.parentElement.getAttribute("id");
    var target_room_key_array = containers[container_key].room_id.split(",")

    //calculate the offsets
    var offset_x = parseInt(target_room_key_array[0], 10) - parseInt(current_room_key_array[0], 10);
    var offset_y = parseInt(target_room_key_array[1], 10) - parseInt(current_room_key_array[1], 10);
    var offset_z = parseInt(target_room_key_array[2], 10) - parseInt(current_room_key_array[2], 10);

    //apply to each room
    for (var key in containers) {
        var room_key_array = containers[key].room_id.split(",");
        room_key_array[0] = parseInt(room_key_array[0]) + offset_x;
        room_key_array[1] = parseInt(room_key_array[1]) + offset_y;
        room_key_array[2] = parseInt(room_key_array[2]) + offset_z;
        var new_room_key = room_key_array.join(",");

        if(map[new_room_key])
        {
            containers[key].room = new Room(map[new_room_key].data);
            containers[key].room_id = new_room_key;
            //remove any existing item data
            containers[key].removeItems();
            //add item if it exists in the new room data
            if(map[new_room_key].item) {
                containers[key].addItem(map[new_room_key].item);
            }
            containers[key].render();
        }
        else {
            containers[key].room = null;
            containers[key].room_id = new_room_key;
            //remove any existing item data
            containers[key].removeItems();
            containers[key].render();
        }
    }
}


function checkTutorialRules() {
    //if the tutorial is active
    if(tutorial_active) {
        //finding the key
        if(!document.querySelector("#tutorial #key")) {
            tutorial_step_status["tut-pickup-key"] = false;
            tutorial_step_status["tut-find-key"] = false;
        }

        //opening the inventory
        if(inventory.active) {
            tutorial_step_status["tut-compass"] = false;
            tutorial_step_status["tut-open-inventory"] = false;
            tutorial_step_status["tut-close-inventory"] = true;

            //holding the key
            if(document.querySelector("#inventory #key")) {
                tutorial_step_status["tut-take-key"] = true;
            }
            else {
                tutorial_step_status["tut-take-key"] = false;
            }

            //putting the key back
            if(document.getElementById("player-key").getAttribute("visible") == true) {
                tutorial_step_status["tut-put-back-key"] = true;
                tutorial_step_status["tut-take-key"] = false;
            }
            else {
                tutorial_step_status["tut-put-back-key"] = false;
            }
        }
        else {
            tutorial_step_status["tut-compass"] = true;
            tutorial_step_status["tut-open-inventory"] = true;
            tutorial_step_status["tut-close-inventory"] = false;
            tutorial_step_status["tut-take-key"] = false;
            tutorial_step_status["tut-put-back-key"] = false;
        }

        //using the key
        if(document.getElementById("player-key").getAttribute("visible") == true) {
            tutorial_step_status["tut-use-key"] = true;
        }
        else {
            tutorial_step_status["tut-use-key"] = false;
        }

        //render the step status
        for(var key in tutorial_step_status) {
            document.getElementById(key).setAttribute("visible",tutorial_step_status[key]);
        }
    }
}



//Inventory Entity
function Inventory() {
    this.items = {};
    this.slots = {1 : null, 2 : null, 3 : null, 4 : null};
    this.active = false;
}

Inventory.prototype.addItem = function(item) {
    this.items[item.getAttribute("id")] = true;

    var slot_target = null;

    for(var key in this.slots) {
        if(this.slots[key] == null) {
            this.slots[key] = item.getAttribute("id");
            slot_target = key;
            break;
        }
    }

    //create a clone of the item and inject it into the target slot
    var entity = item.cloneNode(true);
    entity.setAttribute("position","0 0 0");
    entity.setAttribute("rotation","90 0 0");
    entity.setAttribute("scale","0.5 0.5 0.5");
    if(this.active == false) {
        entity.setAttribute("visible","false");
    }

    entity.setAttribute("class","usable");
    document.getElementById("inv-slot-" + slot_target).appendChild(entity);

    entity.addEventListener("click", function() {
        var player_item_id = ("player-" + this.getAttribute("id"));
        //hide all existing items that appear in this same hand
        var new_item_visible_state = document.getElementById(player_item_id).getAttribute("visible");
        var new_item_hand = document.getElementById(player_item_id).getAttribute("class");

        var items_in_hand = document.getElementsByClassName(new_item_hand);
        for(var i = 0; i < items_in_hand.length; i++) {
            items_in_hand[i].setAttribute("visible","false");
        }

        document.getElementById(player_item_id).setAttribute("visible",new_item_visible_state);

        if(document.getElementById(player_item_id).getAttribute("visible") == false) {
            document.getElementById(player_item_id).setAttribute("visible","true");
        }
        else {
            document.getElementById(player_item_id).setAttribute("visible","false");
        }

        checkTutorialRules();
    });
}

Inventory.prototype.itemOwnedAndInHand = function(item_id) {
    var item = document.getElementById("player-" + item_id);
    if(this.items[item_id] && item.getAttribute("visible") == true) {
        return true;
    }
    return false;
}

Inventory.prototype.render = function() {
    //set the attribute as visible for each slot
    for(var key in this.items) {
        if(this.active) {
            document.getElementById(key).setAttribute("visible","true");
        }
        else {
            document.getElementById(key).setAttribute("visible","false");
        }
    }
}
